'use client'

import { useEffect, useState } from 'react'

export default function PayMeSetupPage() {
  const [payId, setPayId] = useState('')
  const [bankDetails, setBankDetails] = useState('')
  const [stripeLink, setStripeLink] = useState('')

  useEffect(() => {
    const storedPayId = localStorage.getItem('payId') || ''
    const storedBank = localStorage.getItem('bankDetails') || ''
    const storedStripe = localStorage.getItem('stripeLink') || ''
    setPayId(storedPayId)
    setBankDetails(storedBank)
    setStripeLink(storedStripe)
  }, [])

  const handleSave = () => {
    localStorage.setItem('payId', payId)
    localStorage.setItem('bankDetails', bankDetails)
    localStorage.setItem('stripeLink', stripeLink)
    alert('âœ… Payment preferences saved!')
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ðŸ› ï¸ PayMe Setup</h1>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">PayID / Email</label>
          <input
            type="text"
            value={payId}
            onChange={(e) => setPayId(e.target.value)}
            placeholder="you@domain.com"
            className="w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Bank Account Details
          </label>
          <textarea
            value={bankDetails}
            onChange={(e) => setBankDetails(e.target.value)}
            placeholder="BSB: 123-456\nACC: 12345678\nBank of Oz"
            rows={3}
            className="w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Stripe Payment Link (optional)
          </label>
          <input
            type="url"
            value={stripeLink}
            onChange={(e) => setStripeLink(e.target.value)}
            placeholder="https://buy.stripe.com/..."
            className="w-full px-4 py-2 border rounded shadow-sm"
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded mt-4 hover:bg-blue-700 transition"
        >
          Save Payment Settings
        </button>
      </div>
    </div>
  )
}

