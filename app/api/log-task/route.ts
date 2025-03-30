// app/api/log-task/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { IncomingForm, Files, Fields } from 'formidable'
import { v4 as uuidv4 } from 'uuid'
import { Readable } from 'stream'
import fs from 'fs'
import path from 'path'
import type { IncomingMessage } from 'http'

// Disable Next.js default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
}

const filePath = path.join(process.cwd(), 'data', 'tasks.json')

export async function POST(req: NextRequest) {
  console.log('✅ log-task API hit')

  try {
    const { fields, files } = await parseFormData(req)

    // Flatten the form field values
    const newTask = {
      id: uuidv4(),
      description: Array.isArray(fields.description) ? fields.description[0] : '',
      client: Array.isArray(fields.client) ? fields.client[0] : '',
      date: Array.isArray(fields.date) ? fields.date[0] : '',
      billable: Array.isArray(fields.billable) ? fields.billable[0] === 'true' : false,
      voiceNote: Array.isArray(fields.voiceNote) ? fields.voiceNote[0] : '',
      dueDate: Array.isArray(fields.dueDate) ? fields.dueDate[0] : '',
      attachmentName: files.attachment?.[0]?.originalFilename || '',
    }

    // Read existing tasks
    let tasks = []
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      tasks = JSON.parse(fileContent)
    }

    tasks.push(newTask)
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))

    return NextResponse.json({ success: true, task: newTask })
  } catch (err: any) {
    console.error('❌ Error saving task:', err)
    return NextResponse.json({ success: false, error: 'Failed to save task' }, { status: 500 })
  }
}

// Helper to parse multipart form data
async function parseFormData(req: NextRequest): Promise<{ fields: Fields; files: Files }> {
  const IncomingForm = (await import('formidable')).IncomingForm
  const form = new IncomingForm({ keepExtensions: true, multiples: true })

  const reqNode = Object.assign(
    Readable.from(Buffer.from(await req.arrayBuffer())) as unknown as IncomingMessage,
    {
      headers: Object.fromEntries(req.headers),
      method: req.method,
      url: req.url || '',
    }
  )

  return new Promise((resolve, reject) => {
    form.parse(reqNode, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })
}
