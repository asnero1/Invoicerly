// âœ… FILE: app/utils/generateInvoiceFromTasks.ts

import fs from 'fs'
import path from 'path'

export function generateInvoicesFromTasks(): Record<string, any[]> {
  const taskPath = path.join(process.cwd(), 'app', 'data', 'tasks.json')
  if (!fs.existsSync(taskPath)) return {}

  const tasks = JSON.parse(fs.readFileSync(taskPath, 'utf-8'))

  // Group billable + unpaid tasks by client
  const grouped: Record<string, any[]> = {}
  for (const task of tasks) {
    if (task.billable && !task.paid) {
      const client = task.client || 'General'
      if (!grouped[client]) grouped[client] = []
      grouped[client].push(task)
    }
  }

  return grouped
}

