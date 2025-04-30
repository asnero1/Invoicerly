// File: app/components/SmartSuggestions.tsx
'use client';

import { useEffect, useState } from 'react';

const suggestions = [
  '🧾 Tip: Log any task with “invoice”, and we’ll mark it billable.',
  '📅 Tip: Say “due Friday” in your task to auto-add a due date.',
  '📁 Tip: Use keywords like “health” or “creative” to auto-tag.',
  '🎙️ Tip: Use the Speak button to quickly voice log jobs on the go.',
  '🔔 Tip: Enable Smart Nudges in Settings to catch invoice requests from clients.'
];

export default function SmartSuggestions() {
  const [dismissed, setDismissed] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const local = localStorage.getItem('suggestionsDismissed');
    setDismissed(local === 'true');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % suggestions.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  if (dismissed) {
    return (
      <p
        onClick={() => {
          setDismissed(false);
          localStorage.setItem('suggestionsDismissed', 'false');
        }}
        className="text-xs text-gray-400 text-center cursor-pointer hover:underline"
      >
        Suggestions hidden. Tap to show.
      </p>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-30 p-3 bg-yellow-100 border border-yellow-300 rounded-xl shadow-md w-[90vw] md:w-auto max-w-md animate-fade-in">
      <div className="text-sm text-yellow-900 font-medium flex justify-between items-center gap-2">
        <span>{suggestions[current]}</span>
        <button
          onClick={() => {
            setDismissed(true);
            localStorage.setItem('suggestionsDismissed', 'true');
          }}
          className="text-xs text-yellow-700 hover:underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
