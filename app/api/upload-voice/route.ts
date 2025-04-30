// ✅ FILE: app/api/upload-voice/route.ts
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${uuidv4()}.webm`;
    const filePath = path.join(process.cwd(), 'public', 'voice', fileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/voice/${fileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error('❌ Upload error:', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
