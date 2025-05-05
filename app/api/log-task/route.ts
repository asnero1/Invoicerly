// ✅ FILE: app/api/log-task/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { logVoiceTask } from '@/utils/voiceToText'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${uuidv4()}-${file.name}`
    const uploadDir = path.join(process.cwd(), 'public', 'voice')
    const filePath = path.join(uploadDir, filename)

    await mkdir(uploadDir, { recursive: true })
    await writeFile(filePath, buffer)

    const task = await logVoiceTask(filename)

    return NextResponse.json({
      success: true,
      task,
      fileUrl: `/voice/${filename}`,
    })
  } catch (error) {
    console.error('[UPLOAD ERROR]', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
