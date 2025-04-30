// ✅ FILE: app/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import TapToPayToggle from '@/components/TapToPayToggle';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [tapToPayEnabled, setTapToPayEnabled] = useState(false);

  useEffect(() => {
    const storedSetting = localStorage.getItem('tapToPay');
    setTapToPayEnabled(storedSetting === 'true');
  }, []);

  const handleToggle = (enabled: boolean) => {
    setTapToPayEnabled(enabled);
    localStorage.setItem('tapToPay', String(enabled));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">👤 My Profile</h1>

      <div className="space-y-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Tap to Pay Settings</h2>
          <TapToPayToggle enabled={tapToPayEnabled} onToggle={handleToggle} />
          <p className="text-sm text-gray-600 mt-1">
            When enabled, your phone will act as a tap-to-pay terminal for receiving payments directly after a job.
          </p>
        </div>
      </div>
    </div>
  );
}
