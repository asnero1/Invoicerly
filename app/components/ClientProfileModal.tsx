'use client'

import React from 'react'
import { Task } from './TaskList'

type Props = {
  client: string
  tasks: Task[]
  onClose: () => void
}

const ClientProfileModal: React.FC<Props> = ({ client, tasks, onClose }) => {
  const clientTasks = tasks.filter((t) => t.client === client)
  const billable = clientTasks.filter((t) => t.billable).length
  const nonBillable = clientTasks.length - billable
  const overdue = clientTasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date()).length

  return (
    <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg border-l z-50 overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-bold">Client: {client}</h3>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>
      <div className="p-4 space-y-2 text-sm">
        <p>
          <strong>Total Tasks:</strong> {clientTasks.length}
        </p>
        <p>
          <strong>Billable:</strong> {billable} | <strong>Non-Billable:</strong> {nonBillable}
        </p>
        <p>
          <strong>Overdue Tasks:</strong> {overdue}
        </p>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Tasks:</h4>
          <ul className="space-y-2">
            {clientTasks.map((task) => (
              <li key={task.id} className="border p-2 rounded bg-gray-50">
                <p>
                  <strong>{task.description}</strong>
                </p>
                <p className="text-xs text-gray-600">
                  {task.date} → {task.dueDate || '-'}
                </p>
                {task.attachmentName && (
                  <p className="text-blue-600 text-xs">📎 {task.attachmentName}</p>
                )}
                {task.voiceNote && <p className="text-purple-600 text-xs">🎧 {task.voiceNote}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ClientProfileModal
