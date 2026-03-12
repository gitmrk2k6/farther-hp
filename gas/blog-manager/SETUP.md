# ブログ管理画面 セットアップ手順

## 1. Googleスプレッドシートを作成

1. Google Driveで新しいスプレッドシートを作成（名前: `farther_hp_blog`）
2. シート名を `posts` に変更
3. 1行目（ヘッダー）に以下を入力:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| id | slug | title | date | excerpt | tags | content | status | created_at | updated_at | image_paths |

4. シートをもう1つ追加し、名前を `sessions` にする
5. `sessions` シートの1行目に以下を入力:

| A | B |
|---|---|
| token | expires_at |

## 2. Apps Scriptプロジェクトを作成

1. スプレッドシートのメニュー →「拡張機能」→「Apps Script」
2. スクリプトエディタが開く
3. 以下のファイルをそれぞれ作成してコピペ:

### .gs ファイル（スクリプト）
| ファイル名 | 内容 |
|-----------|------|
| Code.gs | メインエントリポイント（既存の `コード.gs` を上書き） |
| Auth.gs | 認証処理 |
| Posts.gs | 記事のCRUD |
| GitHub.gs | GitHub API連携 |
| ImageUpload.gs | 画像アップロード |

※ スクリプトエディタで「+」ボタン →「スクリプト」で新しい .gs ファイルを追加

### .html ファイル
| ファイル名 | 内容 |
|-----------|------|
| index.html | メインページ |
| Styles.html | CSS |
| JavaScript.html | クライアントJS |

※ スクリプトエディタで「+」ボタン →「HTML」で新しい .html ファイルを追加

## 3. スクリプトプロパティを設定

1. スクリプトエディタ左メニュー →「プロジェクトの設定」（歯車アイコン）
2. 「スクリプトプロパティ」セクションで「スクリプトプロパティを追加」
3. 以下の3つを追加:

| プロパティ | 値 |
|-----------|---|
| BLOG_PASSWORD | 任意のパスワード（小西さんと共有） |
| GITHUB_TOKEN | GitHubのPersonal Access Token（下記参照） |
| GITHUB_REPO | gitmrk2k6/farther-hp |

## 4. GitHub Personal Access Token (PAT) を作成

1. GitHub にログイン
2. Settings → Developer settings → Personal access tokens → Fine-grained tokens
3. 「Generate new token」をクリック
4. 設定:
   - Token name: `farther-hp-blog-manager`
   - Expiration: 90日（期限が切れたら再発行）
   - Repository access: 「Only select repositories」→ `gitmrk2k6/farther-hp` を選択
   - Permissions: Repository permissions → Contents → Read and write
5. 「Generate token」をクリック
6. 表示されたトークンをコピーし、スクリプトプロパティの `GITHUB_TOKEN` に設定

## 5. Web Appとしてデプロイ

1. スクリプトエディタ右上の「デプロイ」→「新しいデプロイ」
2. 種類:「ウェブアプリ」を選択
3. 設定:
   - 説明: ブログ管理画面
   - 次のユーザーとして実行: **自分**
   - アクセスできるユーザー: **全員**
4. 「デプロイ」をクリック
5. 表示されたURLが管理画面のURL（小西さんに共有）

## 6. 動作確認

1. デプロイURLにアクセス
2. 設定したパスワードでログイン
3. 「新しい記事」をクリック
4. テスト記事を作成して「下書き保存」→ スプレッドシートに保存されるか確認
5. 「公開する」→ GitHubリポジトリにMarkdownファイルが追加されるか確認
6. 数分後、HPのブログページに記事が表示されるか確認

## 注意事項

- **GASの更新時**: コードを変更したら「デプロイ」→「デプロイを管理」→「新しいバージョン」で再デプロイが必要
- **GitHub PATの期限**: 90日で期限切れ。切れたらGitHubで再発行してスクリプトプロパティを更新
- **画像サイズ**: アップロード時に自動で最大1200px幅にリサイズされます
- **スプレッドシートのバックアップ**: 下書きデータはスプレッドシートに保存されるので、定期的にバックアップを推奨
