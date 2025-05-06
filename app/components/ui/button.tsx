'use client'

import React from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

export const Button = ({
  children,
  variant = 'default',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyle = 'px-4 py-2 rounded transition font-semibold'

  const variantStyles: Record<string, string> = {
    default: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-black text-black hover:bg-gray-100',
  }

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant] || ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

