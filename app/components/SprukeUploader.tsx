// ✅ SprukeUploader with user ID, avatar linking, and filtering
'use client'
import { useState, useEffect } from 'react'
import ContactProModal from './ContactProModal'

const avatarMap: Record<string, string> = {
  'jessie-tran': '/avatars/avatar1.jpg',
  'sam-rivera': '/avatars/avatar2.jpg',
  'aisha-khan': '/avatars/avatar3.jpg',
  'luca-romano': '/avatars/avatar4.jpg',
}

type Spruke = {
  id: string
  caption: string
  mediaUrl: string
  type: 'image' | 'video'
  userId: string
}

const SprukeUploader = () => {
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [userId, setUserId] = useState('')
  const [filter, setFilter] = useState('')
  const [sprukes, setSprukes] = useState<Spruke[]>([])

  useEffect(() => {
    const fetchSprukes = async () => {
      const res = await fetch('/api/post-spruke')
      const data = await res.json()
      setSprukes(data.sprukes || [])
    }
    fetchSprukes()
  }, [])

  const handleUpload = async () => {
    if (!file || !userId) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('caption', caption)
    formData.append('userId', userId)

    const res = await fetch('/api/post-spruke', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      const newSpruke = await res.json()
      setSprukes((prev) => [newSpruke, ...prev])
      setCaption('')
      setUserId('')
      setFile(null)
    }
  }

  const filtered = filter
    ? sprukes.filter(
        (s) =>
          s.userId.toLowerCase().includes(filter.toLowerCase()) ||
          s.caption.toLowerCase().includes(filter.toLowerCase())
      )
    : sprukes

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')

  {
    modalOpen && (
      <ContactProModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        recipientName={selectedUser}
        recipientId={selectedUser}
      />
    )
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Spruke</h2>

      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-2"
      />

      <input
        type="text"
        placeholder="Your name or handle (e.g. sam-rivera)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="mb-2 block border p-2 rounded w-full max-w-md"
      />

      <input
        type="text"
        placeholder="Add a quick caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="mb-2 block border p-2 rounded w-full max-w-md"
      />

      <button
        onClick={handleUpload}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Upload
      </button>

      <div className="mt-10 mb-6">
        <input
          type="text"
          placeholder="Filter by user or caption..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="bg-white p-4 rounded-xl shadow border text-center"
          >
            {s.type === 'image' ? (
              <img src={s.mediaUrl} alt="Spruke" className="rounded mb-2" />
            ) : (
              <video
                src={s.mediaUrl}
                controls
                className="rounded mb-2 max-h-60 w-full"
              />
            )}
            <p className="text-gray-600 text-sm mb-1">{s.caption}</p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <img
                src={avatarMap[s.userId] || '/avatars/default.jpg'}
                alt="avatar"
                className="w-6 h-6 rounded-full"
              />
              <a
                href={`/find#${s.userId}`}
                className="text-blue-600 hover:underline"
              >
                {s.userId}
              </a>
            </div>

            {/* 🆕 Add this button */}
            <button
              onClick={() => {
                setSelectedUser(s.userId)
                setModalOpen(true)
              }}
              className="mt-3 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full"
            >
              Contact This Pro
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SprukeUploader

