import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function PATCH(req: NextRequest) {
  try {
    const { id, field, value } = await req.json()

    const filePath = path.join(process.cwd(), 'data', 'tasks.json')
    const fileExists = fs.existsSync(filePath)

    if (!fileExists) {
      return NextResponse.json(
        { error: 'Tasks file not found' },
        { status: 404 }
      )
    }

    const raw = fs.readFileSync(filePath, 'utf-8')
    const tasks = JSON.parse(raw)

    const index = tasks.findIndex((t: any) => t.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // Coerce boolean if editing 'billable'
    tasks[index][field] = field === 'billable' ? value === 'true' : value

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('❌ Failed to update task:', err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

