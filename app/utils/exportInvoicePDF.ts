'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';

type Task = {
  title?: string;
  description?: string;
  amount?: number;
};

export async function exportInvoicePDF(
  client: string,
  tasks: Task[],
  options: {
    clientEmail?: string;
    status?: 'PAID' | 'DUE';
    paymentMethod?: string;
    paymentLink?: string;
    abn?: string;
    taxRate?: number; // e.g. 0.1 for 10%
    currencySymbol?: string; // e.g. '$'
  } = {}
): Promise<{ invoiceUrl: string; fileName: string }> {
  const {
    clientEmail = 'unknown@client.com',
    status = 'DUE',
    paymentMethod = 'Bank Transfer',
    paymentLink,
    abn = 'ABN 00 000 000 000',
    taxRate = 0.1,
    currencySymbol = '$',
  } = options;

  const doc = new jsPDF();

  // ✅ 1. Logo (if exists in /public)
  try {
    const logoRes = await fetch('/logo-placeholder.png');
    const logoBlob = await logoRes.blob();
    const reader = new FileReader();
    const logoBase64: string = await new Promise((resolve, reject) => {
      reader.onloadend = () => {
        if (typeof reader.result === 'string') resolve(reader.result);
        else reject('Failed to convert logo');
      };
      reader.readAsDataURL(logoBlob);
    });
    doc.addImage(logoBase64, 'PNG', 14, 10, 40, 20);
  } catch {
    console.warn('Logo not found. Skipping.');
  }

  // ✅ 2. Title
  doc.setFontSize(18);
  doc.text(`Invoice for ${client}`, 14, 40);

  // ✅ 3. Watermark
  doc.setTextColor(240);
  doc.setFontSize(60);
  doc.text('INVOICERLY', 35, 120, { angle: 45 });
  doc.setTextColor(0);

  // ✅ 4. Line-item table
  const tableData = tasks.map((task, i) => [
    i + 1,
    `${task.title || ''}\n${task.description || ''}`,
    `${currencySymbol}${(task.amount ?? 0).toFixed(2)}`,
  ]);

  autoTable(doc, {
    head: [['#', 'Task', 'Amount']],
    body: tableData,
    startY: 50,
  });

  const subtotal = tasks.reduce((sum, task) => sum + (task.amount || 0), 0);
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;
  const finalY = (doc as any).lastAutoTable.finalY || 80;

  // ✅ 5. Totals and ABN
  doc.setFontSize(12);
  doc.text(`ABN: ${abn}`, 14, finalY + 10);
  doc.text(`Subtotal: ${currencySymbol}${subtotal.toFixed(2)}`, 14, finalY + 20);
  doc.text(`Tax (${(taxRate * 100).toFixed(0)}%): ${currencySymbol}${taxAmount.toFixed(2)}`, 14, finalY + 30);
  doc.setFontSize(14);
  doc.text(`Total: ${currencySymbol}${total.toFixed(2)}`, 14, finalY + 45);

  // ✅ 6. Footer info
  doc.setFontSize(10);
  doc.text(`Client Email: ${clientEmail}`, 14, finalY + 60);
  doc.text(`Payment Status: ${status}`, 14, finalY + 67);
  doc.text(`Payment Method: ${paymentMethod}`, 14, finalY + 74);

  // ✅ 7. QR Code
  if (paymentLink) {
    const qr = await QRCode.toDataURL(paymentLink);
    doc.addImage(qr, 'PNG', 150, finalY + 45, 40, 40);
  }

  // ✅ 8. Filename
  const safeClient = client.toLowerCase().replace(/\s+/g, '-');
  const timestamp = Date.now();
  const fileName = `invoice-${safeClient}-${timestamp}.pdf`;

  // ✅ 9. Output
  const blob = doc.output('blob');
  const invoiceUrl = URL.createObjectURL(blob);

  return { invoiceUrl, fileName };
}
