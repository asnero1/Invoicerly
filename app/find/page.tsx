'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import Image from 'next/image'

interface User {
  id: string
  name: string
  role: string
  avatarUrl: string
  bio: string
  likes?: number
}

export default function FindPage() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('All')

  useEffect(() => {
    fetch('/data/users.json')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => toast.error('Failed to load user list'))
  }, [])

  const roles = Array.from(new Set(users.map((u) => u.role)))

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase())
    const matchesRole = filterRole === 'All' || u.role === filterRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">�"� Find Professionals</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded md:w-1/3"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((u) => (
          <Link
            key={u.id}
            href={`/find/${u.id}`}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <Image
                src={u.avatarUrl || '/default-avatar.png'}
                alt={u.name}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-bold text-lg">{u.name}</p>
                <p className="text-sm text-gray-500">{u.role}</p>
                <p className="text-xs text-gray-400 line-clamp-2">{u.bio}</p>

                <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {u.likes && u.likes > 0
                    ? `👍 ${u.likes} Like${u.likes > 1 ? 's' : ''}`
                    : '🆕 New'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">⭐ Rate Your Experience</h2>
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="text-yellow-500 text-2xl cursor-pointer hover:scale-110 transition-transform"
              role="button"
              aria-label={`Rate ${star} stars`}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Leave feedback (optional)..."
          className="w-full p-3 border rounded shadow-sm resize-none"
          rows={3}
        />
        <div className="mt-2">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  )
}

