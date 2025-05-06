'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ContactPage() {
  const searchParams = useSearchParams()
  const to = searchParams.get('to') || 'Unknown'
  const spruke = searchParams.get('spruke') || 'None'

  const [recipientName, setRecipientName] = useState(to)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  )

  useEffect(() => {
    // Try to resolve full name from /data/users.json
    async function fetchRecipientName() {
      try {
        const res = await fetch('/data/users.json')
        const users = await res.json()
        const match = users.find(
          (u: any) =>
            u.id?.toLowerCase() === to.toLowerCase() ||
            u.name?.toLowerCase() === to.toLowerCase()
        )
        if (match?.name) {
          setRecipientName(match.name)
          setMessage(
            `Hey ${match.name}, I saw your spruke and wanted to connect!`
          )
        } else {
          setMessage(`Hey ${to}, I saw your spruke and wanted to connect!`)
        }
      } catch {
        setMessage(`Hey ${to}, I saw your spruke and wanted to connect!`)
      }
    }

    fetchRecipientName()
  }, [to])

  const handleSend = async () => {
    if (!message.trim()) return

    setStatus('sending')

    try {
      const res = await fetch('/api/contact-pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: name || 'Anonymous',
          contact,
          recipient: to,
          message,
          sprukeId: spruke,
        }),
      })

      const result = await res.json()
      if (result.success) {
        setStatus('sent')
        setMessage('')
        setName('')
        setContact('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">ü"ß Contact {recipientName}</h1>
      <p className="text-sm text-gray-500 mb-3">Re: {spruke}</p>

      <textarea
        rows={4}
        className="w-full border p-2 rounded mb-3"
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <input
        type="text"
        className="w-full border p-2 rounded mb-3"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        className="w-full border p-2 rounded mb-3"
        placeholder="Your contact (email or phone)"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'sent' && (
        <p className="text-green-600 text-sm mt-3">‚úÖ Message sent!</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm mt-3">‚ùå Error sending message.</p>
      )}
    </div>
  )
}

