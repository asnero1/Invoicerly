// âœ… File: app/api/save-payyou/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const FILE_PATH = path.join(process.cwd(), 'app', 'data', 'payyou.json')

// âœ… Utility: Read JSON file
async function readPayyouFile() {
  try {
    const data = await readFile(FILE_PATH, 'utf-8')
    return JSON.parse(data || '{}')
  } catch {
    return {}
  }
}

// âœ… Utility: Write to JSON file
async function writePayyouFile(data: any) {
  await writeFile(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

// âœ… GET: Fetch all payees
export async function GET() {
  const data = await readPayyouFile()
  return NextResponse.json(data)
}

// âœ… POST: Add or update a payee
export async function POST(req: NextRequest) {
  try {
    const newData = await req.json()
    const data = await readPayyouFile()
    data[newData.contact] = newData
    await writePayyouFile(data)
    return NextResponse.json({ status: 'success' })
  } catch (err) {
    return NextResponse.json({ status: 'error', error: err }, { status: 500 })
  }
}

// âœ… DELETE: Remove a payee by contact
export async function DELETE(req: NextRequest) {
  try {
    const { contact } = await req.json()
    const data = await readPayyouFile()
    if (contact in data) {
      delete data[contact]
      await writePayyouFile(data)
      return NextResponse.json({ status: 'deleted' })
    }
    return NextResponse.json({ status: 'not_found' }, { status: 404 })
  } catch (err) {
    return NextResponse.json({ status: 'error', error: err }, { status: 500 })
  }
}

// âœ… PUT: Update specific payee details
export async function PUT(req: NextRequest) {
  try {
    const { contact, updates } = await req.json()
    const data = await readPayyouFile()
    if (contact in data) {
      data[contact] = { ...data[contact], ...updates }
      await writePayyouFile(data)
      return NextResponse.json({ status: 'updated' })
    }
    return NextResponse.json({ status: 'not_found' }, { status: 404 })
  } catch (err) {
    return NextResponse.json({ status: 'error', error: err }, { status: 500 })
  }
}

