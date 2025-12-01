'use client'

// SQL実行結果を表示するテーブルコンポーネント
import {
  Box,
  Table,
  Text,
  Alert,
} from '@chakra-ui/react'

type ResultData = {
  columns: string[]
  rows: Record<string, unknown>[]
  rowCount: number
  executionTime: number
}

type ResultTableProps = {
  result: ResultData | null | undefined
  error: string | null
}

export function ResultTable({ result, error }: ResultTableProps) {
  // エラーがある場合
  if (error) {
    return (
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          実行結果
        </Text>
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>エラー</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Root>
      </Box>
    )
  }

  // 結果がない場合
  if (!result) {
    return (
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          実行結果
        </Text>
        <Text color="gray.500">
          SQLを実行すると、ここに結果が表示されます。
        </Text>
      </Box>
    )
  }

  const { columns, rows, rowCount, executionTime } = result

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        実行結果
      </Text>

      {/* メタ情報 */}
      <Box mb={3}>
        <Text fontSize="sm" color="gray.600">
          {rowCount}件のレコード | 実行時間: {executionTime}ms
        </Text>
      </Box>

      {/* データがない場合 */}
      {rows.length === 0 ? (
        <Text color="gray.500">データがありません</Text>
      ) : (
        <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="md">
          <Table.Root size="sm" variant="outline">
            <Table.Header>
              <Table.Row bg="gray.50">
                {columns.map((column) => (
                  <Table.ColumnHeader key={column} fontWeight="bold">
                    {column}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((row, index) => (
                <Table.Row key={index}>
                  {columns.map((column) => (
                    <Table.Cell key={column}>
                      {String(row[column] ?? '')}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      )}
    </Box>
  )
}
