'use client'

import React, { useState } from 'react'

const SettingsForm: React.FC<{ user: any }> = ({ user }) => {
  const [email, setEmail] = useState(user.email)
  const [name, setName] = useState(user.userName)

  const handleSave = () => {
    const updatedUser = { ...user, email, userName: name }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    alert('Your profile has been updated!')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default SettingsForm

