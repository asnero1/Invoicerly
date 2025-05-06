// ✅ FILE 2: /app/api/mark-seen/route.ts

import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const DATA_PATH = path.join(process.cwd(), 'public/data/messages.json')

export async function POST(req: Request) {
  try {
    const { viewer, contact } = await req.json()

    const fileData = await fs.readFile(DATA_PATH, 'utf-8')
    const messages = JSON.parse(fileData)

    let updatedCount = 0

    messages.forEach((msg: any) => {
      const isContactMatch =
        [msg.sender.toLowerCase(), msg.receiver.toLowerCase()].includes(
          viewer.toLowerCase()
        ) &&
        [msg.sender.toLowerCase(), msg.receiver.toLowerCase()].includes(
          contact.toLowerCase()
        )

      if (
        isContactMatch &&
        msg.sender.toLowerCase() === contact.toLowerCase()
      ) {
        msg.seenBy = Array.isArray(msg.seenBy) ? msg.seenBy : []
        if (!msg.seenBy.includes(viewer)) {
          msg.seenBy.push(viewer)
          updatedCount++
        }
      }
    })

    await fs.writeFile(DATA_PATH, JSON.stringify(messages, null, 2))

    return NextResponse.json({ status: 'ok', updated: updatedCount })
  } catch (error) {
    console.error('❌ Failed to mark messages as seen:', error)
    return NextResponse.json({ status: 'error', message: 'Marking failed' })
  }
}

