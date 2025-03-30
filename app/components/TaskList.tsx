'use client'

import React, { useEffect, useState } from 'react'
import ClientProfileModal from './ClientProfileModal'

export type Task = {
  id: string
  description: string
  client: string
  date: string
  billable: boolean
  dueDate?: string
  voiceNote?: string
  attachmentName?: string
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showBillableOnly, setShowBillableOnly] = useState(false)
  const [editTaskId, setEditTaskId] = useState<string | null>(null)
  const [editedTask, setEditedTask] = useState<Partial<Task>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [showClientModal, setShowClientModal] = useState(false)
  const tasksPerPage = 10

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch('/api/fetch-tasks')
        const data = await res.json()
        setTasks(data.tasks)
      } catch (err) {
        console.error('❌ Failed to load tasks:', err)
      }
    }

    fetchTasks()
    window.addEventListener('task-added', fetchTasks)
    return () => window.removeEventListener('task-added', fetchTasks)
  }, [])

  const handleEditChange = (field: keyof Task, value: string) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }))
  }

  const saveTaskEdit = async (taskId: string) => {
    const updated = { ...tasks.find((t) => t.id === taskId), ...editedTask }
    try {
      const res = await fetch('/api/update-task', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })

      if (res.ok) {
        setTasks((prev) => prev.map((task) => (task.id === taskId ? (updated as Task) : task)))
        setEditTaskId(null)
        setEditedTask({})
      } else {
        alert('❌ Failed to save changes.')
      }
    } catch (err) {
      console.error('❌ Update error:', err)
      alert('❌ Network error.')
    }
  }

  const deleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return
    try {
      const res = await fetch('/api/delete-task', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) setTasks((prev) => prev.filter((task) => task.id !== id))
      else alert('❌ Failed to delete task.')
    } catch (err) {
      console.error('❌ Delete error:', err)
      alert('❌ Network error.')
    }
  }

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.description.toLowerCase().includes(search.toLowerCase()) ||
        task.client.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => (showBillableOnly ? task.billable : true))
    .sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    )

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  )

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h2 className="text-xl font-bold mb-4">Saved Tasks</h2>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-64"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="border p-2 rounded"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showBillableOnly}
            onChange={(e) => setShowBillableOnly(e.target.checked)}
          />
          Show Billable Only
        </label>
      </div>

      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border p-2">Description</th>
            <th className="border p-2">Client</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Due</th>
            <th className="border p-2">Billable</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.map((task) => (
            <tr key={task.id}>
              <td className="border p-2">
                {editTaskId === task.id ? (
                  <input
                    className="border p-1 rounded w-full"
                    value={editedTask.description ?? task.description}
                    onChange={(e) => handleEditChange('description', e.target.value)}
                    onBlur={() => saveTaskEdit(task.id)}
                  />
                ) : (
                  <span
                    onClick={() => {
                      setEditTaskId(task.id)
                      setEditedTask(task)
                    }}
                    className="cursor-pointer hover:underline"
                  >
                    {task.description}
                  </span>
                )}
              </td>
              <td
                className="border p-2 text-blue-600 cursor-pointer hover:underline"
                onClick={() => {
                  setSelectedClient(task.client)
                  setShowClientModal(true)
                }}
              >
                {task.client}
              </td>
              <td className="border p-2">{task.date}</td>
              <td className="border p-2">
                {editTaskId === task.id ? (
                  <input
                    type="date"
                    className="border p-1 rounded"
                    value={editedTask.dueDate ?? task.dueDate ?? ''}
                    onChange={(e) => handleEditChange('dueDate', e.target.value)}
                    onBlur={() => saveTaskEdit(task.id)}
                  />
                ) : (
                  <span
                    onClick={() => {
                      setEditTaskId(task.id)
                      setEditedTask(task)
                    }}
                    className="cursor-pointer hover:underline"
                  >
                    {task.dueDate || '-'}
                  </span>
                )}
              </td>
              <td className="border p-2">{task.billable ? 'Yes' : 'No'}</td>
              <td className="border p-2 text-center space-y-1">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                  title="Delete Task"
                >
                  🗑️
                </button>

                {task.attachmentName && (
                  <div>
                    <a
                      href={`/attachments/${task.attachmentName}`}
                      download
                      className="text-blue-600 hover:underline text-xs block"
                      title="Download Attachment"
                    >
                      ⬇ Attachment
                    </a>
                  </div>
                )}

                {task.voiceNote && (
                  <div>
                    <a
                      href={`/voice/${task.voiceNote}`}
                      download
                      className="text-blue-600 hover:underline text-xs block"
                      title="Download Voice Note"
                    >
                      🎧 Voice
                    </a>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-4 items-center text-sm">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            ◀ Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            Next ▶
          </button>
        </div>
      )}

      {showClientModal && selectedClient && (
        <ClientProfileModal
          client={selectedClient}
          tasks={tasks}
          onClose={() => setShowClientModal(false)}
        />
      )}
    </div>
  )
}

export default TaskList
