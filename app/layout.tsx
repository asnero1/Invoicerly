'use client'

import './globals.css' // Tailwind global styles
import Navbar from './components/Navbar' // ✅ Correct path for same directory level
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Invoicerly</title>
      </head>
      <body className="bg-gray-100 text-gray-900">
        {/* 🔥 Global Toaster */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '8px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  )
}
