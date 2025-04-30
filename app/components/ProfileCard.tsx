'use client';

import React from 'react';

const fallbackAvatars = [
  '/avatars/avatar1.jpg',
  '/avatars/avatar2.jpg',
  '/avatars/avatar3.jpg',
  '/avatars/avatar4.jpg',
];

const ProfileCard: React.FC<{ user: any }> = ({ user }) => {
  const avatar = user.avatar || fallbackAvatars[Math.floor(Math.random() * fallbackAvatars.length)];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={user.userName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-lg">{user.userName}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
