'use client'

import { useState } from 'react'

export default function InvoicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const invoices = [
    { id: 1, client: 'John Doe', amount: '$250', status: 'Paid' },
    { id: 2, client: 'Acme Corp', amount: '$500', status: 'Pending' },
  ]

  const openModal = (invoice) => {
    setSelectedInvoice(invoice)
    setIsModalOpen(true)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Invoices</h1>
      <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border p-4 text-left">Client</th>
            <th className="border p-4 text-left">Amount</th>
            <th className="border p-4 text-left">Status</th>
            <th className="border p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-100 transition">
              <td className="border p-4">{invoice.client}</td>
              <td className="border p-4">{invoice.amount}</td>
              <td className="border p-4">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                    invoice.status === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
              <td className="border p-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                  onClick={() => openModal(invoice)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Overlay */}
      {isModalOpen && selectedInvoice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold">{selectedInvoice.client}</h2>
            <p className="mt-2">
              <strong>Amount:</strong> {selectedInvoice.amount}
            </p>
            <p className="mt-2">
              <strong>Status:</strong> {selectedInvoice.status}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
