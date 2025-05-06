// File: app/lib/transcribeAudio.ts

// This is a mock helper to simulate transcription. Replace this with real API (OpenAI Whisper, Deepgram, etc)

export async function transcribeAudio(file: File): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Transcribed placeholder for file: ${file.name}`)
    }, 1500)
  })
}

