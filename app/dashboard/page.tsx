'use client';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Total Invoices</h2>
          <p className="text-3xl font-bold mt-2">$750</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Paid Invoices</h2>
          <p className="text-3xl font-bold mt-2">$250</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Pending Invoices</h2>
          <p className="text-3xl font-bold mt-2">$500</p>
        </div>
      </div>
    </div>
  );
}
