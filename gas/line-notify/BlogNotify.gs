/**
 * ブログ更新 → LINE通知
 *
 * サイトのRSSフィード（feed.xml）を定期チェックし、
 * 新しい記事が見つかったらLINE Messaging APIでブロードキャスト送信する。
 *
 * スクリプトプロパティに以下を設定:
 *   - LINE_CHANNEL_ACCESS_TOKEN: LINE Messaging APIのチャネルアクセストークン
 *   - SITE_URL: サイトのベースURL（例: https://gitmrk2k6.github.io/farther-hp）
 */

/** サイトのRSSフィードURL */
function getBlogFeedUrl_() {
  var siteUrl = PropertiesService.getScriptProperties().getProperty('SITE_URL');
  if (!siteUrl) {
    throw new Error('SITE_URLがスクリプトプロパティに設定されていません。');
  }
  return siteUrl + '/feed.xml';
}

/**
 * ブログ新着記事をチェックしてLINE通知（トリガーから呼び出す）
 */
function checkBlogAndNotify() {
  var props = PropertiesService.getScriptProperties();
  var lastChecked = props.getProperty('BLOG_LAST_CHECKED');
  var lastCheckedDate = lastChecked ? new Date(lastChecked) : new Date(0);

  var feedUrl = getBlogFeedUrl_();

  try {
    var response = UrlFetchApp.fetch(feedUrl, { muteHttpExceptions: true });
    if (response.getResponseCode() !== 200) {
      Logger.log('ブログRSSフィードの取得に失敗: ' + response.getResponseCode());
      return;
    }

    var xml = response.getContentText();
    var items = parseBlogRss_(xml);

    // 前回チェック以降の新着記事を抽出
    var newItems = items.filter(function(item) {
      return new Date(item.pubDate) > lastCheckedDate;
    });

    if (newItems.length === 0) {
      Logger.log('ブログ新着記事なし');
      return;
    }

    // 新着記事をLINEで通知（古い順に送信）
    newItems.reverse();
    for (var i = 0; i < newItems.length; i++) {
      var item = newItems[i];
      var message = buildBlogMessage_(item);
      sendLineBroadcast_(message);
      Logger.log('LINE通知送信: ' + item.title);
    }

    // 最終チェック日時を更新
    props.setProperty('BLOG_LAST_CHECKED', new Date().toISOString());
    Logger.log('ブログ通知完了: ' + newItems.length + '件');

  } catch (e) {
    Logger.log('ブログチェックエラー: ' + e.message);
  }
}

/**
 * RSS 2.0フィードをパースしてアイテム一覧を返す
 * @param {string} xml RSSフィードXML
 * @return {Array<{title: string, link: string, pubDate: string, description: string}>}
 */
function parseBlogRss_(xml) {
  var document = XmlService.parse(xml);
  var root = document.getRootElement();
  var channel = root.getChild('channel');
  var items = channel.getChildren('item');

  return items.map(function(item) {
    return {
      title: item.getChildText('title'),
      link: item.getChildText('link'),
      pubDate: item.getChildText('pubDate'),
      description: item.getChildText('description')
    };
  });
}

/**
 * ブログ通知用のLINEメッセージを組み立てる
 * @param {Object} item 記事情報
 * @return {Object} LINE Messaging API用メッセージオブジェクト
 */
function buildBlogMessage_(item) {
  var text = '📝 ブログを更新しました！\n\n'
    + '📖 ' + item.title + '\n\n'
    + item.description + '\n\n'
    + item.link;

  return {
    type: 'text',
    text: text
  };
}
