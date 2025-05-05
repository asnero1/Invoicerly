'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ReadyToTapModal({
  visible,
  amount,
  onSuccess,
}: {
  visible: boolean
  amount: number
  onSuccess: () => void
}) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onSuccess()
      }, 3000) // Simulate 3s delay
      return () => clearTimeout(timer)
    }
  }, [visible, onSuccess])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow-lg text-center space-y-3"
      >
        <p className="text-lg font-semibold">📡 Ready to Tap</p>
        <p className="text-sm text-gray-500">
          Awaiting contactless payment for:
        </p>
        <p className="text-2xl font-bold text-green-700">
          ${amount.toFixed(2)}
        </p>
        <p className="text-sm text-gray-400">
          Hold card or phone near your device...
        </p>
      </motion.div>
    </div>
  )
}
