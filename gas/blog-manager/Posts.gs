/**
 * ブログ管理画面 - 記事CRUD
 */

/**
 * 全記事を取得
 * @param {string} token セッショントークン
 * @return {Object} { success: boolean, posts?: Array, error?: string }
 */
function getAllPosts(token) {
  if (!validateSession(token)) {
    return { success: false, error: 'セッションが無効です。再ログインしてください。' };
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('posts');
  var data = sheet.getDataRange().getValues();
  var posts = [];

  for (var i = 1; i < data.length; i++) {
    posts.push({
      id: data[i][0],
      slug: data[i][1],
      title: data[i][2],
      date: data[i][3],
      excerpt: data[i][4],
      tags: data[i][5],
      status: data[i][7],
      created_at: data[i][8],
      updated_at: data[i][9]
    });
  }

  // 日付の降順でソート
  posts.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  return { success: true, posts: posts };
}

/**
 * 記事を1件取得
 * @param {string} token
 * @param {string} id
 * @return {Object}
 */
function getPost(token, id) {
  if (!validateSession(token)) {
    return { success: false, error: 'セッションが無効です。再ログインしてください。' };
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('posts');
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      return {
        success: true,
        post: {
          id: data[i][0],
          slug: data[i][1],
          title: data[i][2],
          date: data[i][3],
          excerpt: data[i][4],
          tags: data[i][5],
          content: data[i][6],
          status: data[i][7],
          created_at: data[i][8],
          updated_at: data[i][9],
          image_paths: data[i][10]
        }
      };
    }
  }

  return { success: false, error: '記事が見つかりません' };
}

/**
 * 記事を保存（新規作成 or 更新）
 * @param {string} token
 * @param {Object} postData { id?, title, date, excerpt, tags, content }
 * @return {Object}
 */
function savePost(token, postData) {
  if (!validateSession(token)) {
    return { success: false, error: 'セッションが無効です。再ログインしてください。' };
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('posts');
  var now = new Date().toISOString();

  if (postData.id) {
    // 更新
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === postData.id) {
        var slug = generateSlug_(postData.date, postData.title);
        sheet.getRange(i + 1, 2).setValue(slug);
        sheet.getRange(i + 1, 3).setValue(postData.title);
        sheet.getRange(i + 1, 4).setValue(postData.date);
        sheet.getRange(i + 1, 5).setValue(postData.excerpt);
        sheet.getRange(i + 1, 6).setValue(postData.tags);
        sheet.getRange(i + 1, 7).setValue(postData.content);
        sheet.getRange(i + 1, 10).setValue(now);
        return { success: true, id: postData.id, slug: slug };
      }
    }
    return { success: false, error: '更新対象の記事が見つかりません' };
  } else {
    // 新規作成
    var id = Utilities.getUuid();
    var slug = generateSlug_(postData.date, postData.title);
    sheet.appendRow([
      id,
      slug,
      postData.title,
      postData.date,
      postData.excerpt,
      postData.tags,
      postData.content,
      'draft',
      now,
      now,
      ''
    ]);
    return { success: true, id: id, slug: slug };
  }
}

/**
 * 記事を削除
 * @param {string} token
 * @param {string} id
 * @return {Object}
 */
function deletePost(token, id) {
  if (!validateSession(token)) {
    return { success: false, error: 'セッションが無効です。再ログインしてください。' };
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('posts');
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      var slug = data[i][1];
      var status = data[i][7];

      // 公開済みの場合はGitHubからも削除
      if (status === 'published') {
        var filePath = 'src/content/blog/' + slug + '.md';
        try {
          deleteFileFromGitHub(filePath);
        } catch (e) {
          Logger.log('GitHub削除エラー: ' + e.message);
        }
      }

      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }

  return { success: false, error: '削除対象の記事が見つかりません' };
}

/**
 * 記事を公開
 * @param {string} token
 * @param {string} id
 * @return {Object}
 */
function publishPost(token, id) {
  if (!validateSession(token)) {
    return { success: false, error: 'セッションが無効です。再ログインしてください。' };
  }

  var result = getPost(token, id);
  if (!result.success) return result;

  var post = result.post;
  var markdown = buildMarkdown_(post);
  var filePath = 'src/content/blog/' + post.slug + '.md';

  try {
    commitFileToGitHub(filePath, markdown, '記事を公開: ' + post.title);
  } catch (e) {
    return { success: false, error: 'GitHub公開エラー: ' + e.message };
  }

  // ステータスを published に更新
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('posts');
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      sheet.getRange(i + 1, 8).setValue('published');
      sheet.getRange(i + 1, 10).setValue(new Date().toISOString());
      break;
    }
  }

  return { success: true, message: '記事を公開しました。数分後にHPに反映されます。' };
}

/**
 * 公開を取り下げる（下書きに戻す）
 * @param {string} token
 * @param {string} id
 * @return {Object}
 */
function unpublishPost(token, id) {
  if (!validateSession(token)) {
    return { success: false, error: 'セッションが無効です。再ログインしてください。' };
  }

  var result = getPost(token, id);
  if (!result.success) return result;

  var post = result.post;
  if (post.status !== 'published') {
    return { success: false, error: 'この記事は公開されていません' };
  }

  // GitHubから削除
  var filePath = 'src/content/blog/' + post.slug + '.md';
  try {
    deleteFileFromGitHub(filePath);
  } catch (e) {
    return { success: false, error: 'GitHub削除エラー: ' + e.message };
  }

  // ステータスを draft に戻す
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('posts');
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      sheet.getRange(i + 1, 8).setValue('draft');
      sheet.getRange(i + 1, 10).setValue(new Date().toISOString());
      break;
    }
  }

  return { success: true, message: '記事を非公開にしました。数分後にHPから削除されます。' };
}

/**
 * Markdownファイルを生成（内部関数）
 */
function buildMarkdown_(post) {
  var tags = post.tags.split(',').map(function(t) {
    return '"' + t.trim() + '"';
  }).join(', ');

  var lines = [
    '---',
    'title: "' + post.title.replace(/"/g, '\\"') + '"',
    'date: "' + post.date + '"',
    'excerpt: "' + post.excerpt.replace(/"/g, '\\"') + '"',
    'tags: [' + tags + ']',
    '---',
    '',
    post.content
  ];
  return lines.join('\n');
}

/**
 * スラッグを生成（内部関数）
 * 日付 + タイトルからURLセーフな文字列を作る
 */
function generateSlug_(date, title) {
  // タイトルをローマ字/英数字に変換するのは難しいので、日付 + タイムスタンプで一意にする
  var timestamp = new Date().getTime().toString(36);
  return date + '-' + timestamp;
}
