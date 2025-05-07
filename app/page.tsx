// âœ… FILE: app/landing/page.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Poni</h1>
        <p className="text-xl font-semibold mb-2">
          Turn your voice into invoices.
        </p>
        <p className="mb-6 text-gray-700">
          Powered by VTO ï¿½" the Voice Task Output Engine. Speak. Log. Invoice.
          Done.
        </p>
        <Link
          href="/log-task"
          className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
        >
          Try It Now
        </Link>
        <div className="mt-10">
          <Image
            src="/images/phone-mockup.png"
            alt="Phone mockup"
            width={300}
            height={600}
            className="mx-auto rounded-xl shadow-md"
          />
        </div>
      </section>

      {/* Creator Spruke */}
      <section className="text-center py-12 bg-white">
        <h2 className="text-lg font-semibold mb-4">Creator Spruke</h2>
        <Image
          src="/images/creator-spruke.png"
          alt="Creator Spruke"
          width={200}
          height={200}
          className="mx-auto rounded-xl"
        />
        <p className="mt-2 text-sm text-gray-600">
          Logo Design for Jetset Digital
        </p>
        <p className="mt-1 text-sm">
          â¤ï¸ 2{' '}
          <Link
            href="#"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Contact this pro
          </Link>
        </p>
      </section>

      {/* Directory */}
      <section className="text-center py-12 px-4">
        <h3 className="text-xl font-semibold mb-2">
          Find trusted professionals
        </h3>
        <p className="mb-6 text-gray-700">
          Real creators, tradies, and freelancers using Poni
        </p>
        <Link
          href="/find"
          className="inline-block text-blue-600 underline hover:text-blue-800 text-sm mb-6"
        >
          Explore the Directory ï¿½'
        </Link>
        <div className="flex justify-center gap-6 mt-6 flex-wrap">
          {[
            { name: 'Jessica', role: 'Photographer' },
            { name: 'Maria', role: 'Carpenter' },
            { name: 'Colin', role: 'Trainer' },
          ].map((person) => (
            <div key={person.name} className="text-center">
              <Image
                src={`/images/${person.name.toLowerCase()}.jpg`}
                alt={person.name}
                width={80}
                height={80}
                className="rounded-full mx-auto"
              />
              <p className="mt-2 font-medium">{person.name}</p>
              <p className="text-sm text-gray-600">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VTO Explanation */}
      <section className="text-center py-12 bg-white px-4">
        <h3 className="text-xl font-semibold mb-4">What is VTO?</h3>
        <p className="text-gray-700 max-w-2xl mx-auto">
          VTO (Voice Task Output) is your invisible admin. Speak tasks out loud,
          and let Poni turn them into billable logs, summaries, and invoices ï¿½"
          instantly.
        </p>
        <div className="mt-6">
          <Image
            src="/images/vto-badge.png"
            alt="VTO badge"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="text-center py-12 px-4 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-6">Choose Your Plan</h3>

        <div className="grid sm:grid-cols-3 gap-8">
          {/* Free */}
          <div className="border p-6 rounded-xl bg-gray-100">
            <h4 className="font-bold mb-2">Free</h4>
            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li>â€¢ 10 tasks/month</li>
              <li>â€¢ Basic invoicing</li>
              <li>â€¢ No login needed</li>
            </ul>
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition">
              Start Free
            </button>
          </div>

          {/* Pro */}
          <div className="border p-6 rounded-xl bg-white shadow">
            <h4 className="font-bold mb-2">Pro</h4>
            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li>â€¢ Unlimited tasks</li>
              <li>â€¢ AI Assistant</li>
              <li>â€¢ Custom branding</li>
            </ul>
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition">
              Upgrade
            </button>
          </div>

          {/* Team */}
          <div className="border p-6 rounded-xl bg-gray-100">
            <h4 className="font-bold mb-2">Team</h4>
            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li>â€¢ All Pro features</li>
              <li>â€¢ Multiple users</li>
              <li>â€¢ Analytics & insights</li>
            </ul>
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition">
              Upgrade
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-8 text-gray-500">
        Â© {new Date().getFullYear()} Poni ï¿½" Voice Task Output Engine
      </footer>
    </main>
  )
}

