'use client'

import { useEffect, useState } from 'react'

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('seenWelcome')
    if (!seen) setVisible(true)
  }, [])

  const close = () => {
    localStorage.setItem('seenWelcome', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-2">ðŸ‘‹ Welcome to Invoicerly</h2>
        <p className="text-gray-600 text-sm mb-4">
          Hereâ€™s the fastest way to log, track, and invoice your work. Start by
          logging a task or heading to your inbox. Youâ€™re in full control.
        </p>
        <button
          className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
          onClick={close}
        >
          Letâ€™s go!
        </button>
      </div>
    </div>
  )
}

