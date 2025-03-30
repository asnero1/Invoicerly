export type Task = {
  id: string
  description: string
  client: string
  date: string
  billable: boolean
  isInvoiced?: boolean
  dueDate?: string
  voiceNote?: string
  attachmentName?: string
}
