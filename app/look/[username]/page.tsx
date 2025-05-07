"use client"

import { useParams } from "next/navigation"

export default function LookPage() {
  const { username } = useParams()

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Look Page</h1>
      <p className="mt-2 text-gray-600">Viewing profile for: {username}</p>
    </div>
  )
}
