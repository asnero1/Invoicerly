'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ResendInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  phoneNumber: string;
}

const ResendInvoiceModal: React.FC<ResendInvoiceModalProps> = ({ isOpen, onClose, fileName, phoneNumber }) => {
  const [viewed, setViewed] = useState(false);
  const [sending, setSending] = useState(false);

  const handleResend = async () => {
    if (!viewed) return;
    setSending(true);
    try {
      await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: phoneNumber, filename: fileName, message: "Here's your invoice from Antonio" }),
      });      
      onClose();
    } catch (error) {
      console.error('Error resending invoice:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative bg-white p-6 rounded-xl w-full max-w-3xl shadow-xl">
                <Dialog.Title className="text-xl font-bold mb-4">📄 Preview & Resend Invoice</Dialog.Title>
                <iframe
                  src={`/invoices/${fileName}`}
                  className="w-full h-96 border rounded-md"
                  onLoad={() => setViewed(true)}
                />
                <div className="mt-6 flex justify-end space-x-4">
                  <Button variant="secondary" onClick={onClose}>Cancel</Button>
                  <Button onClick={handleResend} disabled={!viewed || sending}>
                    {sending ? 'Resending...' : 'Resend via WhatsApp'}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ResendInvoiceModal;
