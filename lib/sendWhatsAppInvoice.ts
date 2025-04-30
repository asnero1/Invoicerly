import axios from 'axios';
import fs from 'fs';
import path from 'path';

type SendWhatsAppInvoiceParams = {
  phoneNumber: string;
  fileName: string;
  message?: string;
};

export async function sendWhatsAppInvoice({
  phoneNumber,
  fileName,
  message,
}: SendWhatsAppInvoiceParams) {
  const filePath = path.join(process.cwd(), 'public/invoices', fileName);
  const fileData = fs.readFileSync(filePath);

  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN!;
  const mediaUrl = `https://invoicerly.com.au/invoices/${fileName}`; // Replace with live domain or ngrok for now

  const payload = new URLSearchParams({
    From: process.env.TWILIO_WHATSAPP_NUMBER || '',
    To: `whatsapp:${phoneNumber}`,
    Body: message || '📎 Here is your invoice.',
    MediaUrl: mediaUrl,
  });

  const response = await axios.post(
    `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
    payload,
    {
      auth: {
        username: twilioAccountSid,
        password: twilioAuthToken,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.data;
}
