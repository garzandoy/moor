import Link from "next/link";

// Optional but good for mobile rendering
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Pashto Learning App",
  description: "Learn Pashto with lessons and alphabets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        {/* Top bar (mobile) */}
        <header className="md:hidden bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold">Puhanah</Link>
            <details className="relative">
              <summary className="list-none cursor-pointer border rounded px-3 py-1.5 text-sm hover:bg-gray-50">
                Menu
              </summary>
              <nav className="absolute right-0 mt-2 w-48 bg-white rounded border shadow-sm p-2 space-y-1 z-10">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/dashboard/lessons">Lessons</NavItem>
                <NavItem href="/dashboard/alphabets">Alphabets</NavItem>
                <NavItem href="/dashboard/profile">Profile</NavItem>
              </nav>
            </details>
          </div>
        </header>

        <div className="mx-auto max-w-7xl p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left sidebar (hidden on mobile, shown on md+) */}
          <aside className="hidden md:block md:col-span-3 bg-white shadow rounded p-3">
            <nav className="space-y-2">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/dashboard/lessons">Lessons</NavItem>
              <NavItem href="/dashboard/alphabets">Alphabets</NavItem>
              <NavItem href="/dashboard/profile">Profile</NavItem>
            </nav>
          </aside>

          {/* Main content */}
          <main className="md:col-span-6 bg-white shadow rounded p-4 overflow-y-auto">
            {children}
            {/* Tips below content on mobile */}
            <div className="md:hidden mt-4 border-t pt-4">
              <h2 className="text-lg font-semibold">Tips</h2>
              <ul className="list-disc list-inside text-sm">
                <li>Use the Menu above to navigate</li>
                <li>Tap Start on any lesson</li>
              </ul>
            </div>
          </main>

          {/* Right sidebar (hide on mobile) */}
          <aside className="hidden md:block md:col-span-3 bg-white shadow rounded p-3">
            <h2 className="text-lg font-semibold">Tips</h2>
            <ul className="list-disc list-inside text-sm">
              <li>Click links on the left to load content</li>
            </ul>
          </aside>
        </div>
      </body>
    </html>
  );
}

function NavItem({ href, children }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded hover:bg-gray-100 text-sm"
    >
      {children}
    </Link>
  );
}