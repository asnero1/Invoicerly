'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: 'How do I log a new task?',
    a: 'Go to the Task page and fill out the form with your task details, including client, description, date, and attachments.',
  },
  {
    q: 'Can I attach voice notes or receipts?',
    a: 'Yes! Upload .mp3 or .wav files for voice and any common image/pdf file for attachments.',
  },
  {
    q: 'How do I create an invoice?',
    a: 'Go to Generate Invoice, select your client and billable tasks, and download or send the invoice instantly.',
  },
  {
    q: 'Where can I find tasks I forgot to bill?',
    a: 'Use the PayMe or Task List page filters to see unpaid or billable items.',
  },
];

export default function HelpPage() {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState('');

  const filteredFaqs = faqs.filter((f) =>
    f.q.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!email || !message) return;
    setSubmitting(true);
    // Simulated delay for now
    setTimeout(() => {
      setResponse('✅ Your question has been submitted!');
      setSubmitting(false);
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-3xl font-bold">🆘 Help & FAQ</h1>

      <Input
        placeholder="Search help topics..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <motion.div
        layout
        className="space-y-4 border-t pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {filteredFaqs.length === 0 && (
          <p className="text-gray-500">No matching help topics found.</p>
        )}
        {filteredFaqs.map((faq, idx) => (
          <div key={idx} className="bg-white shadow p-4 rounded-lg">
            <h2 className="font-semibold">❓ {faq.q}</h2>
            <p className="text-sm text-gray-700 mt-1">{faq.a}</p>
          </div>
        ))}
      </motion.div>

      <div className="pt-8 space-y-2">
        <h2 className="text-xl font-bold">📨 Still stuck?</h2>
        <p className="text-sm text-gray-600">Send us your question and we’ll get back to you:</p>
        <Input
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Textarea
          rows={4}
          placeholder="Your question or issue..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={submitting || !email || !message}>
          {submitting ? 'Sending...' : 'Submit Question'}
        </Button>
        {response && <p className="text-green-600 text-sm mt-2">{response}</p>}
      </div>
    </div>
  );
}
