// File: app/api/save-task/route.ts

import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { Task } from '@/types'

export async function POST(req: Request) {
  try {
    const newTask: Task = await req.json()

    const filePath = path.join(process.cwd(), 'public', 'data', 'tasks.json')
    const file = await import('fs/promises')
    const existingRaw = await file.readFile(filePath, 'utf8')
    const existing: Task[] = JSON.parse(existingRaw)

    existing.push(newTask)
    await file.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving task:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}

