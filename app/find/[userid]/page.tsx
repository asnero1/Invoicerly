// FILE: app/find/[userid]/page.tsx
'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import TaskList from '@/components/TaskList'
import { Task } from '@/types'

import { mockTasks } from '@/data/mockTasks'

export default function UserProfilePage() {
  const params = useParams()
  const userId = params?.userid

  const handleUpdate = (
    taskId: string,
    field: keyof Task,
    value: string | number | boolean
  ) => {
    console.log(`Updated ${taskId}: ${field} => ${value}`)
  }

  const handleGenerateInvoice = (taskId: string) => {
    console.log(`Generate invoice for task: ${taskId}`)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Client Tasks</h1>
      <TaskList
        tasks={mockTasks}
        onUpdate={handleUpdate}
        onGenerateInvoice={handleGenerateInvoice}
      />
    </div>
  )
}
