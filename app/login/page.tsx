'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authConfig } from '../../lib/authConfig'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const existing = localStorage.getItem('userEmail')
    if (existing && authConfig.allowedEmails.includes(existing)) {
      router.push('/')
    }
  }, [])

  const handleLogin = () => {
    const isAllowed = authConfig.allowedEmails.includes(email.trim())
    const hasInvite = authConfig.inviteCodes.includes(inviteCode.trim())

    if (authConfig.inviteOnly && !isAllowed && !hasInvite) {
      setError('❌ You are not on the allowed test list.')
      return
    }

    localStorage.setItem('userEmail', email.trim())
    toast.success(`Welcome back, ${email.trim()}!`)
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4">🔐 Login to Invoicerly MVP</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="border p-2 rounded w-full max-w-xs mb-2"
      />
      {authConfig.inviteOnly && (
        <input
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="Optional Invite Code"
          className="border p-2 rounded w-full max-w-xs mb-2"
        />
      )}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Login
      </button>
    </div>
  )
}
