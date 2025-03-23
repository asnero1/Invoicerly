'use client';
import { useEffect, useState } from 'react';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch('/api/fetch-tasks');
      const data = await res.json();
      setTasks(data.tasks);
    }
    fetchTasks();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h2 className="text-xl font-bold mb-2">Logged Tasks</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border p-2">Description</th>
            <th className="border p-2">Client</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Billable</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="text-center hover:bg-gray-100">
              <td className="border p-2">{task.description}</td>
              <td className="border p-2">{task.client}</td>
              <td className="border p-2">{task.date}</td>
              <td className="border p-2">{task.billable ? '✅ Yes' : '❌ No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
