import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Task } from 'types/task'

const filePath = path.join(process.cwd(), 'data', 'tasks.json')

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 })
    }

    const existing = fs.readFileSync(filePath, 'utf-8')
    const tasks: Task[] = JSON.parse(existing)
    const updatedTasks = tasks.filter((task) => task.id !== id)

    fs.writeFileSync(filePath, JSON.stringify(updatedTasks, null, 2))

    return NextResponse.json({ message: 'Task deleted' }, { status: 200 })
  } catch (err) {
    console.error('❌ Failed to delete task:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
