import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const feedbackPath = path.join(process.cwd(), 'data', 'feedback.json');

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const { message, email } = JSON.parse(body);

    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Feedback is required' }, { status: 400 });
    }

    const feedbackEntry = {
      timestamp: new Date().toISOString(),
      message: message.trim(),
      email: email?.trim() || '',
    };

    const existing = fs.existsSync(feedbackPath)
      ? JSON.parse(fs.readFileSync(feedbackPath, 'utf-8'))
      : [];

    existing.push(feedbackEntry);
    fs.writeFileSync(feedbackPath, JSON.stringify(existing, null, 2));

    return NextResponse.json({ message: 'Feedback saved ✅' });
  } catch (err) {
    console.error('❌ Error saving feedback:', err);
    return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 });
  }
}
