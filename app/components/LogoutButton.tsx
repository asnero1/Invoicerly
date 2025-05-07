'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LogoutButton() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('userEmail')
    toast.success('Logged out')
    router.push('/login')
  }

  return (
    <>
      <button
        onClick={() => setConfirmOpen(true)}
        className="text-sm text-red-600 underline hover:text-red-800"
      >
        Logout
      </button>

      {confirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-2">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-3 py-1 text-sm rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

