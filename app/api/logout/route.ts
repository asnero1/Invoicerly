// ✅ FILE: /app/api/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('userEmail')
  }

  return NextResponse.json({ status: 'ok', message: 'Logged out successfully' })
}

