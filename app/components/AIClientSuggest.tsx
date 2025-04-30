'use client';

import React, { useEffect, useState } from 'react';

interface Props {
  description: string;
  onClientSuggested: (client: string) => void;
}

const AIClientSuggest: React.FC<Props> = ({ description, onClientSuggested }) => {
  const [suggestedClient, setSuggestedClient] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClientSuggestion = async () => {
      if (!description.trim()) return;
      setLoading(true);
      try {
        const res = await fetch('/api/ask-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: `Suggest the most likely client for this task description: "${description}"` }),
        });
        const data = await res.json();
        const client = data.result.trim();
        setSuggestedClient(client);
        onClientSuggested(client);
      } catch (err) {
        console.error('AI client suggestion failed', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientSuggestion();
  }, [description, onClientSuggested]);

  if (!suggestedClient || loading) return null;

  return (
    <p className="text-sm text-blue-600 mt-1">
      💡 Suggested client: <strong>{suggestedClient}</strong>
    </p>
  );
};

export default AIClientSuggest;
