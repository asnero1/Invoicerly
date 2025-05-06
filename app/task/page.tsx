'use client'

import React, { useState } from 'react'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'
import SmartSuggestionBox from '@/components/SmartSuggestionBox'
import { Task } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export default function TaskPage() {
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
                    : value,
            }
          : task
      )
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold">�"� Tasks</h1>
        <p className="text-gray-500 mt-2">Log and manage your tasks here.</p>
      </header>

      {/* ✅ Task Input Form */}
      <section>
        <TaskForm onSubmit={addTask} />
      </section>

      {/* ✅ Task List Display */}
      <section>
        <TaskList tasks={tasks} onUpdate={updateTask} />
      </section>

      {/* ✅ Floating Smart Suggestions */}
      <SmartSuggestionBox
  suggestions={[
    { message: '🧠 Group tasks by client for cleaner exports.' },
    { message: '📅 Add due dates to keep work on track.' },
    { message: '🎤 Attach voice notes when on the go.' },
    { message: '💼 Mark billable tasks for invoice generation.' }
  ]}
  onApply={() => {
    console.log('Applied suggestion');
  }}
/>

    </div>
  )
}

