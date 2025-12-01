'use client'

// SQLエディタコンポーネント
// textareaベースの簡易エディタ（後でMonaco Editorに置き換え予定）
import { useState } from 'react'
import { Box, Textarea, Button, HStack, Text } from '@chakra-ui/react'

type SqlEditorProps = {
  onExecute: (query: string) => void
  onLint: (query: string) => void
  isLoading: boolean
}

export function SqlEditor({ onExecute, onLint, isLoading }: SqlEditorProps) {
  const [query, setQuery] = useState('SELECT * FROM User;')

  const handleExecute = () => {
    if (query.trim()) {
      onExecute(query)
    }
  }

  const handleLint = () => {
    if (query.trim()) {
      onLint(query)
    }
  }

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        SQLエディタ
      </Text>

      {/* SQLエディタ本体 */}
      <Textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="SELECT * FROM User;"
        minHeight="200px"
        fontFamily="monospace"
        fontSize="md"
        mb={3}
      />

      {/* 実行ボタン */}
      <HStack gap={2}>
        <Button
          onClick={handleExecute}
          colorScheme="blue"
          disabled={isLoading || !query.trim()}
          loading={isLoading}
        >
          実行
        </Button>

        <Button
          onClick={handleLint}
          variant="outline"
          disabled={isLoading || !query.trim()}
        >
          構文チェック
        </Button>
      </HStack>
    </Box>
  )
}
