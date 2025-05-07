'use client'

import { useState, useEffect } from 'react'

type ContactProModalProps = {
  open: boolean
  onClose: () => void
  recipientName: string
  recipientId: string
}

export default function ContactProModal({
  open,
  onClose,
  recipientName,
  recipientId,
}: ContactProModalProps) {
  const [message, setMessage] = useState('')
  const [senderName, setSenderName] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  )
  const [voiceNote, setVoiceNote] = useState<File | null>(null) // New state for file upload

  useEffect(() => {
    setMessage(`Hey ${recipientName}, I saw your spruke and wanted to connect!`)
  }, [recipientName])

  if (!open) return null

  const handleSend = async () => {
    if (!message.trim()) return

    setStatus('sending')

    try {
      // Sending just message + name (basic MVP version)
      const res = await fetch('/api/contact-pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: senderName || 'Anonymous',
          recipient: recipientId,
          message,
        }),
      })

      const result = await res.json()
      if (result.success) {
        setStatus('sent')
        setMessage('')
        setSenderName('')
        setVoiceNote(null)
        setTimeout(() => onClose(), 2000)
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Contact {recipientName}
        </h2>

        <textarea
          rows={4}
          className="w-full border p-2 rounded mb-3 text-sm"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="text"
          className="w-full border p-2 rounded mb-3 text-sm"
          placeholder="Your name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
        />

        {/* ðŸŽ™ Voice message input */}
        <input
          type="file"
          accept="audio/*"
          className="mb-3 block text-sm"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setVoiceNote(file)
              setMessage(`[Voice message attached: ${file.name}]`)
            }
          }}
        />

        {voiceNote && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">
              ðŸŽ§ Preview: {voiceNote.name}
            </p>
            <audio
              controls
              src={URL.createObjectURL(voiceNote)}
              className="w-full rounded"
            />
          </div>
        )}

        <div className="flex justify-between">
          <button
            className="bg-pink-600 text-white px-4 py-1 rounded shadow hover:bg-pink-700 text-sm"
            onClick={handleSend}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send'}
          </button>

          <button
            className="bg-gray-300 text-gray-700 px-4 py-1 rounded shadow text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

        {status === 'sent' && (
          <p className="text-green-600 text-sm mt-3">âœ… Message sent!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-sm mt-3">âŒ Error sending message.</p>
        )}
      </div>
    </div>
  )
}

