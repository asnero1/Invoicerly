// ✅ FILE: app/layout.tsx (Framer polish + responsiveness + transitions)
'use client';

import './globals.css';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import Navbar from './components/Navbar';
import { Toaster } from 'sonner';
import Nudge from './components/Nudge';
import { AnimatePresence, motion } from 'framer-motion';
import { authConfig } from '../lib/authConfig';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!authConfig.inviteOnly) return;
    if (pathname.startsWith('/login')) return;

    const isAllowed = authConfig.allowedEmails.includes(email || '');
    const isInvited = authConfig.inviteCodes.includes(email || '');

    if (!email || (!isAllowed && !isInvited)) {
      router.push('/login');
    }
  }, [pathname]);

  const showNudge =
    pathname !== '/generate-invoice' &&
    pathname !== '/inbox' &&
    pathname !== '/settings';

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <SessionProvider>
          <Navbar />
          <Toaster position="top-center" />
          {showNudge && <Nudge />}

          {/* Smooth page transitions */}
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="px-4 sm:px-6 lg:px-8 pt-4 pb-10"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </SessionProvider>
      </body>
    </html>
  );
}
