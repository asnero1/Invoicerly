'use client';

import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import users from '@/data/users.json';
import invoices from '@/public/data/invoices.json';
import { sendWhatsAppInvoice } from '@/lib/sendWhatsAppInvoice';
import ContactClientModal from '@/components/ContactClientModal';
import { Invoice, User } from '@/types';

export default function UserProfilePage({ params }: { params: { userid: string } }) {
  const [userInvoices, setUserInvoices] = useState<Invoice[]>([]);

  const user = users.find((u: User) => u.id === params.userid);

  useEffect(() => {
    const filtered = invoices.filter((inv: Invoice) => inv.clientId === params.userid);
    setUserInvoices(filtered);
  }, [params.userid]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{user?.name}'s Profile</h1>
      <p>Contact: {user?.phone}</p>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Invoices</h2>
        <ul className="space-y-2">
          {userInvoices.map((inv: Invoice) => (
            <li key={inv.id} className="border p-3 rounded shadow-sm">
              <p>{inv.description}</p>
              <p className="text-sm text-gray-500">Amount: ${inv.amount}</p>
              <button
                className="mt-1 text-sm text-blue-600 hover:underline inline-flex items-center gap-2"
                onClick={() =>
                  sendWhatsAppInvoice({
                    phoneNumber: user?.phone || '',
                    fileName: `Invoice_${inv.id}.pdf`,
                  })
                }
              >
                <FaWhatsapp className="inline mr-1" />
                Send via WhatsApp
              </button>
            </li>
          ))}
        </ul>
      </div>

      {user && <ContactClientModal client={user} onClose={() => {}} />}
    </div>
  );
}
