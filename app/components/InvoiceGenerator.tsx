'use client';
import { useState } from 'react';

export default function InvoiceGenerator() {
  const [client, setClient] = useState<string>('');

  const generateInvoice = async () => {
    if (!client.trim()) {
      alert('Enter client name');
      return;
    }

    try {
      const res = await fetch('/api/generate-invoice', {
        method: 'POST',
        body: JSON.stringify({ client }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      if (data.invoice) {
        alert(`✅ Invoice generated! Total: $${data.invoice.totalAmount}`);
      } else {
        alert('⚠️ No billable tasks found for this client.');
      }
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('❌ Failed to generate invoice. Please try again.');
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">Generate Invoice</h2>
      <input
        type="text"
        placeholder="Enter client name"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      />
      <button
        onClick={generateInvoice}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Generate Invoice
      </button>
    </div>
  );
}
