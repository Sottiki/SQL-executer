# プロジェクトの概要
ブラウザ上で SQL を書いて実行できる練習用アプリを作る。
学習用途が中心で、ユーザーが手軽に SQL の動作を確認できる環境を提供。

⸻

## 基本機能（MVP）
	1.	SQL エディタ
	•	最初は <textarea>、後に Monaco Editor へ置き換え
	2.	構文チェック
	•	SQLite の EXPLAIN 等で簡易的に構文を確認
	3.	SQL 実行
	•	SELECT 文のみ許可
	4.	結果表示
	•	カラム名・行データ・件数・実行時間を表示
	5.	エラー表示

⸻

## 使用技術
バージョンは常にpackage-lock.jsonを参考にして下さい。
### フロントエンド
	•	Next.js (App Router)
	•	React + TypeScript
	•	Chakra UI v3（UI コンポーネント、スタイル管理）
	•	@emotion/react, @emotion/styled（Chakra UI の依存）
	•	Framer Motion（アニメーション）

### バックエンド（最初は Next.js 内で完結）
	•	Next.js API Routes で SQL 実行・構文チェック
	•	Prisma
	•	スキーマ管理
	•	生 SQL 実行（$queryRawUnsafe）

### データベース
	•	SQLite
	•	ローカルファイルで簡易実行
	•	Prisma schema でテーブル定義

⸻

## 開発フロー（暫定）
	1.	Next.js だけで MVP を作成
	2.	エディタを Monaco Editor に置き換え
	3.	スキーマ閲覧や簡易ドリル機能の追加
	4.	必要に応じて Go バックエンドや PostgreSQL へ拡張
	5.	将来的に Docker 化を検討（Go/PGSQL 移行時がベター）

## コーディング規約
- 日本語でコメントを記述
- コンポーネントは関数コンポーネントのみ使用

## ルール
日本語を使用します
常に解説を交えて下さい
