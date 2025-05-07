// app/types.ts

export type Spruke = {
  fileName: string
  caption: string
  timestamp: string
  likes: number
  userName: string // links to User.name
  userId?: string | null // optional direct userId if available
  avatar?: string // optional override
  type?: 'video' | 'audio' // optional type
}

export type User = {
  id: string // âœ… Required for routing (e.g. 'antonio')
  name: string // Display name (e.g. 'Antonio')
  avatar: string // Path to avatar
  role: string // e.g. 'Designer'
  bio?: string // Optional bio line
  defaultEmail?: string // âœ… Optional default sender email
  otherEmails?: string[] // âœ… Optional secondary emails
  phone?: string // âœ… âœ… NEW: For WhatsApp & messaging
}

export type Task = {
  id: string
  title?: string
  description: string
  client: string
  payer?: string
  amount?: number
  paid?: boolean
  date: string
  dueDate?: string
  billable: boolean
  attachment?: string
  voiceNote?: string
  clientPhone?: string
  done?: boolean // âœ… <-- Add this new optional field
}

export type Reply = {
  text?: string
  fileUrl?: string
}

export type Message = {
  id: string
  from: string
  fromUserId: string
  fromAvatar: string
  fromEmail?: string
  to: string
  toUserId?: string
  toEmail?: string
  toAvatar?: string
  subject: string
  body: string
  date: string
  read: boolean
  replies?: Reply[]
}

export interface Invoice {
  id: string
  clientId: string
  description: string
  amount: number
}

