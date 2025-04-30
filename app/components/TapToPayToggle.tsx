'use client';

import React from 'react';

interface TapToPayToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function TapToPayToggle({ enabled, onToggle }: TapToPayToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="inline-flex items-center cursor-pointer">
        <span className="mr-2">Tap to Pay</span>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          onChange={(e) => onToggle(e.target.checked)}
        />
        <div
          className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full
            peer peer-checked:bg-purple-600 relative transition-all"
        >
          <span
            className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform 
              peer-checked:translate-x-5 transition"
          />
        </div>
      </label>
    </div>
  );
}
