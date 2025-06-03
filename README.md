# Todo Hono App 2025

・Next.js+Hono+Bun を用いて、型安全に Web アプリ開発を行うやり方を簡単な Todo アプリ開発を通じて行う。Zod や Drizzle を用いて、データベースからフロントエンドまでを型安全に開発することも含めています。
・Todo アプリの開発自体は主要な目的から外れるため、Todo 追加のみのシンプルな機能のみに（今回のスタックセットが良いと感じれば今後追加して開発するかも）

## ✨ 特徴

- Bun Workspaces を使用したモノレポ構成
- Hono の RPC 機能
- Zod による型安全なバリデーション
- Supabase DB + Drizzle ORM による DB 操作・マイグレーション
- TanStack Query を使用したデータフェッチ
- Next.js で作成した SPA を Cloudflare Pages へデプロイ
- Hono で作成した API サーバーを Cloudflare Workers へデプロイ

## 🚀 技術スタック

- **バックエンド:**
  - [Hono](https://hono.dev/): Web フレームワーク
  - [TypeScript](https://www.typescriptlang.org/): プログラミング言語
  - [Zod](https://zod.dev/): スキーマ定義とバリデーション
  - supabase
  - drizzle
- **プラットフォーム:**
  - [Cloudflare Workers](https://workers.cloudflare.com/): サーバーレス実行環境
  - [Cloudflare KV](https://developers.cloudflare.com/workers/learning/how-kv-works/): Key-Value データストア
- **フロントエンド:**
  - React
  - Nextjs
  - typescript

## 🛠️ セットアップとローカル開発

### 前提条件

- [Node.js](https://nodejs.org/) (v18 以降推奨)
- [npm](https://www.npmjs.com/) (Node.js に同梱)
- [Cloudflare アカウント](https://dash.cloudflare.com/sign-up)

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

3.  **環境変数の設定**

.env.sample を参考に .env ファイルを作成し、必要な環境変数を設定してください。

```bash
cd apps/frontend
cp .env.sample .env
```

.dev.vars.sample を参考に .dev.vars ファイルを作成し、supabase DB の URL を設定してください。

```bash
cd apps/backend
cp .dev.vars.sample .dev.vars
```

4.  **マイグレーションを実行**
    作成したマイグレーションファイルをもとに、DB にスキーマが反映(マイグレーションファイルは作成済み：bunx drizzle-kit generate)

```bash
bunx drizzle-kit migrate
```

5.  **開発サーバーを起動します:**
    ```bash
    cd apps/backend && bun run dev
    cd apps/frontend && bun run dev
    ```
    アプリケーションは `http://localhost:3000` で利用可能になります。
