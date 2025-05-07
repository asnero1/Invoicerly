"use client"

import { useParams } from "next/navigation"

export default function UserInboxPage() {
  const { userid } = useParams()

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Inbox for User</h1>
      <p className="mt-2 text-gray-600">User ID: {userid}</p>
    </div>
  )
}
