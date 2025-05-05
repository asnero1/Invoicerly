'use client'

import React from 'react'
import ShareProfileButton from '@/components/ShareProfileButton'
import Link from 'next/link'

export default function DashboardPage() {
  console.log('✅ Dashboard Page Loaded')

  return (
    <div className="min-h-screen p-10 bg-gray-100 flex flex-col items-center justify-start space-y-8">
      <h1 className="text-4xl font-bold text-blue-600">
        🚀 Welcome to Your Dashboard
      </h1>

      <p className="text-gray-700 text-center max-w-xl">
        Share your Invoicerly profile with clients or referrers using the button
        below.
      </p>

      <ShareProfileButton username="marnie" />

      <div className="w-full max-w-md space-y-6 pt-10">
        <DashboardLink
          href="/generate"
          title="Generate Invoice"
          description="Create and send a new invoice in seconds."
        />
        <DashboardLink
          href="/inbox"
          title="Inbox"
          description="Check messages and client contacts."
        />
        <DashboardLink
          href="/find"
          title="Find Pros"
          description="Search and connect with other freelancers."
        />
        <DashboardLink
          href="/payme"
          title="PayMe"
          description="Track income and unpaid invoices."
        />
        <DashboardLink
          href="/payout"
          title="PayOut"
          description="Manage payees and export receipts"
        />
        <DashboardLink
          href="/ai-assistant"
          title="Smart Assist"
          description="Let AI help automate your tasks."
        />
      </div>
    </div>
  )
}

function DashboardLink({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <div>
      <Link href={href}>
        <a className="text-purple-700 font-bold text-lg hover:underline">
          {title}
        </a>
      </Link>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
