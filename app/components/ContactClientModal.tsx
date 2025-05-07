﻿'use client'

import React from 'react'
import type { User } from '@/types'

interface Props {
  client: User
  onClose: () => void
}

const ContactClientModal: React.FC<Props> = ({ client, onClose }) => {
  if (!client) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl relative">
        {/* âŒ Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          Ã—
        </button>

        {/* ðŸ'¼ Client Details */}
        <h2 className="text-xl font-bold mb-4">Contact {client.name}</h2>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Role:</strong> {client.role}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Default Email:</strong> {client.defaultEmail}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Phone:</strong> {client.phone || 'N/A'}
        </p>

        {/* ðŸŒ Additional Emails */}
        <div className="mt-4">
          <strong className="text-sm text-gray-600">Other Emails:</strong>
          <ul className="list-disc ml-5 text-sm text-gray-700 mt-1">
            {client.otherEmails?.map((email: string, index: number) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>

        {/* ðŸ"Ž Actions (Placeholder for now) */}
        <div className="mt-6 text-right">
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactClientModal

