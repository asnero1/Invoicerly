"use client"

import { useParams } from "next/navigation"

export default function GroupInboxPage() {
  const { groupid } = useParams()

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Group Inbox</h1>
      <p className="mt-2 text-gray-600">Group ID: {groupid}</p>
    </div>
  )
}
