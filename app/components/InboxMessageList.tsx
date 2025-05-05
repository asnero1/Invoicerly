'use client'

import React from 'react'
import messages from '@/data/messages.json'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { FaUserCircle } from 'react-icons/fa'

const InboxMessageList: React.FC = () => {
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <div className="space-y-4">
      {sortedMessages.map((msg, index) => (
        <div
          key={index}
          className="bg-white p-4 shadow rounded-lg border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-gray-500 text-2xl" />
            <div>
              <div className="font-semibold">{msg.name || msg.sender}</div>
              <div className="text-sm text-gray-600">{msg.contact}</div>
            </div>
          </div>

          <p className="mt-3">{msg.message}</p>

          <div className="text-xs text-gray-400 mt-2">
            {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default InboxMessageList
