// âœ… FILE: app/api/whatsapp/route.ts
import { NextResponse } from 'next/server'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

const messagesPath = join(process.cwd(), 'data', 'messages.json')

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const from = data.get('From')?.toString() || 'unknown'
    const body = data.get('Body')?.toString() || ''
    const timestamp = new Date().toISOString()

    const newMessage = {
      id: uuidv4(),
      from,
      body,
      timestamp,
      source: 'whatsapp',
    }

    const existing = readFileSync(messagesPath, 'utf-8')
    const messages = JSON.parse(existing)
    messages.push(newMessage)
    writeFileSync(messagesPath, JSON.stringify(messages, null, 2))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error logging WhatsApp message:', err)
    return NextResponse.json({ success: false })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'whatsapp inbox route live' })
}

