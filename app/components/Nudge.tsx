// ✅ FILE: app/components/Nudge.tsx
'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const onboardingNudge = {
  text: '🆘 I’m your helper! Tap me anytime for support.',
  route: '/help',
}

const routineMessages = [
  { text: '🧠 Don’t forget to invoice Marnie!', route: '/generate-invoice' },
  { text: '⏳ You have unbilled tasks!', route: '/task' },
  { text: '💸 You were just paid. Log more work?', route: '/task' },
  { text: '📸 Snap your receipts while it’s fresh!', route: '/task' },
]

export default function Nudge() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  const [onboarding, setOnboarding] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const dismissed = localStorage.getItem('nudgeDismissed')
    const seen = localStorage.getItem('seenOnboardingNudge')

    if (!dismissed) {
      if (!seen) {
        setOnboarding(true)
        localStorage.setItem('seenOnboardingNudge', 'true')
      }
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    if (expanded) {
      const timer = setTimeout(() => setExpanded(false), 6000)
      return () => clearTimeout(timer)
    }
  }, [expanded])

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % routineMessages.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  const activeMessage = onboarding
    ? onboardingNudge
    : routineMessages[messageIndex]

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ease-in-out transform 
        ${expanded ? 'w-72 scale-100' : 'w-14 scale-95'} h-14 bg-purple-700 text-white rounded-full shadow-lg flex items-center overflow-hidden cursor-pointer hover:scale-105`}
      onClick={() => {
        router.push(activeMessage.route)
        localStorage.setItem('nudgeDismissed', 'true')
        setVisible(false)
      }}
    >
      <div className="flex items-center px-4">
        <span className="text-sm font-medium">
          {expanded && activeMessage.text}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          localStorage.setItem('nudgeDismissed', 'true')
          setVisible(false)
        }}
        className="ml-auto px-3 text-white hover:text-red-300"
      >
        <X size={16} />
      </button>
    </div>
  )
}
