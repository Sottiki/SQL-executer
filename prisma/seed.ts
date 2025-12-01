// データベース初期化用のシードスクリプト
import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

// Prisma 7ではアダプターが必要
const adapter = new PrismaBetterSqlite3({
  url: './prisma/dev.db'
})
const prisma = new PrismaClient({ adapter })

async function main() {
  // 既存のデータをクリア
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // サンプルユーザーを作成
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      age: 25,
      posts: {
        create: [
          {
            title: '初めての投稿',
            content: 'Aliceの最初の投稿です',
            published: true,
          },
          {
            title: '二つ目の投稿',
            content: 'まだ下書きです',
            published: false,
          },
        ],
      },
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob',
      age: 30,
      posts: {
        create: [
          {
            title: 'Bobの投稿',
            content: 'こんにちは、Bobです',
            published: true,
          },
        ],
      },
    },
  })

  const user3 = await prisma.user.create({
    data: {
      email: 'charlie@example.com',
      name: 'Charlie',
      age: 28,
    },
  })

  console.log('✅ シードデータを投入しました')
  console.log({ user1, user2, user3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
