import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// âœ… Ensure invoices.json path is correct
const invoiceFilePath = path.join(process.cwd(), 'data', 'invoices.json')

// âœ… Ensure invoice.json file exists
if (!fs.existsSync(invoiceFilePath)) {
  fs.writeFileSync(invoiceFilePath, JSON.stringify([]))
}

export async function POST(req: NextRequest) {
  try {
    const newInvoice = await req.json()
    const existing = fs.readFileSync(invoiceFilePath, 'utf-8')
    const invoices = JSON.parse(existing)

    invoices.push(newInvoice)

    fs.writeFileSync(invoiceFilePath, JSON.stringify(invoices, null, 2))
    console.log('âœ… Invoice saved successfully')

    return NextResponse.json(
      { success: true, message: 'Invoice saved!' },
      { status: 200 }
    )
  } catch (err) {
    console.error('âŒ Error saving invoice:', err)
    return NextResponse.json(
      { error: 'Failed to save invoice' },
      { status: 500 }
    )
  }
}

