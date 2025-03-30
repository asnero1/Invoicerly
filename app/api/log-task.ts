import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Task } from '@shared/task' // adjust path if alias isn't working

const filePath = path.join(process.cwd(), 'data', 'tasks.json')

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const voiceNote = formData.get('voiceNote')
    const attachment = formData.get('attachment') as File | null

    const newTask: Task = {
      id: Date.now().toString(),
      description: formData.get('description') as string,
      client: formData.get('client') as string,
      date: formData.get('date') as string,
      billable: formData.get('billable') === 'true',
      dueDate: (formData.get('dueDate') as string) || '',
      voiceNote: typeof voiceNote === 'string' ? voiceNote : '',
      attachmentName: attachment?.name || '',
    }

    // 🧠 Load existing tasks
    let tasks: Task[] = []
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      tasks = JSON.parse(fileContent)
    }

    // 🚫 Prevent duplicates
    const isDuplicate = tasks.some(
      (task) =>
        task.description === newTask.description &&
        task.client === newTask.client &&
        task.date === newTask.date
    )

    if (isDuplicate) {
      console.warn('⚠️ Duplicate task detected:', newTask)
      return NextResponse.json({ error: 'Duplicate task' }, { status: 409 })
    }

    // ✅ Save task
    tasks.push(newTask)
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))

    console.log('✅ Task saved to tasks.json:', newTask)
    return NextResponse.json({ message: 'Task saved!', task: newTask }, { status: 200 })
  } catch (err) {
    console.error('❌ Error saving task:', err)
    return NextResponse.json({ error: 'Failed to save task' }, { status: 500 })
  }
}
