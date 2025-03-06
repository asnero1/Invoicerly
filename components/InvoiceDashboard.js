import { useState } from "react";
import { format } from "date-fns";

const mockInvoices = [
  { id: "INV-001", client: "John Doe", amount: 1000, status: "Paid", date: "2024-02-01" },
  { id: "INV-002", client: "Acme Corp", amount: 1500, status: "Unpaid", date: "2024-02-10" }
];

export default function InvoiceDashboard() {
  const [invoices, setInvoices] = useState(mockInvoices);

  return (
    <div>
      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Client</th><th>Amount</th><th>Status</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.client}</td>
              <td>${invoice.amount}</td>
              <td>{invoice.status}</td>
              <td>{format(new Date(invoice.date), "MMM dd, yyyy")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
