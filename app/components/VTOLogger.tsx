// File: app/components/VTOLogger.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { transcribeAudio } from '@/lib/transcribeAudio'
import { v4 as uuidv4 } from 'uuid'
import { Task } from '@/types'
import VoiceUploadForm from './VoiceUploadForm'

export default function VTOLogger() {
  const [text, setText] = useState('')
  const [suggestedTag, setSuggestedTag] = useState<string | null>(null)
  const [confirmedTag, setConfirmedTag] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [showMic, setShowMic] = useState(true)
  const [fade, setFade] = useState(false)
  const micRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let fadeTimeout = setTimeout(() => setFade(true), 6000)
    return () => clearTimeout(fadeTimeout)
  }, [])

  useEffect(() => {
    const el = micRef.current
    if (!el) return

    let offset = { x: 0, y: 0 }
    let isDown = false

    const mouseDownHandler = (e: MouseEvent) => {
      isDown = true
      offset = {
        x: el.offsetLeft - e.clientX,
        y: el.offsetTop - e.clientY,
      }
    }

    const mouseMoveHandler = (e: MouseEvent) => {
      if (isDown) {
        el.style.left = `${e.clientX + offset.x}px`
        el.style.top = `${e.clientY + offset.y}px`
      }
    }

    const mouseUpHandler = () => {
      isDown = false
    }

    el.addEventListener('mousedown', mouseDownHandler)
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)

    return () => {
      el.removeEventListener('mousedown', mouseDownHandler)
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }
  }, [])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setText(value)
    if (value.toLowerCase().includes('health')) setSuggestedTag('Health')
    else if (value.toLowerCase().includes('invoice')) setSuggestedTag('Finance')
    else if (value.toLowerCase().includes('content'))
      setSuggestedTag('Creative')
    else setSuggestedTag(null)
  }

  const handleConfirmTag = () => {
    if (suggestedTag) setConfirmedTag(suggestedTag)
  }

  const handleTranscription = (transcribedText: string) => {
    setText(transcribedText)
    toast.success('Transcription complete!')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setFile(file)
  }

  const handleUploadClick = async () => {
    if (!file) return toast.error('Please select a file to transcribe.')
    const text = await transcribeAudio(file)
    setText(text)
    toast.success('Voice note transcribed!')
  }

  const handleSubmit = async () => {
    const task: Task = {
      id: uuidv4(),
      description: text,
      client: confirmedTag,
      date: new Date().toISOString(),
      amount: 0,
      billable: false,
    }

    await fetch('/api/save-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })

    toast.success('Task logged via VTO')
    setText('')
    setSuggestedTag(null)
    setConfirmedTag('')
  }

  const startVoiceCapture = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition
    if (!SpeechRecognition) {
      toast.error('Speech recognition not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-AU'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    toast.loading('ðŸŽ™ï¸ Listening... Speak now.')

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript
      setText(speechResult)
      toast.dismiss()
      toast.success('Voice captured!')
    }

    recognition.onerror = (event: any) => {
      toast.dismiss()
      toast.error(`Voice capture error: ${event.error}`)
    }

    recognition.start()
  }

  return (
    <div className="relative space-y-6">
      <div className="border p-6 rounded shadow bg-white space-y-6">
        <h2 className="text-xl font-bold">ðŸŽ™ï¸ Log a Task with VTO</h2>
        <div className="flex flex-col md:flex-row items-start gap-2">
          <Input
            placeholder="Type or speak your task here..."
            value={text}
            onChange={handleTextChange}
            className="w-full md:w-2/3"
          />
        </div>

        <VoiceUploadForm onTranscription={handleTranscription} />

        <div className="mt-2 flex items-center gap-2">
          <label className="text-sm font-medium">Upload a voice note</label>
          <input
            type="file"
            accept=".mp3,.wav"
            onChange={handleFileChange}
            className="text-sm"
          />
          <Button
            onClick={handleUploadClick}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Upload & Transcribe
          </Button>
        </div>

        {suggestedTag && !confirmedTag && (
          <div className="text-sm text-gray-600">
            Suggested folder:{' '}
            <span className="font-semibold">{suggestedTag}</span>
            <Button
              onClick={handleConfirmTag}
              className="ml-2 px-2 py-1 text-sm"
            >
              Confirm
            </Button>
          </div>
        )}

        {confirmedTag && (
          <div className="text-sm text-green-700">
            âœ… Folder confirmed: <strong>{confirmedTag}</strong>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          className="bg-green-600 text-white hover:bg-green-700 w-full"
        >
          Log Task
        </Button>
      </div>

      {/* Floating Speak Button */}
      {showMic && (
        <div
          ref={micRef}
          className={`fixed bottom-6 right-6 z-50 bg-purple-600 text-white rounded-full px-4 py-2 text-sm shadow-lg cursor-move transition-opacity duration-500 ${fade ? 'opacity-40' : 'opacity-100'}`}
          onClick={startVoiceCapture}
        >
          ðŸŽ™ï¸ Speak
        </div>
      )}
    </div>
  )
}

