import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Task } from '../../../types/task'

const tasksFile = path.join(process.cwd(), 'data', 'tasks.json')

export async function POST(req: Request) {
  try {
    const { client } = await req.json()

    if (!client) {
      return NextResponse.json({ error: 'Client is required' }, { status: 400 })
    }

    let tasks: Task[] = []

    if (fs.existsSync(tasksFile)) {
      const fileContent = fs.readFileSync(tasksFile, 'utf8')
      tasks = JSON.parse(fileContent)
    }

    const billableTasks = tasks.filter((task: Task) => task.client === client && task.billable)

    if (billableTasks.length === 0) {
      return NextResponse.json({ error: 'No billable tasks found for client' }, { status: 404 })
    }

    const invoice = {
      client,
      tasks: billableTasks,
      totalAmount: billableTasks.length * 50, // Example logic
    }

    return NextResponse.json({ message: 'Invoice generated', invoice })
  } catch (error) {
    console.error('Error generating invoice:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
