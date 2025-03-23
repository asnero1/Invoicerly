import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import TaskModel from '@/server/src/data/taskModel'; // Ensure correct path

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  try {
    const newTask = await TaskModel.create({
      description: body.description,
      voiceLogUrl: body.voiceLogUrl || null,
      attachments: body.attachments || [],
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      reminder: body.reminder ? new Date(body.reminder) : null,
    });

    return NextResponse.json({ success: true, task: newTask }, { status: 201 });
  } catch (error) {
    console.error('Error logging task:', error);
    return NextResponse.json({ success: false, message: 'Failed to log task.' }, { status: 500 });
  }
}
