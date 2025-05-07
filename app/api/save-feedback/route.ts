// File: app/api/save-feedback/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const FEEDBACK_FILE = path.resolve(process.cwd(), 'public/data/feedback.json')

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const existing = fs.existsSync(FEEDBACK_FILE)
      ? JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf-8'))
      : []

    const newFeedback = { id: Date.now(), ...body }
    const updated = [...existing, newFeedback]

    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(updated, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving feedback:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save feedback' },
      { status: 500 }
    )
  }
}

