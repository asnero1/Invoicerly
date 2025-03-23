export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-blue-500">✅ Tailwind CSS is Working!</h1>
      <p className="mt-4 text-gray-700 text-lg">Try modifying this text to test Tailwind.</p>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Click Me
      </button>
    </div>
  );
}
