'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function GenerateInvoicePage() {
  const [sending, setSending] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const task = {
    id: 'test-001',
    client: 'Harry at EH Motors',
    description: 'Wrap-up video editing & upload',
    date: '2025-04-21',
    amount: 250,
    phoneNumber: '+61488040450', // ✅ Assumes client has valid WhatsApp number
  }

  const handleGenerate = async () => {
    try {
      setSending(true)

      const res = await fetch('/api/generate-invoice', {
        method: 'POST',
        body: JSON.stringify({ task }),
      })

      if (!res.ok) throw new Error('Failed to generate invoice')

      const data = await res.json()

      // ✅ Force Preview URL manually
      const previewUrl = `/invoices/invoice-${task.id}.pdf`
      setPreviewUrl(previewUrl)

      toast.success('Invoice PDF generated!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to generate invoice.')
    } finally {
      setSending(false)
    }
  }

  const handleSendWhatsApp = () => {
    if (!previewUrl) {
      toast.error('Invoice not ready yet!')
      return
    }
    const message = `🧾 *Your Invoice is Ready!*\n\nPlease view your invoice here:\n${window.location.origin}${previewUrl}`
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(task.phoneNumber)}&text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Generate Invoice</h1>

      <div className="flex gap-4">
        <Button onClick={handleGenerate} disabled={sending}>
          {sending ? 'Generating...' : 'Generate Invoice'}
        </Button>

        {previewUrl && (
          <>
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Invoice PDF ↗
            </a>
            <Button
              variant="outline"
              onClick={handleSendWhatsApp}
              className="text-green-600"
            >
              WhatsApp Invoice Link
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

