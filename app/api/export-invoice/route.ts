import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Parser } from 'json2csv'
import PDFDocument from 'pdfkit'

const filePath = path.join(process.cwd(), 'data', 'invoices.json')
const fontPath = path.join(
  process.cwd(),
  'public',
  'fonts',
  'Roboto-Regular.ttf'
)

export async function POST(req: NextRequest) {
  try {
    const { id, type } = await req.json()

    if (!id || !type) {
      return NextResponse.json(
        { error: 'Missing invoice ID or export type' },
        { status: 400 }
      )
    }

    const fileData = fs.readFileSync(filePath, 'utf-8')
    const invoices = JSON.parse(fileData)
    const invoice = invoices.find((inv: any) => inv.id === id)

    // âœ… Mark all tasks in this invoice as invoiced
    invoice.tasks = invoice.tasks.map((task: any) => ({
      ...task,
      isInvoiced: true,
    }))

    // âœ… Save updated invoices back to file
    fs.writeFileSync(filePath, JSON.stringify(invoices, null, 2), 'utf-8')

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    if (type === 'csv') {
      const parser = new Parser()
      const csv = parser.parse(invoice.tasks)

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename=invoice-${id}.csv`,
        },
      })
    }

    if (type === 'pdf') {
      if (!fs.existsSync(fontPath)) {
        console.error('âŒ Font file missing at:', fontPath)
        return NextResponse.json(
          { error: 'Font file missing' },
          { status: 500 }
        )
      }

      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        font: fontPath, // ï¿½'ï¿½ Use custom font from the very start
      })

      const chunks: Uint8Array[] = []

      doc.on('data', (chunk: Uint8Array) => chunks.push(chunk))
      doc.on('end', () => {
        console.log('âœ… PDF stream complete')
      })

      doc.fontSize(20).text(`Invoice`, { align: 'center' }).moveDown()
      doc.fontSize(12).text(`Client: ${invoice.client}`)
      doc.text(`Date: ${invoice.date || 'N/A'}`)
      doc.text(`Total Amount: $${invoice.totalAmount}`)
      doc.moveDown().text(`Tasks:`)

      invoice.tasks.forEach((task: any, index: number) => {
        doc.text(`${index + 1}. ${task.description} (${task.date})`)
      })

      doc.end()

      const buffer = await new Promise<Buffer>((resolve) => {
        doc.on('end', () => resolve(Buffer.concat(chunks)))
      })

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename=invoice-${id}.pdf`,
        },
      })
    }

    return NextResponse.json(
      { error: 'Unsupported export type' },
      { status: 400 }
    )
  } catch (err: any) {
    console.error('âŒ Export failed:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

