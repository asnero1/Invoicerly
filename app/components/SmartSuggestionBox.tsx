'use client'

import { useEffect, useState } from 'react'

export default function SmartSuggestionBox({
  suggestions,
  onApply,
}: {
  suggestions: { message: string; action?: () => void }[]
  onApply: () => void
}) {
  const [visible, setVisible] = useState(false)
  const [dismissCount, setDismissCount] = useState(0)
  const [hiddenNotice, setHiddenNotice] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const storedCount = Number(localStorage.getItem('smartDismissCount') || '0')
    setDismissCount(storedCount)

    if (storedCount < 3) {
      setVisible(true)
    } else {
      setHiddenNotice(true)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % suggestions.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [suggestions.length])

  const dismiss = () => {
    const newCount = dismissCount + 1
    setDismissCount(newCount)
    localStorage.setItem('smartDismissCount', String(newCount))
    setVisible(false)
    if (newCount >= 3) setHiddenNotice(true)
  }

  const reset = () => {
    localStorage.setItem('smartDismissCount', '0')
    setDismissCount(0)
    setVisible(true)
    setHiddenNotice(false)
  }

  if (!visible && !hiddenNotice) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {visible ? (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs">
          <h3 className="font-semibold text-sm mb-2">ðŸ'¡ Smart Suggestions</h3>
          <ul className="text-sm space-y-1">
            {suggestions.map((s, idx) => (
              <li key={idx}>ðŸ‘‰ {s.message}</li>
            ))}
          </ul>
          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={dismiss}
              className="text-xs px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              Dismiss
            </button>
            <button
              onClick={() => {
                onApply()
                dismiss()
              }}
              className="text-xs px-3 py-1 rounded bg-purple-700 text-white hover:bg-purple-800"
            >
              Apply
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-400 text-right">
          <button
            onClick={reset}
            className="hover:underline hover:text-purple-700"
          >
            Suggestions hidden. Tap to show.
          </button>
        </div>
      )}
    </div>
  )
}

