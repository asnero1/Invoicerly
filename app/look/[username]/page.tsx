// @ts-nocheck

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import users from '@/data/users.json'
import sprukes from '@/data/sprukes.json'
import { ThumbsUp, Share } from 'lucide-react'

type PageProps = {
  params: {
    username: string
  }
}

export default function PublicProfilePage({ params }: PageProps) {
  const [liked, setLiked] = useState<string[]>([])
  const username = decodeURIComponent(params.username)
  const user = users.find(
    (u: any) => u.name?.toLowerCase() === username.toLowerCase()
  )

  if (!user) return <div>User not found</div>

  const userSprukes = sprukes.filter(
    (s: any) => s.user?.toLowerCase() === user.name.toLowerCase()
  )

  const handleLike = (id: string) => {
    if (!liked.includes(id)) {
      setLiked([...liked, id])
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="mb-6">
        <Image
          src={user.avatar || '/default-avatar.png'}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full mb-4"
        />
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-600 italic">
          {user.role || 'No bio available'}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">📸 Sprukes</h2>
      {userSprukes.length === 0 && <p>No sprukes yet.</p>}

      {userSprukes.map((spruke: any) => (
        <div key={spruke.id} className="mb-6 p-4 bg-white rounded-xl shadow">
          {spruke.video && (
            <video
              src={spruke.video}
              controls
              className="w-full mb-2 rounded"
            />
          )}
          {spruke.audio && (
            <audio src={spruke.audio} controls className="w-full mb-2" />
          )}
          <p className="text-lg">{spruke.caption}</p>
          <p className="text-sm text-gray-500">📅 {spruke.date}</p>
          <p className="text-sm text-gray-500">
            ❤️ {spruke.likes + (liked.includes(spruke.id) ? 1 : 0)} likes
          </p>
        </div>
      ))}
    </div>
  )
}
