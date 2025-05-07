// âœ… FILE: components/SendMessageModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function SendMessageModal({
  recipient,
  onClose,
}: {
  recipient: { name: string; email: string; avatar: string; userId: string }
  onClose: () => void
}) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (!body && subject) {
      fetch('/api/suggest-reply', {
        method: 'POST',
        body: JSON.stringify({ subject }),
      })
        .then((res) => res.json())
        .then((data) => setSuggestions(data.suggestions || []))
    }
  }, [subject])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)
    const chunks: Blob[] = []

    recorder.ondataavailable = (e) => chunks.push(e.data)
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      setAudioBlob(blob)
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)
    }

    recorder.start()
    setMediaRecorder(recorder)
  }

  const stopRecording = () => {
    mediaRecorder?.stop()
  }

  const sendMessage = async () => {
    if (!subject.trim() || (!body.trim() && !audioUrl)) {
      toast.error('Please provide text or voice to send.')
      return
    }

    setLoading(true)

    let uploadedVoiceUrl = null
    if (audioBlob) {
      const formData = new FormData()
      formData.append('file', audioBlob, 'voice.webm')

      const res = await fetch('/api/upload-voice', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      uploadedVoiceUrl = data.url
    }

    const newMessage = {
      id: Date.now().toString(),
      from: 'Antonio Nero',
      fromUserId: 'asnero',
      fromAvatar: '/avatars/default.jpg',
      to: recipient.name,
      toUserId: recipient.userId,
      toEmail: recipient.email,
      toAvatar: recipient.avatar,
      subject,
      body,
      voice: uploadedVoiceUrl,
      date: new Date().toISOString(),
      read: false,
    }

    const res = await fetch('/api/send-message', {
      method: 'POST',
      body: JSON.stringify(newMessage),
    })

    if (res.ok) {
      toast.success('Message sent!')
      onClose()
    } else {
      toast.error('Failed to send message.')
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-400 hover:text-black"
        >
          âœ–
        </button>
        <h2 className="text-xl font-bold">
          ï¿½"ï¿½ New Message to {recipient.name}
        </h2>

        <Input
          placeholder="Subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Textarea
          rows={4}
          placeholder="Write your message..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {suggestions.length > 0 && (
          <div className="text-sm text-gray-500 space-y-1">
            <p className="font-semibold">ï¿½'ï¿½ Suggestions:</p>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setBody(s)}
                className="block text-left w-full px-3 py-1 hover:bg-gray-100 rounded"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 items-center">
          <Button variant="secondary" onClick={startRecording}>
            ðŸŽ¤ Start
          </Button>
          <Button variant="secondary" onClick={stopRecording}>
            â¹ Stop
          </Button>
          {audioUrl && (
            <audio controls src={audioUrl} className="ml-2 w-full" />
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={sendMessage}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </div>
    </div>
  )
}

