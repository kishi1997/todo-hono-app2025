# Todo Hono App 2025

・Next.js+Hono+Bunを用いて、型安全にWebアプリ開発を行うやり方を簡単なTodoアプリ開発を通じて行う。ZodやDrizzleを用いて、データベースからフロントエンドまでを型安全に開発することも含めています。
・Todoアプリの開発自体は主要な目的から外れるため、Todo追加のみのシンプルな機能のみに（今回のスタックセットが良いと感じれば今後追加して開発するかも）
## ✨ 特徴

-   Bun Workspacesを使用したモノレポ構成
-   HonoのRPC機能
-   Zodによる型安全なバリデーション
-   Supabase DB + Drizzle ORMによるDB操作・マイグレーション
-   TanStack Queryを使用したデータフェッチ
-   Next.jsで作成したSPAをCloudflare Pagesへデプロイ
-   Honoで作成したAPIサーバーをCloudflare Workersへデプロイ

## 🚀 技術スタック

-   **バックエンド:**
    -   [Hono](https://hono.dev/): Web フレームワーク
    -   [TypeScript](https://www.typescriptlang.org/): プログラミング言語
    -   [Zod](https://zod.dev/): スキーマ定義とバリデーション
    -   supabase
    -   drizzle
-   **プラットフォーム:**
    -   [Cloudflare Workers](https://workers.cloudflare.com/): サーバーレス実行環境
    -   [Cloudflare KV](https://developers.cloudflare.com/workers/learning/how-kv-works/): Key-Value データストア
-   **フロントエンド:**
    -   React
    -   Nextjs
    -   typescript

## 🛠️ セットアップとローカル開発

### 前提条件

-   [Node.js](https://nodejs.org/) (v18 以降推奨)
-   [npm](https://www.npmjs.com/) (Node.js に同梱)
-   [Cloudflare アカウント](https://dash.cloudflare.com/sign-up)


### 手順

1.  **リポジトリをクローンします:**
    ```bash
    git clone https://github.com/kishi1997/todo-hono-app2025.git
    cd todo-hono-app2025
    ```

2.  **依存関係をインストールします:**
    ```bash
    npm install
    ```

3. **環境変数の設定**

.env.sample を参考に .env ファイルを作成し、必要な環境変数を設定してください。
```bash
cp .env.sample .env
```

4.  **マイグレーションを実行**
作成したマイグレーションファイルをもとに、DBにスキーマが反映(マイグレーションファイルは作成済み：bunx drizzle-kit generate)
```bash
bunx drizzle-kit migrate
```

5.  **開発サーバーを起動します:**
    ```bash
    cd apps/backend && bun run dev
    cd apps/frontend && bun run dev
    ```
    アプリケーションは `http://localhost:3000` で利用可能になります。
