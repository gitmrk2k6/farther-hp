/**
 * ブログ管理画面 - 認証
 */

/**
 * パスワードでログイン
 * @param {string} password
 * @return {Object} { success: boolean, token?: string, error?: string }
 */
function login(password) {
  var stored = PropertiesService.getScriptProperties().getProperty('BLOG_PASSWORD');
  if (!stored || password !== stored) {
    return { success: false, error: 'パスワードが正しくありません' };
  }

  // セッショントークン生成（24時間有効）
  var token = Utilities.getUuid();
  var expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sessions');
  sheet.appendRow([token, expires]);

  // 古いセッションを掃除
  cleanExpiredSessions_();

  return { success: true, token: token };
}

/**
 * セッショントークンの検証
 * @param {string} token
 * @return {boolean}
 */
function validateSession(token) {
  if (!token) return false;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sessions');
  var data = sheet.getDataRange().getValues();
  var now = new Date();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === token) {
      var expires = new Date(data[i][1]);
      if (expires > now) {
        return true;
      }
      // 期限切れなので削除
      sheet.deleteRow(i + 1);
      return false;
    }
  }
  return false;
}

/**
 * ログアウト
 * @param {string} token
 */
function logout(token) {
  if (!token) return;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sessions');
  var data = sheet.getDataRange().getValues();

  for (var i = data.length - 1; i >= 1; i--) {
    if (data[i][0] === token) {
      sheet.deleteRow(i + 1);
      break;
    }
  }
}

/**
 * 期限切れセッションを削除（内部関数）
 */
function cleanExpiredSessions_() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sessions');
  var data = sheet.getDataRange().getValues();
  var now = new Date();

  // 下から削除（行番号がずれないように）
  for (var i = data.length - 1; i >= 1; i--) {
    var expires = new Date(data[i][1]);
    if (expires <= now) {
      sheet.deleteRow(i + 1);
    }
  }
}
