import autoTable from 'jspdf-autotable'
import path from 'path'
import fs from 'fs'
import { jsPDF } from 'jspdf'

export async function generateInvoicePDF(task: {
  id: string
  client: string
  description: string
  date: string
  amount: number
}) {
  const doc = new jsPDF()

  doc.setFontSize(12)
  doc.text(`Invoice #: ${task.id}`, 14, 32)
  doc.text(`Date: ${task.date}`, 14, 38)
  doc.text(`Client: ${task.client}`, 14, 44)

  autoTable(doc, {
    startY: 55,
    head: [['Description', 'Amount']],
    body: [[task.description, `$${task.amount.toFixed(2)}`]],
  })

  doc.text(
    'Thank you for your business!',
    14,
    (doc as any).lastAutoTable.finalY + 20
  )

  // âœ… Ensure directory exists
  const invoiceDir = path.join(process.cwd(), 'public', 'invoices')
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir, { recursive: true })
  }

  const fileName = `invoice-${task.id}.pdf`
  const filePath = path.join(invoiceDir, fileName)
  const pdfBuffer = doc.output('arraybuffer')
  fs.writeFileSync(filePath, Buffer.from(pdfBuffer))

  return {
    fileName,
    filePath,
    publicUrl: `/invoices/${fileName}`,
  }
}

