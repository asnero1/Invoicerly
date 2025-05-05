// File: app/components/ClientProfileModal.tsx
'use client'

import React from 'react'
import { Task } from '@/types' // ✅ Correct source of the Task type
import { Button } from '@/components/ui/button' // ✅ Assuming you have a standard Button

type Props = {
  task: Task
  onClose: () => void
}

const ClientProfileModal: React.FC<Props> = ({ task, onClose }) => {
  if (!task) return null

  const handleSendWhatsApp = () => {
    if (!task.clientPhone) {
      alert('No client phone number provided.')
      return
    }

    const message = `🧾 *Invoice Details*\n\n*Client:* ${task.client}\n*Task:* ${task.description}\n*Amount:* $${task.amount?.toFixed(2) || '0.00'}\n*Due:* ${task.dueDate || 'N/A'}`
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(task.clientPhone)}&text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Task Details */}
        <h2 className="text-xl font-bold mb-4">{task.description}</h2>
        <p className="text-sm text-gray-600 mb-2">Client: {task.client}</p>
        <p className="text-sm text-gray-600 mb-2">Date: {task.date}</p>
        <p className="text-sm text-gray-600 mb-2">
          Amount: ${task.amount?.toFixed(2) || '0.00'}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Billable: {task.billable ? 'Yes' : 'No'}
        </p>

        {/* WhatsApp Button */}
        <Button
          variant="outline"
          onClick={handleSendWhatsApp}
          className="text-green-600 w-full"
        >
          Send Invoice via WhatsApp
        </Button>
      </div>
    </div>
  )
}

export default ClientProfileModal
