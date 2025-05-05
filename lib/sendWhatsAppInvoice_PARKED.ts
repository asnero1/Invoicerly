import twilio from 'twilio'
import path from 'path'

const accountSid = process.env.TWILIO_ACCOUNT_SID!
const authToken = process.env.TWILIO_AUTH_TOKEN!
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER!

const client = twilio(accountSid, authToken)

export default async function sendWhatsAppInvoice({
  phoneNumber,
  fileName,
  message,
}: {
  phoneNumber: string
  fileName: string
  message?: string
}) {
  const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/invoices/${fileName}`

  await client.messages.create({
    from: `whatsapp:${fromNumber}`,
    to: `whatsapp:${phoneNumber}`,
    body: message || 'Here is your invoice:',
    mediaUrl: [fileUrl],
  })
}
