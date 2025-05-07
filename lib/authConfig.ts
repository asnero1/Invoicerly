// âœ… FILE: /lib/authConfig.ts

// This file sets the secret invite-only flag for MVP

export const authConfig = {
  inviteOnly: false, // set to false to disable invite gating later
  allowedEmails: [
    'antonio@example.com',
    'vincent@example.com',
    'rocco@example.com',
    'marnie@example.com',
    'asnero@hotmail.com', // âœ… <- Add your real email here
  ],
  inviteCodes: ['INVOICERLY2024', 'TEST123'], // âœ… for Phase 2
}

