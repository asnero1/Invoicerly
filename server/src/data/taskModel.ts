import mongoose, { Schema, Document } from 'mongoose';

// Interface for better TypeScript support
export interface ITask extends Document {
  description: string;
  createdAt: Date;
  voiceLogUrl?: string;
  attachments?: string[];
  dueDate?: Date;
  reminder?: Date;
}

const TaskSchema: Schema = new Schema<ITask>({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  voiceLogUrl: {
    type: String,
    required: false,
  },
  attachments: {
    type: [String], // Array of file URLs or paths
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  reminder: {
    type: Date,
    required: false,
  },
});

// Use existing model if already compiled to avoid overwrite errors
const TaskModel = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default TaskModel;
