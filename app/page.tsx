'use client'

import React from 'react'
import TaskLogger from './components/TaskLogger'
import TaskList from './components/TaskList'
import InvoiceGenerator from './components/invoice/InvoiceGenerator'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-10 px-4">
      <div className="max-w-3xl w-full mx-auto space-y-8">
        {/* Task Logger Section */}
        <section className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Log a New Task</h2>
          <TaskLogger />
        </section>

        {/* Task List Section */}
        <section className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Task List</h2>
          <TaskList />
        </section>

        {/* Invoice Generator Section */}
        <section className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Generate Invoice</h2>
          <InvoiceGenerator />
        </section>
      </div>
    </main>
  )
}
