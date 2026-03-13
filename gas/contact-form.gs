/**
 * 小西達也HP お問い合わせフォーム用 Google Apps Script
 *
 * 【セットアップ手順】
 * 1. Google Spreadsheet を新規作成
 * 2. 1行目にヘッダーを入力:
 *    A:受信日時 | B:お名前 | C:主催者名 | D:メール | E:電話・FAX | F:件名 | G:メッセージ | H:イベント詳細 | I:CD注文 | J:郵便番号 | K:住所
 * 3. メニュー「拡張機能」→「Apps Script」を開く
 * 4. このスクリプトを貼り付けて保存
 * 5. NOTIFICATION_EMAIL を通知先メールアドレスに変更
 * 6. 「デプロイ」→「新しいデプロイ」→ 種類:「ウェブアプリ」
 *    - 実行するユーザー: 自分
 *    - アクセスできるユーザー: 全員
 * 7. デプロイURLをコピーして .env.local の GAS_WEBHOOK_URL に設定
 */

// 通知先メールアドレス
var NOTIFICATION_EMAIL = "yumeplan1962@ezweb.ne.jp";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // スプレッドシートに記録
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var now = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");

    var eventDetailsStr = "";
    if (data.eventDetails) {
      var ed = data.eventDetails;
      var parts = [];
      if (ed.date) parts.push("希望日時: " + ed.date);
      if (ed.venue) parts.push("会場: " + ed.venue);
      if (ed.address) parts.push("住所: " + ed.address);
      if (ed.audience) parts.push("対象者: " + ed.audience);
      if (ed.capacity) parts.push("参加人数: " + ed.capacity);
      if (ed.theme) parts.push("テーマ: " + ed.theme);
      if (ed.budget) parts.push("予算: " + ed.budget);
      eventDetailsStr = parts.join("\n");
    }

    var cdOrderStr = "";
    if (data.cdOrder) {
      var orderParts = [];
      for (var title in data.cdOrder) {
        orderParts.push(title + " × " + data.cdOrder[title] + "枚");
      }
      cdOrderStr = orderParts.join("\n");
    }

    var row = [
      now,
      data.name || "",
      data.organization || "",
      data.email || "",
      "'" + (data.phone || ""),
      data.subject || "",
      data.message || "",
      eventDetailsStr,
      cdOrderStr,
      "'" + (data.postalCode || ""),
      data.address || ""
    ];
    sheet.appendRow(row);

    // メール通知
    var subject = "【HP問い合わせ】" + (data.subject || "お問い合わせ") + " - " + (data.name || "名前なし");
    var body = buildEmailBody(data, eventDetailsStr, cdOrderStr);

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: body
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function buildEmailBody(data, eventDetailsStr, cdOrderStr) {
  var lines = [];
  lines.push("ホームページからお問い合わせがありました。");
  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push("■ お名前: " + (data.name || ""));
  if (data.organization) {
    lines.push("■ 主催者名: " + data.organization);
  }
  lines.push("■ メール: " + (data.email || ""));
  if (data.phone) {
    lines.push("■ 電話・FAX: " + data.phone);
  }
  lines.push("■ 件名: " + (data.subject || ""));
  lines.push("━━━━━━━━━━━━━━━━━━━━");

  if (eventDetailsStr) {
    lines.push("");
    lines.push("【イベント詳細】");
    lines.push(eventDetailsStr);
  }

  if (data.postalCode || data.address) {
    lines.push("");
    lines.push("【お届け先】");
    lines.push("〒" + (data.postalCode || "") + " " + (data.address || ""));
  }

  if (cdOrderStr) {
    lines.push("");
    lines.push("【CD注文】");
    lines.push(cdOrderStr);
  }

  if (data.message) {
    lines.push("");
    lines.push("【メッセージ】");
    lines.push(data.message);
  }

  lines.push("");
  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push("このメールはホームページのお問い合わせフォームから自動送信されています。");

  return lines.join("\n");
}
