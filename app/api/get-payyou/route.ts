// ✅ API ROUTE: Get PayYou Info
// File: app/api/get-payyou/route.ts

import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

const PAYYOU_PATH = path.join(process.cwd(), 'data', 'payyou.json')

export async function GET() {
  try {
    const raw = await readFile(PAYYOU_PATH, 'utf-8')
    const json = JSON.parse(raw)
    return NextResponse.json(json)
  } catch (err) {
    return NextResponse.json({}, { status: 200 })
  }
}

