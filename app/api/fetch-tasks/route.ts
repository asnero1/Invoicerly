// âœ… /api/fetch-tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const taskFilePath = path.join(process.cwd(), 'data', 'tasks.json')

export async function GET(req: NextRequest) {
  try {
    const tasks = fs.existsSync(taskFilePath)
      ? JSON.parse(fs.readFileSync(taskFilePath, 'utf-8'))
      : []

    return NextResponse.json({ tasks })
  } catch (err) {
    console.error('âŒ Error reading tasks.json:', err)
    return NextResponse.json(
      { message: 'âŒ Failed to load tasks' },
      { status: 500 }
    )
  }
}

