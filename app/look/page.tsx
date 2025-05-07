'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ThumbsUp } from 'lucide-react'

interface Spruke {
  id: string
  userName: string
  mediaUrl: string
  caption: string
  likes: number
}

export default function LookPage() {
  const [sprukes, setSprukes] = useState<Spruke[]>([])

  useEffect(() => {
    fetch('/data/sprukes.json')
      .then((res) => res.json())
      .then(setSprukes)
  }, [])

  const handleLike = (id: string) => {
    setSprukes((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, likes: s.likes + 1 } : s
      )
    )
    localStorage.setItem(`spruke-liked-${id}`, 'true')
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">ðŸŽ¥ Look â€“ Spotlight Posts</h1>

      {sprukes.length === 0 ? (
        <p className="text-gray-500 italic">No sprukes available yet.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {sprukes.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl overflow-hidden shadow border bg-white"
            >
              <video
                src={s.mediaUrl}
                controls
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg">{s.userName}</h2>
                <p className="text-sm text-gray-600">{s.caption}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{s.likes} Likes</span>
                  <button
                    onClick={() => handleLike(s.id)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 disabled:opacity-50"
                    disabled={
                      localStorage.getItem(`spruke-liked-${s.id}`) === 'true'
                    }
                  >
                    <ThumbsUp size={16} /> Like
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
