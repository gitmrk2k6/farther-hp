/**
 * ブログ管理画面 - 画像アップロード
 */

/**
 * 画像をGitHubリポジトリにアップロード
 * @param {string} token セッショントークン
 * @param {string} filename 元のファイル名
 * @param {string} base64Data base64エンコード済みの画像データ（data:image/... プレフィックスなし）
 * @return {Object} { success: boolean, path?: string, markdown?: string, error?: string }
 */
function uploadImage(token, filename, base64Data) {
  if (!validateSession(token)) {
    return { success: false, error: 'セッションが無効です。再ログインしてください。' };
  }

  // ファイル名をサニタイズ
  var safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  var timestamp = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMddHHmmss');
  var finalName = timestamp + '_' + safeName;

  var repoPath = 'public/images/blog/' + finalName;

  try {
    commitBase64FileToGitHub(repoPath, base64Data, '画像を追加: ' + finalName);
  } catch (e) {
    return { success: false, error: '画像アップロードエラー: ' + e.message };
  }

  // HP上での画像パス（basePath対応）
  var imagePath = '/farther-hp/images/blog/' + finalName;
  var markdownTag = '![' + safeName + '](' + imagePath + ')';

  return {
    success: true,
    path: imagePath,
    markdown: markdownTag
  };
}
