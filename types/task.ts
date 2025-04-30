export type Task = {
  id: string;
  description: string;
  client: string;
  date: string;
  billable: boolean;
  dueDate?: string; // ✅ Add this line
  priority?: string;
  voiceNote?: string;
  attachment?: string;
};
