'use client'

// SQL練習アプリのメインページ
import { useState } from 'react'
import { Container, VStack, Heading, Box, Toaster, createToaster, Alert } from '@chakra-ui/react'
import { SqlEditor } from '@/components/SqlEditor'
import { ResultTable } from '@/components/ResultTable'

// Toasterインスタンスを作成
const toaster = createToaster({
  placement: 'top-end',
  duration: 3000,
})

type ExecuteResponse = {
  success: boolean
  data?: {
    columns: string[]
    rows: Record<string, unknown>[]
    rowCount: number
    executionTime: number
  }
  error?: string
}

type LintResponse = {
  valid: boolean
  error?: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ExecuteResponse['data'] | null>(null)
  const [error, setError] = useState<string | null>(null)

  // SQL実行
  const handleExecute = async (query: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })

      const data: ExecuteResponse = await response.json()

      if (data.success && data.data) {
        setResult(data.data)
        toaster.create({
          title: '実行成功',
          description: `${data.data.rowCount}件のレコードを取得しました`,
          type: 'success',
        })
      } else {
        setError(data.error || '不明なエラーが発生しました')
        setResult(null)
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました')
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  // 構文チェック
  const handleLint = async (query: string) => {
    try {
      const response = await fetch('/api/lint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })

      const data: LintResponse = await response.json()

      if (data.valid) {
        toaster.create({
          title: '構文チェック成功',
          description: 'SQLの構文は正しいです',
          type: 'success',
        })
      } else {
        toaster.create({
          title: '構文エラー',
          description: data.error || '構文にエラーがあります',
          type: 'error',
        })
      }
    } catch (err) {
      toaster.create({
        title: 'エラー',
        description: 'ネットワークエラーが発生しました',
        type: 'error',
      })
    }
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        {/* ヘッダー */}
        <Box>
          <Heading size="2xl" mb={2}>
            SQL練習アプリ
          </Heading>
          <Box color="gray.600">
            ブラウザ上でSQLを練習できるアプリです。SELECTクエリを実行してみましょう!
          </Box>
        </Box>

        {/* SQLエディタ */}
        <SqlEditor
          onExecute={handleExecute}
          onLint={handleLint}
          isLoading={isLoading}
        />

        {/* 実行結果 */}
        <ResultTable result={result} error={error} />
      </VStack>

      {/* トースト通知 */}
      <Toaster toaster={toaster}>
        {(toast) => (
          <Alert.Root
            status={toast.type === 'success' ? 'success' : 'error'}
            variant="subtle"
            borderRadius="md"
            boxShadow="lg"
            minW="300px"
          >
            <Alert.Indicator />
            <Box flex="1">
              {toast.title && <Alert.Title>{toast.title}</Alert.Title>}
              {toast.description && (
                <Alert.Description>{toast.description}</Alert.Description>
              )}
            </Box>
          </Alert.Root>
        )}
      </Toaster>
    </Container>
  )
}
