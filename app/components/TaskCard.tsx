'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { Task } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TaskCardProps {
  task: Task
  onMarkDone: (id: string) => void
  onEdit: (id: string) => void
  onSendWhatsApp: (task: Task) => void
  onGenerateInvoice?: (id: string) => void
  isEditing?: boolean
  editFields?: Partial<Task>
  onEditChange?: (field: keyof Task, value: string) => void
  onSaveEdit?: (id: string) => void
}

export default function TaskCard({
  task,
  onMarkDone,
  onEdit,
  onSendWhatsApp,
  onGenerateInvoice,
  isEditing = false,
  editFields = {},
  onEditChange,
  onSaveEdit,
}: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md bg-white space-y-4"
    >
      {isEditing ? (
        <div className="space-y-3">
          <Input
            value={editFields.description || task.description}
            onChange={(e) => onEditChange?.('description', e.target.value)}
            placeholder="Task description"
          />
          <Input
            value={editFields.client || task.client}
            onChange={(e) => onEditChange?.('client', e.target.value)}
            placeholder="Client name"
          />
          <Input
            type="date"
            value={editFields.dueDate || task.dueDate || ''}
            onChange={(e) => onEditChange?.('dueDate', e.target.value)}
          />
          <Button onClick={() => onSaveEdit?.(task.id)}>Save</Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {task.description}
              </h2>
              <p className="text-sm text-gray-500">ï¿½"ï¿½ {task.client}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
            <p>
              ï¿½"ï¿½ <strong>Logged:</strong> {task.date}
            </p>
            <p>
              â° <strong>Due:</strong> {task.dueDate || 'N/A'}
            </p>
            <p>
              ï¿½'ï¿½ <strong>Amount:</strong> ${task.amount?.toFixed(2) || '0.00'}
            </p>
            <p>
              âœ… <strong>Billable:</strong> {task.billable ? 'Yes' : 'No'}
            </p>
          </div>

          {task.attachment && (
            <p className="text-sm text-blue-600 underline">
              ï¿½"ï¿½{' '}
              <a href={task.attachment} target="_blank" rel="noreferrer">
                Attachment
              </a>
            </p>
          )}

          {task.voiceNote && (
            <audio controls className="w-full">
              <source src={task.voiceNote} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}

          <div className="flex flex-wrap gap-3 pt-4">
            <Button variant="secondary" onClick={() => onEdit(task.id)}>
              Edit
            </Button>
            <Button variant="default" onClick={() => onMarkDone(task.id)}>
              Mark Done
            </Button>
            <Button
              variant="outline"
              onClick={() => onSendWhatsApp(task)}
              className="text-green-600"
            >
              <FaWhatsapp className="inline mr-2" /> WhatsApp
            </Button>
            {onGenerateInvoice && (
              <Button
                variant="outline"
                onClick={() => onGenerateInvoice(task.id)}
              >
                Generate Invoice
              </Button>
            )}
          </div>
        </>
      )}
    </motion.div>
  )
}

