// ✅ FILE: /lib/session.ts

export function getCurrentUserEmail(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('userEmail')
}
