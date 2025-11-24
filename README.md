# SQL-executer SQL Practice App

ブラウザ上で SQL を書いて実行できる練習用アプリです。  
最初は Next.js だけで動く構成から始めています。

---
# 実行計画
## Features

### 基本機能（MVP）

- SQL エディタ（textarea / 後々 Monaco へ置き換え）
- 構文チェック  
  - SQLite の `EXPLAIN` を使用
- SQL 実行（SELECT のみ許可）
- 実行結果のテーブル表示  
  - カラム名  
  - 行データ  
  - 件数  
  - 実行時間（ms）
- エラー表示

### 今後追々追加予定

- テーブル一覧・スキーマ情報の表示  
- Monaco Editor 対応  
- 問題モード（クエリ採点）  
- クエリ履歴  
- DB 初期化スクリプト  
- 認証（必要であれば）

---

## Tech Stack

### Frontend / App

- Next.js 14 (App Router)
- React
- TypeScript

### Backend（Next.js内の API Routes）

- `/api/execute` — SQL 実行  
- `/api/lint` — 構文チェック  
- Prisma  
  - スキーマ管理  
  - 生 SQL 実行（`$queryRawUnsafe`）

### Database

- SQLite（ローカルファイル）
- Prisma schema による簡易定義  
  - 例：User テーブル

---

## Directory

```
app/
  page.tsx
  api/
    execute/
      route.ts
    lint/
      route.ts
prisma/
  schema.prisma
```

---

## Development Flow

1. Next.js だけで MVP を完成  
2. エディタを Monaco Editor に差し替え  
3. スキーマ閲覧・簡易ドリル機能を追加  
4. 必要に応じて Go バックエンドへ分離

---

## Setup

```
npm install
npx prisma migrate dev
npm run dev
```


===
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
