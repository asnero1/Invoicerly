import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const filePath = path.join(process.cwd(), 'data', 'tasks.json')

export async function PUT(req: Request) {
  const updatedTask = await req.json()

  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    const tasks = JSON.parse(data)

    const newTasks = tasks.map((t: any) => (t.id === updatedTask.id ? updatedTask : t))

    fs.writeFileSync(filePath, JSON.stringify(newTasks, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Update Error:', error)
    return new NextResponse('Failed to update task.', { status: 500 })
  }
}
