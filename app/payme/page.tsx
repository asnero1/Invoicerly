'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import * as Papa from 'papaparse'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { motion } from 'framer-motion'
import JSZip from 'jszip'

type Task = {
  id: string
  title?: string
  description?: string
  client: string
  payer: string
  date: string
  paid: boolean
  amount?: number
  receiptUrl?: string
  liked?: boolean
}

export default function PayMePage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [search, setSearch] = useState('')
  const [filterPaid, setFilterPaid] = useState<'all' | 'paid' | 'unpaid'>('all')
  const [filterClient, setFilterClient] = useState<string>('all')
  const [filterWeek, setFilterWeek] = useState(false)
  const [likes, setLikes] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function loadData() {
      const res = await fetch('/data/tasks.json')
      const json = await res.json()
      setTasks(json)
    }
    loadData()
  }, [])

  const thisWeekRange = () => {
    const now = new Date()
    const start = new Date(now)
    start.setDate(now.getDate() - now.getDay())
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return [start, end]
  }

  const [weekStart, weekEnd] = thisWeekRange()

  const filtered = tasks.filter((task) => {
    const matchSearch = (task.title || task.description || '')
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchPaid =
      filterPaid === 'all' ||
      (filterPaid === 'paid' && task.paid) ||
      (filterPaid === 'unpaid' && !task.paid)
    const matchClient = filterClient === 'all' || task.client === filterClient
    const matchWeek =
      !filterWeek ||
      (new Date(task.date) >= weekStart && new Date(task.date) <= weekEnd)

    return matchSearch && matchPaid && matchClient && matchWeek
  })

  const uniqueClients = Array.from(new Set(tasks.map((t) => t.client)))
  const paidCount = filtered.filter((t) => t.paid).length
  const unpaidCount = filtered.filter((t) => !t.paid).length

  const revenueThisWeek = tasks
    .filter(
      (t) =>
        t.paid && new Date(t.date) >= weekStart && new Date(t.date) <= weekEnd
    )
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  const revenueThisMonth = tasks
    .filter((t) => {
      const date = new Date(t.date)
      const now = new Date()
      return (
        t.paid &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      )
    })
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  const revenueByClient: { [client: string]: number } = {}
  tasks.forEach((t) => {
    if (t.paid) {
      revenueByClient[t.client] =
        (revenueByClient[t.client] || 0) + (t.amount || 0)
    }
  })

  const markAsPaid = async (taskId: string) => {
    try {
      const updated = tasks.map((t) =>
        t.id === taskId ? { ...t, paid: true } : t
      )
      setTasks(updated)
      await fetch('/api/save-tasks', {
        method: 'POST',
        body: JSON.stringify(updated),
      })
      toast.success('Marked as paid!')
    } catch (err) {
      toast.error('Failed to update payment.')
    }
  }

  const likeTask = (id: string) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }))
    toast.success('Thanks for the feedback!')
  }

  const exportCSV = () => {
    const csv = Papa.unparse(filtered)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'payme-data.csv')
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Payment Report', 14, 16)
    autoTable(doc, {
      startY: 20,
      head: [['Task', 'Client', 'Payer', 'Date', 'Paid', 'Amount']],
      body: filtered.map((t) => [
        t.title || t.description || '-',
        t.client,
        t.payer,
        t.date,
        t.paid ? '‚úÖ' : '‚ùå',
        `$${t.amount?.toFixed(2) || '0.00'}`,
      ]),
    })
    doc.save('payme-report.pdf')
  }

  const exportReceiptsZip = async () => {
    const zip = new JSZip()
    const receiptTasks = filtered.filter((t) => t.receiptUrl)

    for (const task of receiptTasks) {
      try {
        const res = await fetch(task.receiptUrl!)
        const blob = await res.blob()
        zip.file(
          task.receiptUrl!.split('/').pop() || `receipt-${task.id}`,
          blob
        )
      } catch {
        toast.error(`Failed to fetch receipt for ${task.title || task.id}`)
      }
    }

    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, 'receipts.zip')
  }

  const exportAllCSV = () => {
    const csv = Papa.unparse(tasks)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'all-invoices.csv')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold">üßæ PayMe ‚Ä" Who's Paid You</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Input
          type="text"
          placeholder="Search title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded text-sm"
          value={filterPaid}
          onChange={(e) => setFilterPaid(e.target.value as any)}
        >
          <option value="all">All Payments</option>
          <option value="paid">Only Paid</option>
          <option value="unpaid">Only Unpaid</option>
        </select>
        <select
          className="border px-3 py-2 rounded text-sm"
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
        >
          <option value="all">All Clients</option>
          {uniqueClients.map((client) => (
            <option key={client} value={client}>
              {client}
            </option>
          ))}
        </select>
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={filterWeek}
            onChange={() => setFilterWeek(!filterWeek)}
          />
          <span>This Week</span>
        </label>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-start">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-1 text-sm text-gray-700">
            <div>
              <strong>{paidCount}</strong> Paid, <strong>{unpaidCount}</strong>{' '}
              Unpaid
            </div>
            <div>
              ü'∞ <strong>This Week:</strong> ${revenueThisWeek.toFixed(2)}
            </div>
            <div>
              ü"Ö <strong>This Month:</strong> ${revenueThisMonth.toFixed(2)}
            </div>
            <div>
              ü"ä <strong>By Client:</strong>
            </div>
            <ul className="ml-4 list-disc">
              {Object.entries(revenueByClient).map(([client, total]) => (
                <li key={client}>
                  {client}: ${total.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="space-x-2 mt-4 md:mt-0">
          <Button onClick={exportCSV}>Export CSV</Button>
          <Button onClick={exportPDF} variant="secondary">
            Export PDF
          </Button>
          <Button onClick={exportReceiptsZip} variant="secondary">
            Export Receipts
          </Button>
          <Button onClick={exportAllCSV} variant="secondary">
            Export All
          </Button>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {filtered.map((task) => (
          <motion.div
            key={task.id}
            className="bg-white p-4 rounded shadow space-y-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>
              <strong>{task.title || task.description || '‚Ä"'}</strong>
            </p>
            <p className="text-sm text-gray-500">Client: {task.client}</p>
            <p className="text-sm text-gray-500">Payer: {task.payer}</p>
            <p className="text-sm text-gray-500">Date: {task.date}</p>
            <p
              className={`font-semibold ${task.paid ? 'text-green-600' : 'text-yellow-600'}`}
            >
              {task.paid ? '‚úÖ Paid' : '‚ùå Unpaid'}
            </p>
            <p className="text-sm">
              Amount: ${task.amount?.toFixed(2) || '0.00'}
            </p>
            {task.receiptUrl && (
              <img
                src={task.receiptUrl}
                alt="Receipt"
                className="w-32 h-20 object-cover rounded border"
              />
            )}
            {!task.paid && (
              <Button
                onClick={() => markAsPaid(task.id)}
                className="text-sm px-3 py-1"
              >
                Mark as Paid
              </Button>
            )}
            {task.paid && (
              <button
                className={`text-sm px-3 py-1 rounded border ${
                  likes[task.id]
                    ? 'bg-green-100 border-green-400'
                    : 'border-gray-300'
                }`}
                onClick={() => likeTask(task.id)}
              >
                üëç {likes[task.id] ? 'Liked!' : 'Like'}
              </button>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

