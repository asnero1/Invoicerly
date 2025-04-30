'use client';

import React, { useState } from 'react';

type Task = {
  description: string;
  client: string;
  date: string;
  billable: boolean;
  voiceNote?: string;
  attachment?: File;
  dueDate?: string;
  priority?: string;
  tags?: string[];
};

const TaskLogger: React.FC = () => {
  const [task, setTask] = useState<Task>({
    description: '',
    client: '',
    date: '',
    billable: false,
    voiceNote: '',
    attachment: undefined,
    dueDate: '',
    priority: 'Medium',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');

  // 📚 Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const files = (e.target as HTMLInputElement).files;

    if (type === 'checkbox') {
      setTask((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file' && files) {
      if (name === 'attachment') {
        setTask((prev) => ({ ...prev, [name]: files[0] }));
      } else if (name === 'voiceNote') {
        handleVoiceUpload(files[0]);
      }
    } else {
      setTask((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 🎙️ Handle Voice Upload
  const handleVoiceUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload-voice', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data?.url) {
        setTask((prev) => ({ ...prev, voiceNote: data.url }));
      }
    } catch (error) {
      console.error('❌ Voice upload failed:', error);
    }
  };

  // 🏷️ Handle Adding Tags
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      setTask((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  // ❌ Remove Tag
  const handleRemoveTag = (index: number) => {
    setTask((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || [],
    }));
  };

  // ✅ Handle Task Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('description', task.description || '');
      formData.append('client', task.client || '');
      formData.append('date', task.date || '');
      formData.append('billable', String(task.billable));
      formData.append('voiceNote', task.voiceNote || '');
      formData.append('dueDate', task.dueDate || '');
      formData.append('priority', task.priority || 'Medium');
      formData.append('tags', JSON.stringify(task.tags || []));
  
      // ✅ Upload the attachment if available
      if (task.attachment) {
        formData.append('attachment', task.attachment);
      }
  
      const response = await fetch('/api/log-task', {
        method: 'POST',
        body: formData,
      });
  
      if (response.status === 200) {
        alert('✅ Task saved successfully!');
        setTask({
          description: '',
          client: '',
          date: '',
          billable: false,
          voiceNote: '',
          attachment: undefined,
          dueDate: '',
          priority: 'Medium',
          tags: [],
        });
        window.dispatchEvent(new Event('task-added'));
      } else {
        alert('❌ Failed to save task.');
      }
    } catch (error) {
      console.error('❌ Submission failed:', error);
      alert('❌ Network error.');
    }
  };
  
  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h2 className="text-xl font-bold mb-2">Log a New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 📝 Task Description */}
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* 👥 Client Name */}
        <input
          type="text"
          name="client"
          placeholder="Client Name"
          value={task.client}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* 📅 Task Date */}
        <input
          type="date"
          name="date"
          value={task.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* 📆 Due Date */}
        <input
          type="date"
          name="dueDate"
          value={task.dueDate || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Due Date"
        />

        {/* 🏷️ Tags */}
        <div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tags (press Enter)"
            className="w-full border p-2 rounded"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {task.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm flex items-center space-x-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="text-red-500 ml-2"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 🎚️ Priority */}
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        {/* ✅ Billable Checkbox */}
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="billable" checked={task.billable} onChange={handleChange} />
          <span>Billable</span>
        </label>

        {/* 📎 Attachment */}
        <input type="file" name="attachment" onChange={handleChange} className="w-full" />

        {/* 🎙️ Voice Note Upload */}
        <label className="block mt-2">
          <span className="text-sm font-medium">Voice Note (MP3 or WAV)</span>
          <input
            type="file"
            name="voiceNote"
            accept=".mp3,.wav"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </label>

        {/* 🎧 Voice Note Preview */}
        {task.voiceNote && (
          <div className="text-sm text-gray-700 border p-2 rounded bg-gray-50">
            <strong>Voice Note:</strong>{' '}
            <a href={task.voiceNote} target="_blank" rel="noopener noreferrer">
              {task.voiceNote}
            </a>
          </div>
        )}

        {/* 🚀 Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Task
        </button>
      </form>
    </div>
  );
};

export default TaskLogger;
