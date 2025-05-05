// ✅ FILE: /app/api/me/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const email =
    (typeof localStorage !== 'undefined' &&
      localStorage.getItem('userEmail')) ||
    null

  return NextResponse.json({
    status: 'ok',
    user: email,
  })
}
