import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const user = url.searchParams.get('user')

  if (!user)
    return NextResponse.json({ error: 'Missing user param' }, { status: 400 })

  const filePath = path.join(process.cwd(), 'data/messages.json')
  const file = fs.readFileSync(filePath, 'utf-8')
  const messages = JSON.parse(file)

  const userMessages = messages.filter((m: any) => m.recipient === user)

  return NextResponse.json({ messages: userMessages })
}

