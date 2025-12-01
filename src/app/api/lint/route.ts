// SQL構文チェック用のAPIエンドポイント
// SQLiteのEXPLAINを使用して構文の妥当性をチェック
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// 構文チェックの型定義
type LintRequest = {
  query: string
}

type LintResponse = {
  valid: boolean
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LintRequest = await request.json()
    const { query } = body

    // クエリが空の場合
    if (!query || query.trim() === '') {
      return NextResponse.json<LintResponse>(
        { valid: false, error: 'クエリが空です' },
        { status: 400 }
      )
    }

    // SELECT文のみ許可
    const trimmedQuery = query.trim().toLowerCase()
    if (!trimmedQuery.startsWith('select')) {
      return NextResponse.json<LintResponse>({
        valid: false,
        error: 'SELECT文のみ対応しています'
      })
    }

    // EXPLAINで構文チェック
    // EXPLAINは実際にクエリを実行せず、実行計画だけを返す
    await prisma.$queryRawUnsafe(`EXPLAIN ${query}`)

    // エラーが発生しなければ構文は正しい
    return NextResponse.json<LintResponse>({
      valid: true
    })
  } catch (error) {
    // 構文エラーの場合
    console.error('SQL構文チェックエラー:', error)

    const errorMessage = error instanceof Error
      ? error.message
      : '構文エラーが発生しました'

    return NextResponse.json<LintResponse>({
      valid: false,
      error: errorMessage
    })
  }
}
