'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onMarkDone: (id: string) => void;
  onEdit: (id: string) => void;
  onSendWhatsApp: (task: Task) => void;
}

export default function TaskCard({ task, onMarkDone, onEdit, onSendWhatsApp }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md bg-white space-y-4"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{task.description}</h2>
          <p className="text-sm text-gray-500">📍 {task.client}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
        <p>📅 <strong>Logged:</strong> {task.date}</p>
        <p>⏰ <strong>Due:</strong> {task.dueDate || 'N/A'}</p>
        <p>💰 <strong>Amount:</strong> ${task.amount?.toFixed(2) || '0.00'}</p>
        <p>✅ <strong>Billable:</strong> {task.billable ? 'Yes' : 'No'}</p>
      </div>

      {task.attachment && (
        <p className="text-sm text-blue-600 underline">
          📎 <a href={task.attachment} target="_blank">Attachment</a>
        </p>
      )}

      {task.voiceNote && (
        <audio controls className="w-full">
          <source src={task.voiceNote} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <div className="flex flex-wrap gap-3 pt-4">
        <Button variant="secondary" onClick={() => onEdit(task.id)}>
          Edit
        </Button>
        <Button variant="default" onClick={() => onMarkDone(task.id)}>
          Mark Done
        </Button>
        <Button variant="outline" onClick={() => onSendWhatsApp(task)} className="text-green-600">
          <FaWhatsapp className="inline mr-2" /> WhatsApp Invoice
        </Button>
      </div>
    </motion.div>
  );
}
