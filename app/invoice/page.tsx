'use client'

import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import invoices from '@/data/invoices.json'
import ResendInvoiceModal from '@/components/ResendInvoiceModal'

export default function InvoicePage() {
  const [selectedEmail, setSelectedEmail] = useState('marnie@personal.com')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null)

  const emailOptions = [
    { label: 'Marnie (Personal)', value: 'marnie@personal.com' },
    { label: 'Food For Health (FFH)', value: 'marnie@foodforhealth.com.au' },
  ]

  const handleEmailChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmail(e.target.value)
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }

  const handleResendWhatsApp = (invoice: any) => {
    setSelectedInvoice(invoice)
    setModalOpen(true)
  }

  const filteredInvoices = invoices.filter((inv: any) =>
    statusFilter === 'all' ? true : inv.status === statusFilter
  )

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧾 Send Invoice</h1>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-sm">
          Select sender email:
        </label>
        <select
          value={selectedEmail}
          onChange={handleEmailChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {emailOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label} — {option.value}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-sm">
          Filter by status:
        </label>
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      <div className="bg-gray-100 p-4 rounded mb-8">
        <p className="text-sm text-gray-600 mb-1">Invoice will be sent from:</p>
        <p className="text-lg font-mono text-black">{selectedEmail}</p>
      </div>

      <div className="bg-white p-6 border border-dashed border-gray-300 rounded text-center text-gray-500">
        <p className="text-sm">
          💡 This is where the invoice builder or preview will go soon.
        </p>
        <p className="text-xs mt-1">
          WIP – data integration & PDF generation coming 🔧
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold mb-2">🧾 Invoices</h2>
        {filteredInvoices.length === 0 ? (
          <p className="text-gray-500 italic">
            No invoices found for selected filter.
          </p>
        ) : (
          <ul className="divide-y">
            {filteredInvoices.map((inv: any) => (
              <li
                key={inv.id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-sm">Client: {inv.client}</p>
                  <p className="text-xs text-gray-500">
                    {inv.date} — ${inv.amount} ({inv.status})
                  </p>
                </div>
                <button
                  onClick={() => handleResendWhatsApp(inv)}
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  <FaWhatsapp className="mr-2" /> Resend
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedInvoice && (
        <ResendInvoiceModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fileName={selectedInvoice.fileName}
          phoneNumber={selectedInvoice.phoneNumber}
        />
      )}
    </div>
  )
}
