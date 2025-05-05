import { Task } from '@/types'

export const mockTasks: Task[] = [
  {
    id: '1',
    description: 'Initial client task',
    client: 'Sample Client',
    date: new Date().toISOString(),
    billable: true,
    status: 'pending',
    done: false,
  },
]
