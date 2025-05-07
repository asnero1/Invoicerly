// âœ… FILE: /components/AIAssistant.tsx ï¿½" Floating AI Assistant

'use client'

import React, { useState } from 'react'

const AIAssistant: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setResponse('')

    const res = (await fetch('/api/ask-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })) as Response;
    
    const data = await res.json();
    
    setResponse(data.reply || 'âš ï¸ No response received.');
    setLoading(false);
    
  }

  return (
    <div id="ai-assistant">
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 z-50"
      >
        ðŸ§  Ask AI
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold mb-2">AI Assistant</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask something like: What are my most urgent tasks?"
              className="w-full border rounded p-2 mb-2"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
              <button
                onClick={handleAsk}
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
              >
                {loading ? 'Thinking...' : 'Ask'}
              </button>
            </div>
            {response && (
              <div className="mt-4 p-3 border bg-gray-50 rounded text-sm whitespace-pre-wrap">
                {response}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AIAssistant

