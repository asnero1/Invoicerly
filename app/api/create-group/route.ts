// ✅ FILE: /app/api/create-group/route.ts

import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { NextResponse } from 'next/server'

const GROUPS_PATH = path.join(process.cwd(), 'public/data/groups.json')

export async function POST(req: Request) {
  try {
    const { name, members } = await req.json()

    if (!name || !Array.isArray(members) || members.length < 2) {
      return NextResponse.json({
        status: 'error',
        message: 'Invalid group data',
      })
    }

    const fileData = await fs.readFile(GROUPS_PATH, 'utf-8')
    const groups = JSON.parse(fileData)

    const newGroup = {
      id: uuid(),
      name,
      members,
      createdAt: new Date().toISOString(),
    }

    groups.push(newGroup)

    await fs.writeFile(GROUPS_PATH, JSON.stringify(groups, null, 2))

    return NextResponse.json({ status: 'ok', group: newGroup })
  } catch (e) {
    console.error('❌ Failed to create group:', e)
    return NextResponse.json({
      status: 'error',
      message: 'Create group failed',
    })
  }
}
