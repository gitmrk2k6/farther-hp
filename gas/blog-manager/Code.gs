/**
 * ブログ管理画面 - メインエントリポイント
 *
 * セットアップ手順:
 * 1. Googleスプレッドシートを新規作成（名前: farther_hp_blog）
 * 2. シート「posts」を作成し、1行目にヘッダーを入力:
 *    A:id  B:slug  C:title  D:date  E:excerpt  F:tags  G:content  H:status  I:created_at  J:updated_at  K:image_paths
 * 3. シート「sessions」を作成し、1行目にヘッダーを入力:
 *    A:token  B:expires_at
 * 4. 「拡張機能」→「Apps Script」でスクリプトエディタを開く
 * 5. 各 .gs ファイルと .html ファイルをコピペ
 * 6. 「プロジェクトの設定」→「スクリプトプロパティ」に以下を追加:
 *    - BLOG_PASSWORD: ログインパスワード
 *    - GITHUB_TOKEN: GitHubのPersonal Access Token（fine-grained、Contents権限のみ）
 *    - GITHUB_REPO: gitmrk2k6/farther-hp
 * 7. 「デプロイ」→「新しいデプロイ」→ 種類:ウェブアプリ
 *    - 次のユーザーとして実行: 自分
 *    - アクセスできるユーザー: 全員
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('ブログ管理 - Farther')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * HTMLファイルをインクルードするヘルパー
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
