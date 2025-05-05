import { NextResponse } from 'next/server'
import sendWhatsAppInvoice from '@/lib/sendWhatsAppInvoice'

export async function POST(req: Request) {
  try {
    const { phoneNumber, fileName, message } = await req.json()

    if (!phoneNumber || !fileName) {
      return NextResponse.json(
        { success: false, error: 'Missing fields' },
        { status: 400 }
      )
    }

    await sendWhatsAppInvoice({ phoneNumber, fileName, message })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending WhatsApp invoice:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
