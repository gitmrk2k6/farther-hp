/**
 * トリガー設定
 *
 * GASのスクリプトエディタから一度だけ setupWeeklyTriggers() を実行して、
 * 週1回のトリガーを設定する。
 */

/**
 * 週1回の定期チェックトリガーを設定する
 * YouTube・ブログの両方をまとめてチェックする関数を毎週土曜20時に実行。
 * 土曜午前にコンテンツをアップすることが多いため、同日夜にチェック・通知する。
 */
function setupWeeklyTriggers() {
  // 既存のトリガーを削除（重複防止）
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'weeklyCheck') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // 毎週土曜 20:00-21:00 に実行
  ScriptApp.newTrigger('weeklyCheck')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SATURDAY)
    .atHour(20)
    .create();

  Logger.log('週次トリガーを設定しました（毎週土曜20時）');
}

/**
 * 週次チェック（トリガーから呼ばれる）
 * YouTube新着動画とブログ新着記事の両方をチェック。
 */
function weeklyCheck() {
  Logger.log('=== 週次チェック開始 ===');

  try {
    checkYouTubeAndNotify();
  } catch (e) {
    Logger.log('YouTubeチェックでエラー: ' + e.message);
  }

  try {
    checkBlogAndNotify();
  } catch (e) {
    Logger.log('ブログチェックでエラー: ' + e.message);
  }

  Logger.log('=== 週次チェック完了 ===');
}
