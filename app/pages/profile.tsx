'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileCard from '../components/ProfileCard'; // Fixed the import path
import SettingsForm from '../components/SettingsForm'; // Fixed the import path

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser) {
      setUser(storedUser);
    } else {
      router.push('/login'); // Redirect if not logged in
    }
  }, []);

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      {user ? (
        <div className="space-y-8">
          <ProfileCard user={user} />
          <SettingsForm user={user} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
