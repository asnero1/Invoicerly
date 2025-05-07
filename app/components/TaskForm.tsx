'use client'

import React, { useState } from 'react'
import { Task } from '@/types'

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('')
  const [client, setClient] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [billable, setBillable] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!description || !client || !date || !amount) return

    onSubmit({
      description,
      client,
      clientPhone, // ✅ Now included!
      date,
      amount: parseFloat(amount),
      billable,
    })

    // Clear form after submit
    setDescription('')
    setClient('')
    setClientPhone('')
    setDate('')
    setAmount('')
    setBillable(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-6 space-y-4 max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-bold">�"� Log a New Task</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Client
          </label>
          <input
            type="text"
            placeholder="Client name"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Client Phone (WhatsApp)
          </label>
          <input
            type="tel"
            placeholder="Client phone number"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Amount
          </label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={billable}
            onChange={(e) => setBillable(e.target.checked)}
          />
          <label className="text-sm">Billable</label>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          ➕ Add Task
        </button>
      </div>
    </form>
  )
}

export default TaskForm

