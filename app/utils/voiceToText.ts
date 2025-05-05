// ✅ FILE: app/utils/voiceToText.ts

import fs from 'fs'
import path from 'path'
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function transcribeVoiceFile(filename: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'public', 'voice', filename)

  if (!fs.existsSync(filePath)) {
    throw new Error('Voice file not found')
  }

  const fileStream = fs.createReadStream(filePath)

  const transcription = await openai.audio.transcriptions.create({
    file: fileStream,
    model: 'whisper-1',
    response_format: 'text',
    language: 'en',
  })

  return transcription as string
}

// ✅ NEW: Auto-detects client & saves task
export async function logVoiceTask(filename: string) {
  const text = await transcribeVoiceFile(filename)

  const matchClient =
    (text.match(/for\s([A-Z][a-z]+\s?[A-Z]?[a-z]*)/) || [])[1] || 'General'
  const isBillable = /(invoice|charge|bill|paid|rate)/i.test(text)

  const newTask = {
    id: Date.now().toString(),
    description: text,
    client: matchClient,
    payer: matchClient,
    date: new Date().toISOString(),
    paid: false,
    amount: 0,
    voiceNote: `/voice/${filename}`,
    billable: isBillable,
  }

  const filePath = path.join(process.cwd(), 'app', 'data', 'tasks.json')
  const existing = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
    : []

  existing.push(newTask)
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2))

  return newTask
}
