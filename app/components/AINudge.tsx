'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AINudge() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000); // Delay for effect
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-xl mb-6">
      <p className="flex items-center justify-between gap-4">
        🧠 Need help generating an invoice or summarizing your day?
        <button
          onClick={() => {
            const el = document.getElementById('ai-assistant');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else router.push('/#ai-assistant');
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          Open AI Assistant
        </button>
      </p>
    </div>
  );
}
