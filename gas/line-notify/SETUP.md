# LINE自動通知 セットアップ手順

YouTube新着動画・ブログ更新をLINE公式アカウントの友だちに自動通知するGASスクリプト。

## 前提条件

- LINE公式アカウントが開設済み
- LINE Developers でMessaging APIチャネルが作成済み
- チャネルアクセストークン（長期）を発行済み

## セットアップ手順

### 1. GASプロジェクト作成

1. [Google Apps Script](https://script.google.com/) にアクセス
2. 「新しいプロジェクト」を作成（名前: `LINE自動通知`）
3. 以下の `.gs` ファイルをそれぞれ作成してコードをコピペ:
   - `LineApi.gs` — LINE送信共通処理
   - `YouTubeNotify.gs` — YouTube新着動画チェック
   - `BlogNotify.gs` — ブログ新着記事チェック
   - `Triggers.gs` — トリガー設定

### 2. スクリプトプロパティの設定

「プロジェクトの設定」→「スクリプトプロパティ」に以下を追加:

| プロパティ名 | 値 | 例 |
|---|---|---|
| `LINE_CHANNEL_ACCESS_TOKEN` | LINEチャネルアクセストークン | `xxxxxxxx...` |
| `YOUTUBE_CHANNEL_ID` | YouTubeチャンネルID | `UCxxxxxxxxxx` |
| `SITE_URL` | サイトのベースURL | `https://gitmrk2k6.github.io/farther-hp` |

### 3. トリガーの設定

1. GASエディタで `setupWeeklyTriggers` 関数を選択して実行
2. 初回実行時にGoogleアカウントの権限許可が求められるので許可する
3. 毎週月曜9時に `weeklyCheck` が自動実行されるようになる

### 4. 動作確認

1. GASエディタで `weeklyCheck` を手動実行
2. 「実行ログ」でエラーがないか確認
3. LINE公式アカウントの友だちに通知が届くか確認

## ファイル構成

```
gas/line-notify/
├── LineApi.gs          # LINE Messaging API共通処理
├── YouTubeNotify.gs    # YouTube新着動画チェック → LINE通知
├── BlogNotify.gs       # ブログ新着記事チェック → LINE通知
├── Triggers.gs         # 週次トリガー設定
└── SETUP.md            # このファイル
```

## 仕組み

- `PropertiesService` で最終チェック日時を保持し、重複送信を防止
- YouTube: Atom形式のRSSフィード (`/feeds/videos.xml`) をパース
- ブログ: RSS 2.0形式のフィード (`/feed.xml`) をパース
- LINE: Messaging API の Broadcast エンドポイントで友だち全員に送信
