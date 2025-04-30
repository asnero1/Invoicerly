'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Image from 'next/image';
import SendMessageModal from '@/components/SendMessageModal';

interface Message {
  id?: string;
  from: string;
  to: string;
  subject?: string;
  body?: string;
  message?: string;
  date?: string;
  timestamp?: string;
  read?: boolean;
  fromAvatar?: string;
  replies?: Reply[];
  source?: string;
}

interface Reply {
  id?: string;
  messageId?: string;
  text?: string;
  fileUrl?: string;
  date?: string;
  from?: string;
}

interface User {
  userId: string;
  name: string;
  email: string;
  avatar: string;
}

export default function UserInboxPage() {
  const { userid } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [recipient, setRecipient] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<'All' | 'WhatsApp Only' | 'App Only'>('All');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [fileInputs, setFileInputs] = useState<Record<string, File | null>>({});

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch('/data/messages.json')
      .then((res) => res.json())
      .then((data: Message[]) => {
        const userMessages = data.filter(
          (msg) => msg.to === userid || msg.from === userid
        );
        setMessages(userMessages);
      })
      .catch(() => toast.error('Failed to load messages'));
  }, [userid]);

  useEffect(() => {
    fetch('/data/users.json')
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
        const found = data.find((u) => u.userId === userid);
        if (found) setRecipient(found);
        else toast.error('Recipient not found');
      })
      .catch(() => toast.error('Failed to load user info'));
  }, [userid]);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = messages.filter((msg) => {
      const matchSearch =
        msg.message?.toLowerCase().includes(lowerSearch) ||
        msg.subject?.toLowerCase().includes(lowerSearch) ||
        msg.body?.toLowerCase().includes(lowerSearch);

      const matchSource =
        selectedSource === 'All' ||
        (selectedSource === 'WhatsApp Only' && msg.source === 'whatsapp') ||
        (selectedSource === 'App Only' && msg.source !== 'whatsapp');

      const matchUnread = !showUnreadOnly || msg.read === false;

      return matchSearch && matchSource && matchUnread;
    });

    setFilteredMessages(filtered);
  }, [searchTerm, selectedSource, showUnreadOnly, messages]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredMessages]);

  const handleReplyChange = (id: string, value: string) => {
    setReplyInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (id: string, file: File | null) => {
    setFileInputs((prev) => ({ ...prev, [id]: file }));
  };

  const handleSendReply = (msgId: string) => {
    const replyText = replyInputs[msgId]?.trim();
    const file = fileInputs[msgId];

    if (!replyText && !file) return;

    const newReply: Reply = {
      id: `${msgId}-${Date.now()}`,
      messageId: msgId,
      text: replyText || '',
      fileUrl: file ? `/mock-uploads/${file.name}` : undefined,
      date: new Date().toLocaleString(),
      from: 'You',
    };

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === msgId
          ? { ...msg, replies: [...(msg.replies || []), newReply] }
          : msg
      )
    );

    setReplyInputs((prev) => ({ ...prev, [msgId]: '' }));
    setFileInputs((prev) => ({ ...prev, [msgId]: null }));
    toast.success('Reply sent (mocked)');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Input
          type="text"
          placeholder="Search messages"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
        <select
          value={selectedSource}
          onChange={(e) =>
            setSelectedSource(e.target.value as 'All' | 'WhatsApp Only' | 'App Only')
          }
          className="border p-2 rounded"
        >
          <option>All</option>
          <option>WhatsApp Only</option>
          <option>App Only</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(e) => setShowUnreadOnly(e.target.checked)}
          />
          Unread Only
        </label>
      </div>

      {filteredMessages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`border rounded-lg p-4 shadow-sm ${
                msg.read ? 'bg-white' : 'bg-yellow-50'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {msg.fromAvatar && (
                    <Image
                      src={msg.fromAvatar}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{msg.from}</p>
                    <p className="text-sm text-gray-500">{msg.date}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                  {msg.source === 'whatsapp' ? 'WhatsApp' : 'App'}
                </span>
              </div>

              <div className="mt-3 text-sm text-gray-800">{msg.message}</div>

              {msg.replies && msg.replies.length > 0 && (
                <div className="mt-4 ml-4 pl-4 border-l-2 border-gray-200 space-y-3">
                  {msg.replies.map((reply, rIdx) => (
                    <div key={rIdx} className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-500 mb-1">
                        {reply.from ? `Reply from ${reply.from}` : 'Reply'}
                        {reply.date ? ` • ${reply.date}` : ''}
                      </p>
                      <p className="text-sm text-gray-700">{reply.text}</p>
                      {reply.fileUrl && (
                        <a
                          href={reply.fileUrl}
                          className="text-xs text-blue-600 underline mt-1 inline-block"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {reply.fileUrl.split('/').pop()}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 space-y-2">
                <textarea
                  value={replyInputs[msg.id || ''] || ''}
                  onChange={(e) => handleReplyChange(msg.id || '', e.target.value)}
                  rows={2}
                  placeholder="Type your reply..."
                  className="w-full border rounded p-2 text-sm"
                />
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(msg.id || '', e.target.files?.[0] || null)
                  }
                  className="text-sm"
                />
                <button
                  onClick={() => handleSendReply(msg.id || '')}
                  className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 mt-1"
                >
                  Send Reply
                </button>
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      {recipient && <SendMessageModal recipient={recipient} onClose={() => {}} />}
    </div>
  );
}
