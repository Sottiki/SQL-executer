// SQL実行用のAPIエンドポイント
// SELECTクエリのみを許可し、結果を返す
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// SQL実行の型定義
type ExecuteRequest = {
  query: string
}

type ExecuteResponse = {
  success: boolean
  data?: {
    columns: string[]
    rows: unknown[]
    rowCount: number
    executionTime: number
  }
  error?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ExecuteRequest = await request.json()
    const { query } = body

    // クエリが空の場合
    if (!query || query.trim() === '') {
      return NextResponse.json<ExecuteResponse>(
        { success: false, error: 'クエリが空です' },
        { status: 400 }
      )
    }

    // SELECT文のみ許可（セキュリティ対策）
    const trimmedQuery = query.trim().toLowerCase()
    if (!trimmedQuery.startsWith('select')) {
      return NextResponse.json<ExecuteResponse>(
        {
          success: false,
          error: 'SELECT文のみ実行可能です。INSERT、UPDATE、DELETEは使用できません。'
        },
        { status: 400 }
      )
    }

    // 実行時間計測開始
    const startTime = performance.now()

    // SQLを実行
    const result = await prisma.$queryRawUnsafe(query)

    // 実行時間計測終了
    const executionTime = performance.now() - startTime

    // 結果が配列でない場合（通常は配列が返る）
    if (!Array.isArray(result)) {
      return NextResponse.json<ExecuteResponse>(
        { success: false, error: '予期しない結果形式です' },
        { status: 500 }
      )
    }

    // カラム名を取得（最初の行から）
    const columns = result.length > 0 ? Object.keys(result[0]) : []

    // 成功レスポンスを返す
    return NextResponse.json<ExecuteResponse>({
      success: true,
      data: {
        columns,
        rows: result,
        rowCount: result.length,
        executionTime: Math.round(executionTime * 100) / 100, // 小数点2桁まで
      },
    })
  } catch (error) {
    // エラーハンドリング
    console.error('SQL実行エラー:', error)

    const errorMessage = error instanceof Error
      ? error.message
      : '不明なエラーが発生しました'

    return NextResponse.json<ExecuteResponse>(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}
