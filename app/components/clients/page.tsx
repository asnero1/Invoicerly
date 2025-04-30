'use client';

import React from 'react';
import TaskLogger from '../TaskLogger';
import TaskList from '../TaskList';
// Correct path
import InvoiceGenerator from '../InvoiceGenerator';

export default function ClientsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Task Logger Section */}
        <TaskLogger />

        {/* Task List Section */}
        <TaskList />

        {/* Invoice Generator Section */}
        <InvoiceGenerator />
      </div>
    </div>
  );
}
