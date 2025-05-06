// File: app/page.tsx
'use client'

import React, { useState } from 'react'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'
import AIAssistant from '@/components/AIAssistant'
import FeedbackButton from '@/components/FeedbackButton'
import SmartSuggestions from '@/components/SmartSuggestions'
import VTOLogger from '@/components/VTOLogger'
import { Task } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      description: 'Finish frontend polish',
      client: 'DesignCo',
      date: '2025-04-19',
      amount: 300,
      billable: true,
    },
    {
      id: '2',
      description: 'Fix backend bug in invoice export',
      client: 'DevSquad',
      date: '2025-04-18',
      amount: 500,
      billable: true,
    },
  ])

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const fullTask: Task = { id: uuidv4(), ...newTask }
    setTasks((prev) => [...prev, fullTask])
  }

  const updateTask = (
    taskId: string,
    field: keyof Task,
    value: string | number | boolean
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              [field]:
                field === 'amount'
                  ? parseFloat(value as string) || 0
                  : field === 'billable'
                    ? Boolean(value)
                    : (value as string | number | boolean), // ✅ ensure compatibility
            }
          : task
      )
    )
  }

  return (
    <main className="p-4 space-y-10 max-w-xl mx-auto">
      <VTOLogger />
      <TaskForm onSubmit={addTask} />
      <TaskList tasks={tasks} onUpdate={updateTask} />
      <SmartSuggestions />
      <FeedbackButton />
      <AIAssistant />
    </main>
  )
}

