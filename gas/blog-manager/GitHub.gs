/**
 * ブログ管理画面 - GitHub API連携
 */

/**
 * GitHubにファイルをコミット（作成 or 更新）
 * @param {string} path リポジトリ内のファイルパス
 * @param {string} content ファイル内容（テキスト）
 * @param {string} message コミットメッセージ
 * @return {Object} GitHub APIのレスポンス
 */
function commitFileToGitHub(path, content, message) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('GITHUB_TOKEN');
  var repo = props.getProperty('GITHUB_REPO');

  if (!token || !repo) {
    throw new Error('GitHub設定が不足しています。Script PropertiesにGITHUB_TOKENとGITHUB_REPOを設定してください。');
  }

  var url = 'https://api.github.com/repos/' + repo + '/contents/' + path;

  // 既存ファイルのSHAを取得（更新時に必要）
  var existingSha = getFileSha_(url, token);

  var payload = {
    message: message,
    content: Utilities.base64Encode(content, Utilities.Charset.UTF_8),
    branch: 'main'
  };
  if (existingSha) {
    payload.sha = existingSha;
  }

  var options = {
    method: 'put',
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github.v3+json'
    },
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var code = response.getResponseCode();

  if (code !== 200 && code !== 201) {
    throw new Error('GitHubへのコミットに失敗しました（' + code + '）: ' + response.getContentText());
  }

  return JSON.parse(response.getContentText());
}

/**
 * GitHubにバイナリファイルをコミット（画像用）
 * @param {string} path リポジトリ内のファイルパス
 * @param {string} base64Content base64エンコード済みのファイル内容
 * @param {string} message コミットメッセージ
 * @return {Object}
 */
function commitBase64FileToGitHub(path, base64Content, message) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('GITHUB_TOKEN');
  var repo = props.getProperty('GITHUB_REPO');

  if (!token || !repo) {
    throw new Error('GitHub設定が不足しています。');
  }

  var url = 'https://api.github.com/repos/' + repo + '/contents/' + path;
  var existingSha = getFileSha_(url, token);

  var payload = {
    message: message,
    content: base64Content,
    branch: 'main'
  };
  if (existingSha) {
    payload.sha = existingSha;
  }

  var options = {
    method: 'put',
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github.v3+json'
    },
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var code = response.getResponseCode();

  if (code !== 200 && code !== 201) {
    throw new Error('画像のアップロードに失敗しました（' + code + '）');
  }

  return JSON.parse(response.getContentText());
}

/**
 * GitHubからファイルを削除
 * @param {string} path リポジトリ内のファイルパス
 * @return {Object}
 */
function deleteFileFromGitHub(path) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('GITHUB_TOKEN');
  var repo = props.getProperty('GITHUB_REPO');

  if (!token || !repo) {
    throw new Error('GitHub設定が不足しています。');
  }

  var url = 'https://api.github.com/repos/' + repo + '/contents/' + path;
  var sha = getFileSha_(url, token);

  if (!sha) {
    // ファイルが存在しない場合はスキップ
    return { message: 'ファイルが存在しません: ' + path };
  }

  var payload = {
    message: '記事を削除: ' + path,
    sha: sha,
    branch: 'main'
  };

  var options = {
    method: 'delete',
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github.v3+json'
    },
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var code = response.getResponseCode();

  if (code !== 200) {
    throw new Error('ファイルの削除に失敗しました（' + code + '）');
  }

  return JSON.parse(response.getContentText());
}

/**
 * ファイルのSHAを取得（内部関数）
 * @param {string} url GitHub API URL
 * @param {string} token GitHub token
 * @return {string|null} SHA or null if file doesn't exist
 */
function getFileSha_(url, token) {
  var options = {
    method: 'get',
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github.v3+json'
    },
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() === 200) {
    var data = JSON.parse(response.getContentText());
    return data.sha;
  }
  return null;
}
