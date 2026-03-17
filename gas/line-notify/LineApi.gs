/**
 * LINE Messaging API共通処理
 *
 * スクリプトプロパティに以下を設定:
 *   - LINE_CHANNEL_ACCESS_TOKEN: LINE Messaging APIのチャネルアクセストークン
 */

/**
 * LINEブロードキャストメッセージを送信
 * 友だち全員にメッセージを一斉送信する。
 *
 * @param {Object} message LINE Messaging APIのメッセージオブジェクト
 */
function sendLineBroadcast_(message) {
  var token = PropertiesService.getScriptProperties().getProperty('LINE_CHANNEL_ACCESS_TOKEN');
  if (!token) {
    throw new Error('LINE_CHANNEL_ACCESS_TOKENがスクリプトプロパティに設定されていません。');
  }

  var url = 'https://api.line.me/v2/bot/message/broadcast';

  var payload = {
    messages: [message]
  };

  var options = {
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var code = response.getResponseCode();

  if (code !== 200) {
    var body = response.getContentText();
    Logger.log('LINE送信エラー (' + code + '): ' + body);
    throw new Error('LINE送信に失敗しました（' + code + '）: ' + body);
  }

  Logger.log('LINEブロードキャスト送信成功');
}
