export type Task = {
  id: string
  description: string
  client: string
  date: string
  billable: boolean
  dueDate?: string
  priority?: string
  voiceNote?: string
  attachment?: string
  status?: 'pending' | 'done' | 'invoiced' // âœ… explicitly typed (string is fine too)
  clientPhone?: string
  amount?: number
  done?: boolean // âœ… required for onMarkDone
}

