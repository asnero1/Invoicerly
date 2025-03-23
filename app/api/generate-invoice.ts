import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const tasksFile = path.join(process.cwd(), 'data', 'tasks.ts');

export async function POST(req: Request) {
  try {
    const { client } = await req.json();
    if (!client) {
      return NextResponse.json({ error: 'Client is required' }, { status: 400 });
    }

    // Read tasks
    let tasks = [];
    if (fs.existsSync(tasksFile)) {
      tasks = JSON.parse(fs.readFileSync(tasksFile, 'utf8'));
    }

    // Filter billable tasks for this client
    const billableTasks = tasks.filter((task) => task.client === client && task.billable);

    if (billableTasks.length === 0) {
      return NextResponse.json({ error: 'No billable tasks found for client' }, { status: 404 });
    }

    // Generate invoice data (can be stored or sent)
    const invoice = {
      client,
      tasks: billableTasks,
      totalAmount: billableTasks.length * 50, // Example: $50 per task
    };

    return NextResponse.json({ message: 'Invoice generated', invoice });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
