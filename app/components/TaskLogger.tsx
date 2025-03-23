'use client';
import { useState } from 'react';

export default function TaskLogger() {
  const [task, setTask] = useState({
    description: '',
    client: '',
    date: new Date().toISOString().split('T')[0], // Default to today
    billable: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setTask({ ...task, billable: !task.billable });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/log-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (res.ok) {
      alert('Task logged successfully!');
      setTask({
        description: '',
        client: '',
        date: new Date().toISOString().split('T')[0],
        billable: false,
      });
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Log a Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full border p-2 mb-2"
          type="text"
          name="description"
          placeholder="Task description"
          value={task.description}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2 mb-2"
          type="text"
          name="client"
          placeholder="Client name"
          value={task.client}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2 mb-2"
          type="date"
          name="date"
          value={task.date}
          onChange={handleChange}
        />
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={task.billable} onChange={handleCheckboxChange} />
          <span>Billable</span>
        </label>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" type="submit">
          Log Task
        </button>
      </form>
    </div>
  );
}
