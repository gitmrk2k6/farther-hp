/**
 * YouTube新着動画 → LINE通知
 *
 * YouTubeチャンネルのRSSフィードを定期チェックし、
 * 新しい動画が見つかったらLINE Messaging APIでブロードキャスト送信する。
 *
 * スクリプトプロパティに以下を設定:
 *   - LINE_CHANNEL_ACCESS_TOKEN: LINE Messaging APIのチャネルアクセストークン
 *   - YOUTUBE_CHANNEL_ID: YouTubeチャンネルID
 */

/** YouTubeチャンネルのRSSフィードURL */
function getYouTubeFeedUrl_() {
  var channelId = PropertiesService.getScriptProperties().getProperty('YOUTUBE_CHANNEL_ID');
  if (!channelId) {
    throw new Error('YOUTUBE_CHANNEL_IDがスクリプトプロパティに設定されていません。');
  }
  return 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId;
}

/**
 * YouTube新着動画をチェックしてLINE通知（トリガーから呼び出す）
 */
function checkYouTubeAndNotify() {
  var props = PropertiesService.getScriptProperties();
  var lastChecked = props.getProperty('YOUTUBE_LAST_CHECKED');
  var lastCheckedDate = lastChecked ? new Date(lastChecked) : new Date(0);

  var feedUrl = getYouTubeFeedUrl_();

  try {
    var response = UrlFetchApp.fetch(feedUrl, { muteHttpExceptions: true });
    if (response.getResponseCode() !== 200) {
      Logger.log('YouTubeフィードの取得に失敗: ' + response.getResponseCode());
      return;
    }

    var xml = response.getContentText();
    var entries = parseYouTubeFeed_(xml);

    // 前回チェック以降の新着動画を抽出
    var newEntries = entries.filter(function(entry) {
      return new Date(entry.published) > lastCheckedDate;
    });

    if (newEntries.length === 0) {
      Logger.log('YouTube新着動画なし');
      return;
    }

    // 新着動画をLINEで通知（古い順に送信）
    newEntries.reverse();
    for (var i = 0; i < newEntries.length; i++) {
      var entry = newEntries[i];
      var message = buildYouTubeMessage_(entry);
      sendLineBroadcast_(message);
      Logger.log('LINE通知送信: ' + entry.title);
    }

    // 最終チェック日時を更新
    props.setProperty('YOUTUBE_LAST_CHECKED', new Date().toISOString());
    Logger.log('YouTube通知完了: ' + newEntries.length + '件');

  } catch (e) {
    Logger.log('YouTubeチェックエラー: ' + e.message);
  }
}

/**
 * YouTubeのAtomフィードをパースしてエントリ一覧を返す
 * @param {string} xml フィードXML
 * @return {Array<{title: string, link: string, published: string, videoId: string}>}
 */
function parseYouTubeFeed_(xml) {
  var document = XmlService.parse(xml);
  var root = document.getRootElement();
  var ns = XmlService.getNamespace('http://www.w3.org/2005/Atom');
  var ytNs = XmlService.getNamespace('yt', 'http://www.youtube.com/xml/schemas/2015');

  var entries = root.getChildren('entry', ns);

  return entries.map(function(entry) {
    return {
      title: entry.getChildText('title', ns),
      link: 'https://www.youtube.com/watch?v=' + entry.getChild('videoId', ytNs).getText(),
      published: entry.getChildText('published', ns),
      videoId: entry.getChild('videoId', ytNs).getText()
    };
  });
}

/**
 * YouTube通知用のLINEメッセージを組み立てる
 * @param {Object} entry 動画情報
 * @return {Object} LINE Messaging API用メッセージオブジェクト
 */
function buildYouTubeMessage_(entry) {
  var text = '🎵 新しい動画を公開しました！\n\n'
    + '📺 ' + entry.title + '\n\n'
    + entry.link;

  return {
    type: 'text',
    text: text
  };
}
