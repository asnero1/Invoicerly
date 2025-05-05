// ✅ FILE: /lib/authConfig.ts

// This file sets the secret invite-only flag for MVP

export const authConfig = {
  inviteOnly: false, // set to false to disable invite gating later
  allowedEmails: [
    'antonio@example.com',
    'vincent@example.com',
    'rocco@example.com',
    'marnie@example.com',
    'asnero@hotmail.com', // ✅ <- Add your real email here
  ],
  inviteCodes: ['INVOICERLY2024', 'TEST123'], // ✅ for Phase 2
}
