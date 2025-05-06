// ✅ FILE: app/components/VoiceReplyForm.tsx
'use client'

import React, { useState } from 'react'

interface Props {
  messageId: string
  onSuccess?: () => void
}

export default function VoiceReplyForm({ messageId, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('messageId', messageId)

    try {
      const res = await fetch('/api/save-replies', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')

      if (onSuccess) onSuccess()
    } catch (err) {
      console.error('Voice reply upload error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2 border p-4 rounded bg-white shadow max-w-md">
      <h3 className="text-sm font-medium">🎧 Upload Voice Reply</h3>
      <input
        type="file"
        accept=".mp3,.wav"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full text-sm"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Reply'}
      </button>
    </div>
  )
}

