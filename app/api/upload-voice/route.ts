import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file || !file.name) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const allowedTypes = ['audio/mpeg', 'audio/wav']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${Date.now()}-${file.name}`
    const voiceDir = path.join(process.cwd(), 'public', 'voice')

    // Create directory if it doesn't exist
    if (!fs.existsSync(voiceDir)) {
      fs.mkdirSync(voiceDir, { recursive: true })
    }

    const filePath = path.join(voiceDir, fileName)
    fs.writeFileSync(filePath, buffer)

    const url = `/voice/${fileName}`

    return NextResponse.json({ success: true, fileName, url }, { status: 200 })
  } catch (error: any) {
    console.error('❌ Voice upload failed:', error)
    return NextResponse.json({ error: 'Server error during upload' }, { status: 500 })
  }
}
