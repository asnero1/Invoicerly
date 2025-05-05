// File: app/components/FeedbackButton.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function FeedbackButton() {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async () => {
    const feedback = {
      rating,
      comment,
      email: email.trim() !== '' ? email : undefined,
      date: new Date().toISOString(),
    }

    await fetch('/api/save-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    })

    toast.success('Thank you for your feedback!')
    setOpen(false)
    setRating(null)
    setComment('')
    setEmail('')
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {open ? (
        <div className="bg-white p-4 rounded shadow-lg w-[90vw] max-w-sm space-y-3">
          <h3 className="text-sm font-semibold">🌟 Rate your experience</h3>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setRating(num)}
                className={`text-xl ${rating && rating >= num ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="Optional comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2 text-sm"
            rows={2}
          />

          <input
            type="email"
            placeholder="Leave email if you'd like us to reply (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 text-sm"
          />

          <div className="flex justify-between">
            <Button onClick={handleSubmit} className="text-sm px-3 py-1">
              Submit
            </Button>
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              className="text-sm px-3 py-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => setOpen(true)} className="text-xs px-3 py-1">
          💬 Feedback
        </Button>
      )}
    </div>
  )
}
