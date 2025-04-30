'use client';

import { useEffect, useState } from 'react';

export default function PayYouList({ refreshSignal }: { refreshSignal: number }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch('/api/payyou?userId=demo-user-id');
      const data = await res.json();
      setItems(data);
    }

    fetchItems();
  }, [refreshSignal]);

  async function handleDelete(id: string) {
    await fetch('/api/payyou', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    setItems((prev) => prev.filter((item: any) => item.id !== id));
  }

  return (
    <div className="space-y-2 mt-4">
      {items.map((item: any) => (
        <div key={item.id} className="border p-4 rounded-md bg-gray-50 flex justify-between">
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p>${item.amount} – Due: {new Date(item.dueDate).toLocaleDateString()}</p>
            {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
          </div>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
