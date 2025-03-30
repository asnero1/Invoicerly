import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'tasks.json')

export async function GET() {
  try {
    const file = fs.readFileSync(filePath, 'utf-8')
    const tasks = JSON.parse(file)
    return NextResponse.json({ tasks })
  } catch (err) {
    console.error('❌ Failed to fetch tasks:', err)
    return NextResponse.json({ tasks: [] }, { status: 500 })
  }
}
