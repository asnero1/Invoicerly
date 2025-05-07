// âœ… FILE: app/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [showDot, setShowDot] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('nudgeDismissed')
    if (!dismissed) {
      setShowDot(true)
    }
  }, [])

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/task', label: 'Tasks' },
    { href: '/generate-invoice', label: 'Invoices' },
    { href: '/payme', label: 'Pay Me' },
    { href: '/payout', label: 'ðŸ’¸ PayOut' },
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
  ]

  return (
    <nav className="bg-white border-b shadow-sm px-4 py-3 flex justify-between items-center relative z-50">
      {/* Logo and Title */}
      <Link
        href="/"
        className="flex items-center gap-2 group hover:opacity-90 transition no-underline"
      >
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={28}
          height={28}
          className="transition-transform duration-200 group-hover:scale-105"
        />
        <span className="text-lg font-bold text-indigo-700 leading-none">
          Poni
        </span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-sm">
        {links.map((link) => (
          <li key={typeof link.label === 'string' ? link.label : link.href}>
            <Link
              href={link.href}
              className={`transition duration-200 border-b-2 pb-1 ${
                pathname === link.href
                  ? 'text-indigo-700 border-indigo-500'
                  : 'text-gray-700 border-transparent hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-600"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md md:hidden">
          <ul className="flex flex-col gap-4 p-4">
            {links.map((link) => (
              <li key={typeof link.label === 'string' ? link.label : link.href}>
                <Link
                  href={link.href}
                  className={`block w-full py-2 px-2 rounded transition ${
                    pathname === link.href
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
