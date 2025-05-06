import React from 'react'

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
    {...props}
  />
)

