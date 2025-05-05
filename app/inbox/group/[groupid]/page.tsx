// ✅ FILE: /app/inbox/group/[groupid]/page.tsx

'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { motion } from 'framer-motion'

const CURRENT_USER = 'Antonio'

interface Group {
  id: string
  name: string
  members: string[]
}

interface GroupMessage {
  id: string
  groupId: string
  sender: string
  content: string
  timestamp: string
}

export default function GroupChatPage() {
  const { groupid } = useParams()
  const [group, setGroup] = useState<Group | null>(null)
  const [messages, setMessages] = useState<GroupMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const loadGroup = async () => {
    const res = await fetch('/data/groups.json')
    const all: Group[] = await res.json()
    const found = all.find((g) => g.id === groupid)
    setGroup(found || null)
  }

  const loadMessages = async () => {
    const res = await fetch('/data/group-messages.json')
    const all: GroupMessage[] = await res.json()
    const relevant = all.filter((msg) => msg.groupId === groupid)
    setMessages(
      relevant.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
    )
  }

  useEffect(() => {
    loadGroup()
    loadMessages()
  }, [groupid])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const res = await fetch('/api/send-group-message', {
      method: 'POST',
      body: JSON.stringify({
        sender: CURRENT_USER,
        groupId: groupid,
        content: newMessage,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      setNewMessage('')
      await loadMessages()
    }
  }

  return (
    <motion.div
      className="p-6 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {group ? (
        <>
          <h1 className="text-2xl font-bold mb-2">👥 {group.name}</h1>
          <p className="text-sm text-gray-500 mb-4">
            Members: {group.members.join(', ')}
          </p>

          <div className="space-y-3 mb-4">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.01 }}
                className={`p-3 rounded-xl shadow-sm w-fit max-w-[80%] ${
                  msg.sender === CURRENT_USER
                    ? 'bg-blue-100 ml-auto text-right'
                    : 'bg-gray-100'
                }`}
              >
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  {msg.sender}
                </p>
                <p className="text-gray-800 whitespace-pre-line">
                  {msg.content}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDistanceToNow(new Date(msg.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </motion.div>
            ))}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={sendMessage} className="mt-4 flex flex-col gap-2">
            <textarea
              rows={3}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full p-2 border rounded-md resize-none"
            />
            <button
              type="submit"
              className="self-end bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Send
            </button>
          </form>
        </>
      ) : (
        <p className="text-gray-500">Group not found.</p>
      )}
    </motion.div>
  )
}
