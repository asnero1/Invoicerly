'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const tiles = [
  { label: 'PayMe', description: 'Create & send invoices', path: '/payme' },
  { label: 'PayYou', description: 'Track what you owe', path: '/payyou' },
  { label: 'Find', description: 'Browse users & freelancers', path: '/find' },
  { label: 'Look', description: 'Show off your work (Spruke)', path: '/look' },
]

const DashboardTiles = () => {
  const router = useRouter()

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          onClick={() => router.push(tile.path)}
          className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all border border-gray-200"
        >
          <h3 className="text-xl font-bold mb-2">{tile.label}</h3>
          <p className="text-gray-600 text-sm">{tile.description}</p>
        </div>
      ))}
    </div>
  )
}

export default DashboardTiles
