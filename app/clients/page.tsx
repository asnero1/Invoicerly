'use client';

export default function ClientsPage() {
  const clients = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Acme Corp', email: 'contact@acme.com' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <table className="w-full border-collapse border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="text-center hover:bg-gray-100">
              <td className="border p-3">{client.name}</td>
              <td className="border p-3">{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
