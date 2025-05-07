// File: app/components/InvoicePreviewModal.tsx
'use client'

import React from 'react'
import { Task } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface Props {
  task: Task | null
  onClose: () => void
}

export default function InvoicePreviewModal({ task, onClose }: Props) {
  if (!task) return null

  const handleSendWhatsApp = () => {
    if (!task.clientPhone) {
      alert('No client phone number provided for WhatsApp.')
      return
    }

    const message = `ðŸ§¾ *Invoice Preview*\n\n*Client:* ${task.client}\n*Description:* ${task.description}\n*Amount:* $${task.amount?.toFixed(2) || '0.00'}\n*Due:* ${task.dueDate || 'N/A'}`
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(task.clientPhone)}&text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent className="space-y-4 max-w-lg">
        <DialogTitle>Invoice Preview</DialogTitle>
        <DialogDescription>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Client:</strong> {task.client}
            </p>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Amount:</strong> ${task.amount?.toFixed(2) || '0.00'}
            </p>
            <p>
              <strong>Due Date:</strong> {task.dueDate || 'N/A'}
            </p>
          </div>
        </DialogDescription>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="outline"
            onClick={handleSendWhatsApp}
            className="text-green-600"
          >
            Send via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

