export default async function sendWhatsAppInvoice({
  phoneNumber,
  fileName,
}: {
  phoneNumber: string;
  fileName: string;
}) {
  console.log(`Pretend-sending WhatsApp invoice ${fileName} to ${phoneNumber}`);
  return true;
}
