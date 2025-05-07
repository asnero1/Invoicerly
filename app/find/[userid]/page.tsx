// app/find/[userid]/page.tsx

"use client"

import { useParams } from "next/navigation"

export default function UserProfilePage() {
  const { userid } = useParams()

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">User Profile</h1>
      <p className="mt-2 text-gray-600">User ID: {userid}</p>
    </div>
  )
}
