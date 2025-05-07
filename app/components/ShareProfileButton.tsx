// âœ… FILE: app/components/ShareProfileButton.tsx

'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

const ShareProfileButton: React.FC<{ username?: string }> = ({ username }) => {
  const { data: session } = useSession()

  const handleCopyLink = () => {
    const userSlug = (username || session?.user?.name || 'unknown')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    const url = `${window.location.origin}/pages/public-profile?user=${userSlug}`
    navigator.clipboard.writeText(url)
    toast.success('Profile link copied to clipboard!')
  }

  return (
    <div className="mb-6">
      <p className="text-sm text-gray-700">ï¿½"ï¿½ Share your Invoicerly profile:</p>
      <button
        onClick={handleCopyLink}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        ï¿½"ï¿½ Share My Profile
      </button>
    </div>
  )
}

export default ShareProfileButton

