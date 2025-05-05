import { writeFile, readFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  const body = await req.json()

  const invoice = {
    ...body,
    timestamp: new Date().toISOString(),
  }

  const dir = path.join(process.cwd(), 'data')
  const filePath = path.join(dir, 'invoices.json')

  try {
    await mkdir(dir, { recursive: true })

    let existing = []
    try {
      const file = await readFile(filePath, 'utf-8')
      existing = JSON.parse(file)
    } catch {
      existing = []
    }

    existing.push(invoice)
    await writeFile(filePath, JSON.stringify(existing, null, 2), 'utf-8')

    return Response.json({ success: true })
  } catch (err) {
    console.error('Error saving invoice:', err)
    return Response.json({ success: false }, { status: 500 })
  }
}
