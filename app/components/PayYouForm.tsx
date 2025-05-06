'use client'

import { useState } from 'react'

export default function PayYouForm({ onSubmit }: { onSubmit: () => void }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [description, setDescription] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await fetch('/api/payyou', {
      method: 'POST',
      body: JSON.stringify({
        userId: 'demo-user-id', // replace with real auth later
        title,
        amount: parseFloat(amount),
        dueDate,
        description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setTitle('')
    setAmount('')
    setDueDate('')
    setDescription('')
    onSubmit() // refresh list
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 border p-4 rounded-md shadow-md bg-white"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  )
}

