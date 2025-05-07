// âœ… FILE: app/components/MainWrapper.tsx
'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Toaster } from 'sonner'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import Nudge from './Nudge'

export default function MainWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const showNudge =
    pathname !== '/generate-invoice' &&
    pathname !== '/inbox' &&
    pathname !== '/settings'

  return (
    <SessionProvider>
      <Navbar />
      <Toaster position="top-center" />
      {showNudge && <Nudge />}

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl mx-auto px-4 py-8"
        >
          {/* Optional header text */}
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold text-indigo-700 tracking-tight">
              Poni
            </h1>
          </div>
          {children}
        </motion.main>
      </AnimatePresence>
    </SessionProvider>
  )
}

