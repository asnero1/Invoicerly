'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TestSendPage() {
  const [status, setStatus] = useState('')

  const handleSend = async () => {
    setStatus('Sending...')
    const res = await fetch('/api/send-whatsapp-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber: '+61412345678', // ðŸ" Replace with your test number
        fileName: 'invoice-test-001.pdf',
        message: 'Here is your invoice via WhatsApp ðŸ"©',
      }),
    })

    if (res.ok) {
      setStatus('âœ… Invoice sent via WhatsApp!')
    } else {
      setStatus('âŒ Failed to send invoice')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Send WhatsApp Invoice</h1>
      <Button onClick={handleSend}>Send Test Invoice</Button>
      <p className="mt-4 text-sm">{status}</p>
    </div>
  )
}

