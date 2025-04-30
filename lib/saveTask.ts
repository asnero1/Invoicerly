// File: app/lib/saveTask.ts
import { Task } from '@/types';
import fs from 'fs/promises';
import path from 'path';

export async function saveTask(task: Task) {
  try {
    const filePath = path.resolve('public/data/tasks.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const tasks: Task[] = JSON.parse(data);
    tasks.push(task);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
    console.log('✅ Task saved to tasks.json');
  } catch (err) {
    console.error('❌ Failed to save task:', err);
  }
}
