'use client'

import React, { useState } from 'react'
import { Task } from '@/types'
import { Button } from '@/components/ui/button'
import TaskCard from './TaskCard'

interface Props {
  tasks: Task[]
  onUpdate: (
    taskId: string,
    field: keyof Task,
    value: string | number | boolean
  ) => void
  onGenerateInvoice?: (taskId: string) => void
}

export default function TaskList({
  tasks,
  onUpdate,
  onGenerateInvoice,
}: Props) {
  const [editing, setEditing] = useState<string | null>(null)

  const handleSendWhatsApp = (task: Task) => {
    if (!task.clientPhone) {
      alert('No client phone number provided.')
      return
    }

    const message = `🧾 *Task*: ${task.description}\n\n*Client*: ${task.client}\n*Amount*: $${task.amount?.toFixed(2) || '0.00'}\n*Due*: ${task.dueDate || 'N/A'}`
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(task.clientPhone)}&text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onMarkDone={(id) => onUpdate(id, 'billable', false)} // ✅ Use a valid field here
          onEdit={(id) => setEditing(id)}
          onSendWhatsApp={handleSendWhatsApp}
        />
      ))}
    </div>
  )
}
