'use client'

import { useEffect, useState } from 'react'

export default function WelcomeBanner() {
  const [name, setName] = useState('')

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    if (!email) return

    // Extract name from email prefix
    const username = email.split('@')[0]
    const displayName = username.charAt(0).toUpperCase() + username.slice(1)
    setName(displayName)
  }, [])

  if (!name) return null

  return (
    <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-xl mb-6">
      👋 Welcome back, <strong>{name}</strong>!
    </div>
  )
}

