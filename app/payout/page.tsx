'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'

interface Payee {
  id: string
  name: string
  contact: string
  payid: string
  bank: string
  tag: string
}

export default function PayOutPage() {
  const [payees, setPayees] = useState<Payee[]>([])
  const [filter, setFilter] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedData, setEditedData] = useState<Partial<Payee>>({})
  const [selectedTag, setSelectedTag] = useState<string>('All')

  useEffect(() => {
    fetch('/data/payout.json')
      .then((res) => res.json())
      .then((data: Record<string, Payee>) => setPayees(Object.values(data)))
      .catch(() => toast.error('Failed to load PayOut data'))
  }, [])

  const tags = Array.from(new Set(payees.map((p) => p.tag))).filter(Boolean)

  const grouped = payees.filter((p) => {
    const matchesTag = selectedTag === 'All' || p.tag === selectedTag
    const matchesSearch = p.name.toLowerCase().includes(filter.toLowerCase())
    return matchesTag && matchesSearch
  })

  const startEdit = (id: string) => {
    const item = payees.find((p) => p.id === id)
    if (item) {
      setEditedData(item)
      setEditingId(id)
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditedData({})
  }

  const saveEdit = () => {
    if (!editingId) return
    setPayees((prev) =>
      prev.map((p) => (p.id === editingId ? { ...p, ...editedData } : p))
    )
    toast.success('Entry updated')
    cancelEdit()
  }

  const deleteEntry = (id: string) => {
    setPayees((prev) => prev.filter((p) => p.id !== id))
    toast.success('Entry deleted')
  }

  const exportCSV = () => {
    const csv = [
      ['Name', 'Contact', 'PayID', 'Bank', 'Tag'],
      ...payees.map((p) => [p.name, p.contact, p.payid, p.bank, p.tag]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'payout-export.csv')
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">ï¿½"ï¿½ PayOut ï¿½" Payments You've Made</h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Input
          placeholder="Search by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="md:w-1/3"
        />
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Tags</option>
          {tags.map((tag) => (
            <option key={tag}>{tag}</option>
          ))}
        </select>
        <Button
          onClick={exportCSV}
          className="bg-black text-white hover:bg-gray-800"
        >
          Export CSV
        </Button>
      </div>

      <div className="space-y-4">
        {grouped.map((p, index) => (
          <div
            key={p.id || index}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            {editingId === p.id ? (
              <div className="w-full space-y-2">
                <Input
                  placeholder="Name"
                  value={editedData.name || ''}
                  onChange={(e) =>
                    setEditedData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <Input
                  placeholder="Contact"
                  value={editedData.contact || ''}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      contact: e.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="PayID"
                  value={editedData.payid || ''}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev,
                      payid: e.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Bank"
                  value={editedData.bank || ''}
                  onChange={(e) =>
                    setEditedData((prev) => ({ ...prev, bank: e.target.value }))
                  }
                />
                <Input
                  placeholder="Tag"
                  value={editedData.tag || ''}
                  onChange={(e) =>
                    setEditedData((prev) => ({ ...prev, tag: e.target.value }))
                  }
                />
                <div className="flex gap-2">
                  <Button onClick={saveEdit}>Save</Button>
                  <Button variant="secondary" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">{p.contact}</p>
                <p className="text-sm flex items-center gap-2">
                  {p.payid} ï¿½" {p.bank}
                  <Button
                    className="text-xs px-2 py-1"
                    onClick={() => {
                      navigator.clipboard.writeText(p.payid)
                      toast.success('PayID copied to clipboard')
                    }}
                  >
                    Copy PayID
                  </Button>
                  <Button
                    className="text-xs px-2 py-1"
                    onClick={() => {
                      navigator.clipboard.writeText(p.bank)
                      toast.success('Bank copied to clipboard')
                    }}
                  >
                    Copy Bank
                  </Button>
                </p>
                <span className="text-xs inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {p.tag}
                </span>
              </div>
            )}

            {editingId !== p.id && (
              <div className="flex gap-2 mt-2 md:mt-0">
                <Button onClick={() => startEdit(p.id)}>Edit</Button>
                <Button variant="destructive" onClick={() => deleteEntry(p.id)}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

