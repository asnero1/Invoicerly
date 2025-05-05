'use client'

import React, { useState } from 'react'

const GPTAssistant: React.FC = () => {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const askAssistant = async () => {
    if (!input.trim()) return
    setLoading(true)
    setResponse('')
    setError('')

    try {
      const res = await fetch('/api/gpt-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Unknown error')
      }

      setResponse(data.reply)
    } catch (err: any) {
      console.error('❌ GPT Assistant Error:', err)
      setError('❌ GPT API error occurred.')
    }

    setLoading(false)
  }

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <h2 className="text-lg font-semibold mb-2">🧠 GPT Assistant</h2>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && askAssistant()}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={askAssistant}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Ask
        </button>
      </div>
      {loading && <p className="text-sm text-gray-400">Thinking...</p>}
      {error && (
        <p className="text-sm text-red-600 bg-red-100 border border-red-300 p-2 rounded">
          {error}
        </p>
      )}
      {response && (
        <div className="mt-2 p-2 border rounded bg-gray-50 text-sm whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  )
}

export default GPTAssistant
