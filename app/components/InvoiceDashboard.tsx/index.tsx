'use client'

import React, { useEffect, useState } from 'react'
import AIAssistant from '@/components/AIAssistant' // âœ… Make sure path is correct

type Invoice = {
  id: string
  client: string
  date: string
  tasks: any[]
  totalAmount: number
}

const InvoiceDashboard: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch('/api/fetch-invoices')
        const data = await res.json()
        setInvoices(data.invoices)
      } catch (err) {
        console.error('âŒ Failed to fetch invoices:', err)
      }
    }

    fetchInvoices()
  }, [])

  const handleExport = async (id: string, type: 'pdf' | 'csv') => {
    try {
      const res = await fetch('/api/export-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type }),
      })

      if (!res.ok) throw new Error('Failed to export invoice.')

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `invoice-${id}.${type}`
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (err: any) {
      console.error('âŒ Export failed:', err)
      alert('âŒ Export failed. Check console.')
    }
  }

  return (
    <div className="p-6 bg-white shadow rounded mt-6 relative">
      <h2 className="text-2xl font-bold mb-4">ðŸ"‹ All Invoices</h2>
      {invoices.length === 0 ? (
        <p className="text-gray-500">No invoices found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-2">Client</th>
              <th className="border p-2">Tasks</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="border p-2">{inv.client}</td>
                <td className="border p-2">{inv.tasks.length}</td>
                <td className="border p-2">${inv.totalAmount}</td>
                <td className="border p-2">{inv.date}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleExport(inv.id, 'pdf')}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    ðŸ"„ PDF
                  </button>
                  <button
                    onClick={() => handleExport(inv.id, 'csv')}
                    className="text-green-600 hover:underline text-sm"
                  >
                    ðŸ"Š CSV
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* âœ… Floating AI Assistant */}
      <AIAssistant />
    </div>
  )
}

export default InvoiceDashboard

