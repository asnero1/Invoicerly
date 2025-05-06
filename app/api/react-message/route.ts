import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const DATA_PATH = path.join(process.cwd(), 'public/data/messages.json')

export async function POST(req: Request) {
  try {
    const { id, emoji } = await req.json()

    const fileData = await fs.readFile(DATA_PATH, 'utf-8')
    const messages = JSON.parse(fileData)

    const msgIndex = messages.findIndex((msg: any) => msg.id === id)
    if (msgIndex === -1) {
      return NextResponse.json({
        status: 'error',
        message: 'Message not found',
      })
    }

    const existingReactions = messages[msgIndex].reactions ?? []

    if (!existingReactions.includes(emoji)) {
      messages[msgIndex].reactions = [...existingReactions, emoji]
    }

    await fs.writeFile(DATA_PATH, JSON.stringify(messages, null, 2))

    return NextResponse.json({ status: 'ok', updated: messages[msgIndex] })
  } catch (error) {
    console.error('❌ Reaction update failed:', error)
    return NextResponse.json({ status: 'error', message: 'Reaction failed' })
  }
}

