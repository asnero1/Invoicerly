import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'invoices.json')

export async function POST(req: NextRequest) {
  try {
    const newInvoice = await req.json()

    const existing = fs.readFileSync(filePath, 'utf-8')
    const invoices = JSON.parse(existing)

    invoices.push(newInvoice)

    fs.writeFileSync(filePath, JSON.stringify(invoices, null, 2))
    console.log('✅ Invoice saved:', newInvoice)

    return NextResponse.json({ message: 'Invoice saved!' }, { status: 200 })
  } catch (err) {
    console.error('❌ Error saving invoice:', err)
    return NextResponse.json({ error: 'Failed to save invoice' }, { status: 500 })
  }
}
