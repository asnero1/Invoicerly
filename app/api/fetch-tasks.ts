import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const tasksFile = path.join(process.cwd(), 'data', 'tasks.json');

export async function GET() {
  try {
    let tasks = [];
    if (fs.existsSync(tasksFile)) {
      tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    }
    return NextResponse.json({ tasks });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
