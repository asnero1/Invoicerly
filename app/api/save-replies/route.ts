// âœ… FILE: app/api/save-replies/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const FILE_PATH = path.join(process.cwd(), 'public/data/replies.json')

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    await fs.mkdir(path.dirname(FILE_PATH), { recursive: true })
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
    return NextResponse.json({ status: 'success' })
  } catch (err) {
    console.error('âŒ Failed to save replies:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET() {
  try {
    const content = await fs.readFile(FILE_PATH, 'utf-8')
    return new NextResponse(content, {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new NextResponse(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

