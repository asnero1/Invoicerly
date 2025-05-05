import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: Request) {
  const body = await req.json()
  const filePath = path.join(process.cwd(), 'data', 'messages.json')

  try {
    const existingRaw = await fs.readFile(filePath, 'utf-8')
    const existing = JSON.parse(existingRaw || '[]')

    const newMessage = {
      ...body,
      timestamp: new Date().toISOString(),
    }

    const updated = [newMessage, ...existing]
    await fs.writeFile(filePath, JSON.stringify(updated, null, 2), 'utf-8')

    return Response.json({ success: true })
  } catch (err) {
    console.error('❌ Failed to save message:', err)
    return Response.json({ success: false }, { status: 500 })
  }
}
