'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Image from 'next/image'
import SendMessageModal from '@/components/SendMessageModal'

interface Message {
  id?: string
  from: string
  to: string
  subject?: string
  body?: string
  message?: string
  date?: string
  timestamp?: string
  read?: boolean
  fromAvatar?: string
  replies?: Reply[]
  source?: string
}

interface Reply {
  id?: string
  messageId?: string
  text?: string
  fileUrl?: string
  date?: string
  message?: string
  source?: string
}

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [filter, setFilter] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'replied'>(
    'all'
  )
  const [sourceFilter, setSourceFilter] = useState<'all' | 'whatsapp'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function loadMessages() {
      const base = await fetch('/data/messages.json').then((res) => res.json())

      const grouped = base.reduce((acc: Message[], msg: Message) => {
        const existing = acc.find(
          (m) =>
            m.from === msg.from &&
            m.to === msg.to &&
            m.source !== 'whatsapp' &&
            !m.subject
        )

        if (existing) {
          existing.replies = existing.replies || []
          existing.replies.push({
            message: msg.message,
            date: msg.timestamp,
            source: msg.source,
          })
        } else {
          acc.push(msg)
        }

        return acc
      }, [])

      setMessages(grouped)
    }
    loadMessages()
  }, [])

  const filtered = messages.filter((msg) => {
    const content = `${msg.subject || ''} ${msg.body || ''} ${msg.message || ''}`
    const matchesText = content.toLowerCase().includes(filter.toLowerCase())
    const matchesType =
      filterType === 'all' ||
      (filterType === 'unread' && !msg.read) ||
      (filterType === 'replied' && msg.replies && msg.replies.length > 0)
    const matchesSource =
      sourceFilter === 'all' || msg.source?.toLowerCase() === sourceFilter

    return matchesText && matchesType && matchesSource
  })

  const markAsRead = async (id: string | undefined) => {
    if (!id) return
    const updated = messages.map((msg) =>
      msg.id === id ? { ...msg, read: true } : msg
    )
    setMessages(updated)
    toast.success('Marked as read')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold">📥 Inbox</h1>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <Input
          placeholder="Search messages..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/2"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
          <option value="replied">Replied</option>
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value as any)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="all">All Sources</option>
          <option value="whatsapp">WhatsApp Only</option>
        </select>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        className="space-y-4"
      >
        {filtered.length === 0 && (
          <p className="text-gray-500 italic">No messages found.</p>
        )}

        {filtered.map((msg) => (
          <motion.div
            key={msg.id || msg.timestamp}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded border p-4 shadow-sm transition hover:shadow-md bg-white ${msg.read ? 'opacity-70' : ''}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-3">
                <Image
                  src={msg.fromAvatar || '/avatars/default.jpg'}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full border"
                />
                <div>
                  <p className="text-sm text-gray-500">From: {msg.from}</p>
                  <h2 className="text-lg font-semibold">
                    {msg.subject || msg.message}
                    {msg.source === 'whatsapp' && (
                      <span className="ml-2 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        WhatsApp
                      </span>
                    )}
                  </h2>
                </div>
              </div>
              {!msg.read && msg.id && (
                <Button
                  onClick={() => markAsRead(msg.id)}
                  className="text-sm px-3 py-1"
                >
                  Mark Read
                </Button>
              )}
            </div>

            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {msg.body}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              📅 {msg.date || msg.timestamp}
            </p>

            {Array.isArray(msg.replies) && msg.replies.length > 0 && (
              <div className="space-y-2 border-t pt-4 mt-4">
                <h3 className="text-sm font-semibold text-gray-600">Replies</h3>
                {msg.replies.map((r, i) => (
                  <div
                    key={i}
                    className="text-sm border rounded p-2 bg-gray-50 space-y-1"
                  >
                    {r.message && (
                      <p className="mb-1">
                        💬 <span className="text-gray-800">{r.message}</span>
                      </p>
                    )}
                    {r.text && (
                      <p className="mb-1">
                        📎 <span className="text-gray-800">{r.text}</span>
                      </p>
                    )}
                    {r.fileUrl && (
                      <a
                        href={r.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        🎧 Voice / File Reply
                      </a>
                    )}
                    {r.date && (
                      <p className="text-xs text-gray-400">🕒 {r.date}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <Button
                onClick={() => {
                  setSelectedMessage(msg)
                  setShowModal(true)
                }}
              >
                Reply
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {showModal && selectedMessage && (
        <SendMessageModal
          recipient={{
            name: selectedMessage.from,
            email: selectedMessage.to,
            avatar: selectedMessage.fromAvatar || '/avatars/default.jpg',
            userId: 'unknown',
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
