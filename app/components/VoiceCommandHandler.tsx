// ✅ FILE: app/components/VoiceCommandHandler.tsx
'use client'

import React, { useState, useRef } from 'react'
import { toast } from 'sonner'

const VoiceCommandHandler = () => {
  const [recording, setRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunks.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' })
        const audioFile = new File([audioBlob], `voice-${Date.now()}.wav`, {
          type: 'audio/wav',
        })

        const formData = new FormData()
        formData.append('voice', audioFile)

        const res = await fetch('/api/log-task', {
          method: 'POST',
          body: formData,
        })

        if (res.ok) {
          const { fileUrl } = await res.json()
          setAudioURL(fileUrl)
          toast.success('Voice task uploaded')
        } else {
          toast.error('Failed to upload')
        }
      }

      mediaRecorder.start()
      setRecording(true)
    } catch (err) {
      toast.error('Microphone access denied')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  return (
    <div className="space-y-4 text-center">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-4 py-2 text-white rounded-full ${
          recording ? 'bg-red-600' : 'bg-blue-600'
        }`}
      >
        {recording ? 'Stop Recording' : '🎤 Voice Log Task'}
      </button>

      {audioURL && (
        <div>
          <p className="text-sm text-gray-500">Last Recorded:</p>
          <audio controls src={audioURL} className="mx-auto" />
        </div>
      )}
    </div>
  )
}

export default VoiceCommandHandler
