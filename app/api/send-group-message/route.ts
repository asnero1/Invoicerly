// ✅ FILE: /app/api/send-group-message/route.ts

import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { NextResponse } from 'next/server'

const DATA_PATH = path.join(process.cwd(), 'public/data/group-messages.json')

export async function POST(req: Request) {
  try {
    const { sender, groupId, content } = await req.json()

    if (!sender || !groupId || !content) {
      return NextResponse.json({ status: 'error', message: 'Missing fields' })
    }

    const fileData = await fs.readFile(DATA_PATH, 'utf-8')
    const messages = JSON.parse(fileData)

    const newMessage = {
      id: uuid(),
      groupId,
      sender,
      content,
      timestamp: new Date().toISOString(),
    }

    messages.push(newMessage)

    await fs.writeFile(DATA_PATH, JSON.stringify(messages, null, 2))

    return NextResponse.json({ status: 'ok', message: newMessage })
  } catch (e) {
    console.error('❌ Failed to send group message:', e)
    return NextResponse.json({
      status: 'error',
      message: 'Failed to send message',
    })
  }
}

