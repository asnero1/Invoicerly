'use client';
import { useState } from 'react';

export default function InvoiceGenerator() {
  const [client, setClient] = useState('');

  const generateInvoice = async () => {
    if (!client) return alert('Enter client name');
    const res = await fetch('/api/generate-invoice', {
      method: 'POST',
      body: JSON.stringify({ client }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (data.invoice) {
      alert(`Invoice generated! Total: $${data.invoice.totalAmount}`);
    } else {
      alert('No billable tasks found.');
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold">Generate Invoice</h2>
      <input
        type="text"
        placeholder="Client name"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        className="border p-2 mt-2 w-full"
      />
      <button onClick={generateInvoice} className="bg-green-500 text-white px-4 py-2 mt-2 rounded">
        Generate Invoice
      </button>
    </div>
  );
}
