import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'likes.json');

export async function POST(req: NextRequest) {
  try {
    const { toUserId } = await req.json();
    if (!toUserId) {
      return NextResponse.json({ error: 'Missing toUserId' }, { status: 400 });
    }

    const existing = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      : [];

    existing.push({
      toUserId,
      timestamp: new Date().toISOString(),
    });

    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    return NextResponse.json({ message: '✅ Like recorded' });
  } catch (err) {
    console.error('❌ Failed to like user:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
