import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const body = await req.json();
  const { to, filename, message } = body;

  try {
    const filePath = path.join(process.cwd(), 'public/invoices', filename);
    const fileBuffer = fs.readFileSync(filePath);

    // TODO: Replace with real WhatsApp/Twilio logic here
    console.log(`Sending ${filename} to ${to}: ${message}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('WhatsApp Send Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
