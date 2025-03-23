import './globals.css'; // ✅ Make sure Tailwind is imported globally
import Navbar from '@components/Navbar'; // ✅ Ensure this path is correct

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Invoicerly</title>
      </head>
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
