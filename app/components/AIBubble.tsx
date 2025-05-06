// ✅ FILE: /components/AIBubble.tsx

'use client'

import { useState } from 'react'
import { Sparkles, X, Bot } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function AIBubble() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const fetchAIResponse = async (action: string) => {
    try {
      setLoading(true)
      const res = await fetch('/api/assistant', {
        method: 'POST',
        body: JSON.stringify({ action }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      toast(data.message || '✅ Done')
    } catch (e) {
      toast.error('❌ Failed to fetch AI response')
    } finally {
      setLoading(false)
    }
  }

  const handleSummarize = () => fetchAIResponse('summarize')
  const handleSuggestInvoice = () => fetchAIResponse('suggest_invoice')
  const handleReminder = () => toast('⏰ I’ll remind you again in 1 hour.')

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="bg-white border shadow-lg rounded-lg w-64 p-4 space-y-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-1">
              <Bot className="w-4 h-4" /> Smart Actions
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleSummarize}
            className="text-sm text-left w-full px-3 py-2 hover:bg-gray-50 rounded border border-gray-200 disabled:opacity-50"
            disabled={loading}
          >
            🧠 Summarize recent activity
          </button>

          <button
            onClick={handleSuggestInvoice}
            className="text-sm text-left w-full px-3 py-2 hover:bg-gray-50 rounded border border-gray-200 disabled:opacity-50"
            disabled={loading}
          >
            🧾 Suggest invoice from log
          </button>

          <button
            onClick={handleReminder}
            className="text-sm text-left w-full px-3 py-2 hover:bg-gray-50 rounded border border-gray-200"
          >
            ⏰ Remind me about this later
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xl"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

