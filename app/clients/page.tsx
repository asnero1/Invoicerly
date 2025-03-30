'use client';

import React from 'react';
import TaskLogger from '../components/TaskLogger';
import TaskList from '../components/TaskList';
import InvoiceGenerator from '../components/InvoiceGenerator';

export default function ClientsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <TaskLogger />
        <TaskList />
        <InvoiceGenerator />
      </div>
    </div>
  );
}
