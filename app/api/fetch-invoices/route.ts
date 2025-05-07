import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'invoices.json')

export async function GET() {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const invoices = JSON.parse(raw)

    return NextResponse.json({ invoices }, { status: 200 })
  } catch (err) {
    console.error('âŒ Failed to fetch invoices:', err)
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}

