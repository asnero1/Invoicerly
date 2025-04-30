// ✅ FILE: app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('nudgeDismissed');
    if (!dismissed) {
      setShowDot(true);
    }
  }, []);

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/task', label: 'Tasks' },
    { href: '/generate-invoice', label: 'Invoices' },
    { href: '/payme', label: 'Pay Me' },
    { href: '/payout', label: '💸 PayOut' },
    { href: '/look', label: 'Look' },
    { href: '/find', label: 'Find' },
    { href: '/inbox', label: 'Inbox' },
    { href: '/profile', label: 'Profile' },
    {
      href: '/help',
      label: (
        <span className="relative">
          Help
          {showDot && (
            <span className="absolute -top-2 -right-3 bg-red-500 rounded-full w-2.5 h-2.5" />
          )}
        </span>
      ),
    },
  ];

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-purple-700">Invoicerly</h1>
      <ul className="flex space-x-6 text-sm">
        {links.map((link) => (
          <li key={typeof link.label === 'string' ? link.label : link.href}>
            <Link
              href={link.href}
              className={`hover:underline ${
                pathname === link.href ? 'text-purple-700 font-semibold' : 'text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
