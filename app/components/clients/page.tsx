'use client'

import React, { useState, useEffect } from 'react'
import TaskList from '@/components/TaskList'
import { Task } from '@/types'
import { getLocalTasks, saveLocalTasks } from '@/utils/helpers'

export default function ClientPage() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const stored = getLocalTasks()
    setTasks(stored)
  }, [])

  const handleUpdateTask = (
    taskId: string,
    field: keyof Task,
    value: string | number | boolean
  ) => {
    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, [field]: value } : task
    )
    setTasks(updated)
    saveLocalTasks(updated)
  }

  const handleGenerateInvoice = (taskId: string) => {
    console.log(`Generate invoice for task ${taskId}`)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">📋 Client Task Log</h1>
      <TaskList
        tasks={tasks}
        onUpdate={handleUpdateTask}
        onGenerateInvoice={handleGenerateInvoice}
      />
    </div>
  )
}
