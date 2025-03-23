'use client'; // ✅ This tells Next.js to treat it as a Client Component

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md sticky top-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-300">
          Invoicerly
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden block text-white focus:outline-none"
        >
          {isOpen ? '✖' : '☰'} {/* Shows X when open, ☰ when closed */}
        </button>

        {/* Links - Shown Horizontally on Desktop, Dropdown on Mobile */}
        <div
          className={`md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <Link href="/dashboard" className="block px-4 py-2 md:py-0 hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/invoices" className="block px-4 py-2 md:py-0 hover:text-gray-300">
            Invoices
          </Link>
          <Link href="/clients" className="block px-4 py-2 md:py-0 hover:text-gray-300">
            Clients
          </Link>
        </div>
      </div>
    </nav>
  );
}
