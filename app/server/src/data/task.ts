// app/server/src/data/task.ts

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Example Task',
    completed: false,
    createdAt: new Date(),
  },
]

// Replace this with your actual DB call logic if needed
export function getTasks(): Task[] {
  return sampleTasks
}

