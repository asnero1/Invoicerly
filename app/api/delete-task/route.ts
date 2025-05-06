import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// ✅ Path to tasks.json
const taskFilePath = path.join(process.cwd(), 'data', 'tasks.json')

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const taskId = searchParams.get('id')

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }

    // ✅ Read tasks.json
    const tasks = fs.existsSync(taskFilePath)
      ? JSON.parse(fs.readFileSync(taskFilePath, 'utf8'))
      : []

    const taskIndex = tasks.findIndex((task: any) => task.id === taskId)
    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // ✅ Delete attachment if exists
    const taskToDelete = tasks[taskIndex]
    if (taskToDelete.attachment) {
      const attachmentPath = path.join(
        process.cwd(),
        'public',
        taskToDelete.attachment
      )
      if (fs.existsSync(attachmentPath)) {
        fs.unlinkSync(attachmentPath)
      }
    }

    // ✅ Remove task and update file
    tasks.splice(taskIndex, 1)
    fs.writeFileSync(taskFilePath, JSON.stringify(tasks, null, 2))

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('❌ Error deleting task:', error)
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}

