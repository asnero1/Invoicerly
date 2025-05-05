// ✅ FILE: app/api/send-message/route.ts
import { NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'

const FILE_PATH = path.join(process.cwd(), 'public', 'data', 'messages.json')

export async function POST(req: Request) {
  try {
    const newMessage = await req.json()

    // Read existing messages
    const data = await readFile(FILE_PATH, 'utf-8')
    const messages = JSON.parse(data)

    // Add new message to list
    messages.push(newMessage)

    // Save back to file
    await writeFile(FILE_PATH, JSON.stringify(messages, null, 2))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('❌ Failed to save message:', err)
    return NextResponse.json(
      { success: false, error: 'Could not save message' },
      { status: 500 }
    )
  }
}
