// âœ… FILE: app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import MainWrapper from './components/MainWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Poni - Voice Task Output Engine',
  description: 'Powered by VTO - the Voice Task Output Engine. Speak. Log. Invoice. Done.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  )
}

