// File: app/components/VoiceUploadForm.tsx

'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { transcribeAudio } from '@/lib/transcribeAudio' // ✅ clean, alias-based

interface Props {
  onTranscription: (text: string) => void
}

export default function VoiceUploadForm({ onTranscription }: Props) {
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const text = await transcribeAudio(file)
      onTranscription(text)
      toast.success('Voice transcription complete!')
    } catch (error) {
      toast.error('Transcription failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Upload a voice note</label>
      <input type="file" accept=".mp3,.wav" onChange={handleFileChange} />
      <Button disabled={loading}>
        {loading ? 'Transcribing...' : 'Upload & Transcribe'}
      </Button>
    </div>
  )
}
