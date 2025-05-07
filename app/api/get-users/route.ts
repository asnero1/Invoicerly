// app/api/get-users/route.ts
import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'users.json')
    const fileContents = await fs.readFile(filePath, 'utf-8')
    const users = JSON.parse(fileContents)

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error loading users:', error)
    return NextResponse.json({ error: 'Failed to load users' }, { status: 500 })
  }
}

