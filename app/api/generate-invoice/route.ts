import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { generateInvoicePDF } from '@/lib/generateInvoicePDF'

export async function POST(req: Request) {
  try {
    const { task } = await req.json()

    if (!task || !task.id) {
      return NextResponse.json(
        { success: false, error: 'Invalid task data' },
        { status: 400 }
      )
    }

    const { fileName, publicUrl } = await generateInvoicePDF(task)

    return NextResponse.json({ success: true, fileName, publicUrl })
  } catch (error) {
    console.error('Error generating invoice:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

