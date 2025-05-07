import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'messages.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const messages = JSON.parse(fileContents)
    return NextResponse.json(messages)
  } catch (error) {
    console.error('âŒ Failed to load messages:', error)
    return NextResponse.json(
      { error: 'Failed to load messages' },
      { status: 500 }
    )
  }
}

