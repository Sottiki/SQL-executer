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
