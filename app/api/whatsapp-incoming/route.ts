'use server'

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const messagesPath = path.join(process.cwd(), 'app/data/messages.json')

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData()

    const from = body.get('From')?.toString() || ''
    const to = body.get('To')?.toString() || ''
    const message = body.get('Body')?.toString() || ''

    const newReply = {
      id: Date.now().toString(),
      from,
      to,
      message,
      timestamp: new Date().toISOString(),
      source: 'whatsapp',
    }

    // Load existing messages
    const data = fs.readFileSync(messagesPath, 'utf8')
    const existing = JSON.parse(data)

    // Append new message
    existing.push(newReply)

    fs.writeFileSync(messagesPath, JSON.stringify(existing, null, 2))

    return NextResponse.json({ status: 'ok', logged: newReply })
  } catch (err) {
    console.error('WhatsApp webhook error:', err)
    return NextResponse.json(
      { error: 'failed to log message' },
      { status: 500 }
    )
  }
}

