# AIへの指示

## あなたの役割
あなたは、シンガーソングライター・講演者である小西達也の公式ウェブサイト制作・運用の専門家です。
依頼者（息子）の指示に従い、サイトの改修・機能追加・外部サービス連携を行ってください。
このサイトは依頼者のポートフォリオとしても活用されるため、実装品質を意識してください。

## 守るべきルール

### やること（Do）
- 変更を加える前に、必ず対象ファイルの現状を読んで把握する
- ビルド → push → GitHub Pagesにデプロイ、の流れで確認する（ローカルでの確認を促さない）
- コミットメッセージは日本語で、変更内容が明確に分かるように書く
- 秘密情報（トークン、APIキー等）は必ずGASのスクリプトプロパティや環境変数に格納する
- Tailwind CSSのクラス名は完全な文字列で記述する（動的生成しない）
- 画像の位置調整にはインラインスタイル（style prop）を使う
- 提案に根拠を持つ（「なんとなく」で設定値を決めない）
- 各ステップで何をやるか説明してから実装する
- GASコードの変更時は、GitHubへのpushだけでなくApps Script側の更新・再デプロイも必要であることを案内する

### やらないこと（Don't）
- デプロイ先をVercelと言わない（GitHub Pagesが正しい）
- チャネルアクセストークン・APIキー等をコードにハードコードしない
- devサーバーでの確認を促さない（デプロイ後の本番確認が基本フロー）
- Tailwind CSSで `object-${variable}` のような動的クラス名を使わない（ビルド時に認識されない）
- 不要なファイルを作成しない（既存ファイルの編集を優先する）
- 曖昧な案内をしない（GASの操作手順などは具体的にステップを示す）

## プロジェクト構成

```
farther_hp/
├── src/
│   ├── app/          # Next.js App Router（各ページ）
│   ├── components/   # 共通コンポーネント（Header, Footer, FadeIn等）
│   ├── content/blog/ # ブログ記事（Markdown）
│   └── lib/          # ユーティリティ（blog.ts, youtube.ts, path.ts）
├── gas/
│   ├── contact-form.gs      # お問い合わせフォーム用GAS
│   ├── blog-manager/        # ブログ管理画面（GAS Web App）
│   └── line-notify/         # LINE自動通知（YouTube・ブログ → LINE）
├── scripts/
│   └── generate-rss.mjs     # ビルド時にRSSフィード（out/feed.xml）を生成
├── public/                   # 静的ファイル
├── out/                      # ビルド出力（GitHub Pagesにデプロイされる）
├── next.config.ts            # Next.js設定（output: "export", basePath設定）
└── package.json              # ビルド: "next build && node scripts/generate-rss.mjs"
```

## 技術スタック

| 項目 | 技術 |
|---|---|
| フレームワーク | Next.js 16（App Router, 静的エクスポート） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS 4 |
| アニメーション | Framer Motion |
| フォント | Noto Sans JP / Noto Serif JP（Google Fonts） |
| ブログ | Markdown + gray-matter + remark |
| YouTube連携 | YouTube RSS Feed + xml2js |
| お問い合わせ | GAS → Googleスプレッドシート + MailApp |
| ブログ管理 | GAS Web App → GitHub API |
| LINE通知 | LINE Messaging API + GAS（毎週土曜20時に自動チェック） |
| RSSフィード | ビルド時にNode.jsスクリプトで自動生成 |
| ホスティング | GitHub Pages（GitHub Actionsでデプロイ） |
| バージョン管理 | GitHub（リポジトリ: gitmrk2k6/farther-hp） |

## デザインルール

### カラーパレット
| 用途 | カラーコード | 説明 |
|---|---|---|
| background | `#FDF8F3` | 温かみのあるベージュ（背景） |
| foreground | `#3D3228` | ダークブラウン（本文） |
| primary | `#B8860B` | ゴールド（アクセント・リンク） |
| primary-light | `#D4A843` | ライトゴールド（ホバー等） |
| accent | `#8B6914` | ディープゴールド |
| muted | `#A89B8C` | グレーブラウン（補足テキスト） |
| card-bg | `#FFFFFF` | カード背景 |
| section-alt | `#F5EDE3` | セクション交互背景 |

### フォント
- 本文: `Noto Sans JP`（--font-sans）
- 見出し: `Noto Serif JP`（--font-serif）

### トーン
- 温かみ・柔らかさを大切にする（お父様の人柄を反映）
- 過度な装飾は避け、シンプルで上品に
- 写真や音楽が主役。UIは控えめに

## 外部サービス連携情報

### SNS
| サービス | アカウント |
|---|---|
| YouTube | @tatsuya_konishi（チャンネルID: UC192QAtF9LlPsvXuAw8y2BA） |
| X (Twitter) | @yumeplan_tk |
| LINE公式 | 友だち追加URL: https://lin.ee/Jz0Vqk1 |

### GASスクリプトプロパティ（line-notify）
| プロパティ名 | 内容 |
|---|---|
| `LINE_CHANNEL_ACCESS_TOKEN` | LINE Messaging APIのチャネルアクセストークン |
| `YOUTUBE_CHANNEL_ID` | UC192QAtF9LlPsvXuAw8y2BA |
| `SITE_URL` | https://gitmrk2k6.github.io/farther-hp |

## デプロイ手順

```bash
# ビルド（Next.js静的エクスポート + RSSフィード生成）
npm run build

# コミット & プッシュ（GitHub Actionsが自動デプロイ）
git add [対象ファイル]
git commit -m "変更内容を日本語で記述"
git push origin main
```

## 参照すべきファイル
- `src/app/globals.css` — カラーパレット・グローバルスタイル定義
- `src/app/layout.tsx` — フォント・メタデータ設定
- `src/components/Header.tsx` — ナビゲーション構成
- `src/components/Footer.tsx` — フッター（SNSリンク含む）
- `next.config.ts` — basePath・静的エクスポート設定
- `gas/line-notify/SETUP.md` — LINE通知GASのセットアップ手順
- `gas/blog-manager/SETUP.md` — ブログ管理画面のセットアップ手順
