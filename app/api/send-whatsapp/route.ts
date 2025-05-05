import { NextResponse } from 'next/server';
import path from 'path';
import sendWhatsAppInvoice from '@/lib/sendWhatsAppInvoice'; // ✅ FIXED THIS LINE

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phoneNumber, fileName, message } = body;

    await sendWhatsAppInvoice({ phoneNumber, fileName, message });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('WhatsApp Send Invoice Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
