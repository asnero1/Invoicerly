import twilio from 'twilio';
import path from 'path';
import fs from 'fs';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER!;

const client = twilio(accountSid, authToken);

export default async function sendWhatsAppInvoice({
  phoneNumber,
  fileName,
}: {
  phoneNumber: string;
  fileName: string;
}) {
  try {
    const filePath = path.join(process.cwd(), 'public/invoices', fileName);
    const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/invoices/${fileName}`;

    await client.messages.create({
      from: `whatsapp:${fromNumber}`,
      to: `whatsapp:${phoneNumber}`,
      body: `Here is your invoice: ${fileUrl}`,
    });

    console.log(`✅ WhatsApp invoice sent to ${phoneNumber}`);
    return true;
  } catch (err) {
    console.error('❌ WhatsApp send failed:', err);
    throw err;
  }
}
