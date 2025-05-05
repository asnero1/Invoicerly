// app/api/send-whatsapp/route.ts
import { NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const body = await req.json();

  // Example: you might pass messageText and filename
  const { messageText, filename } = body;

  const outputPath = path.join(process.cwd(), 'public', 'outgoing.txt');

  writeFileSync(outputPath, `Message: ${messageText}\nFilename: ${filename}`);

  return NextResponse.json({ success: true, saved: outputPath });
}
