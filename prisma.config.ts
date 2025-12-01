// Prisma 7の設定ファイル（プロジェクトルートに配置）
// 参考: https://www.prisma.io/docs/orm/reference/prisma-config-reference
import { defineConfig } from 'prisma/config'

export default defineConfig({
  // スキーマファイルのパス
  schema: 'prisma/schema.prisma',

  // マイグレーションファイルのパス
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },

  // データソース設定
  datasource: {
    url: 'file:./prisma/dev.db',
  },
})
