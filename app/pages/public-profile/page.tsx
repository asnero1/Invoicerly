'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThumbsUp } from 'lucide-react'

interface UserProfile {
  name: string
  role: string
  bio?: string
  avatar?: string
  likes?: number
  contactEnabled?: boolean
}

export default function PublicProfilePage() {
  const searchParams = useSearchParams()
  const username = searchParams.get('user') || ''
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (!username) return
    fetch(`/data/users.json`)
      .then((res) => res.json())
      .then((data) => {
        const match = data.find(
          (u: UserProfile) =>
            u.name.toLowerCase().replace(/\s+/g, '-') === username.toLowerCase()
        )
        if (match) setProfile(match)
      })

    setLiked(localStorage.getItem(`liked-profile-${username}`) === 'true')
  }, [username])

  const handleLike = () => {
    setLiked(true)
    localStorage.setItem(`liked-profile-${username}`, 'true')
    setProfile((prev) =>
      prev ? { ...prev, likes: (prev.likes || 0) + 1 } : null
    )
  }

  if (!profile) {
    return (
      <div className="p-6 text-center text-gray-500">Loading profile...</div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-center space-y-6">
      <img
        src={profile.avatar || '/avatars/default.jpg'}
        alt={profile.name}
        className="w-24 h-24 mx-auto rounded-full object-cover border"
      />
      <h1 className="text-3xl font-bold">{profile.name}</h1>
      <p className="text-sm text-gray-600 italic">{profile.role}</p>
      <p className="text-gray-700 max-w-xl mx-auto">{profile.bio}</p>

      <div className="flex justify-center gap-4">
        <span className="text-sm text-green-700">
          {profile.likes || 0} Trust {profile.likes === 1 ? 'Like' : 'Likes'}
        </span>
        <Button
          onClick={handleLike}
          disabled={liked}
          className={
            liked ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : ''
          }
        >
          <ThumbsUp size={16} className="mr-2" /> {liked ? 'Liked' : 'Like'}
        </Button>
      </div>

      {profile.contactEnabled && (
        <a
          href={`/contact?to=${encodeURIComponent(profile.name)}&spruke=general`}
          className="text-blue-600 hover:underline block text-sm"
        >
          ðŸ"§ Contact This Pro
        </a>
      )}
    </div>
  )
}

