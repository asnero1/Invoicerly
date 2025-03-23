import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    clientName: String,
    amount: Number,
    status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
    dueDate: Date,
  },
  { timestamps: true },
);

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
