import Link from "next/link";
import BottomNav from "@/app/components/bottomNav";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Pashto Learning App",
  description: "Learn Pashto with lessons and alphabets",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
        {/* Top Header (visible on desktop, collapses on mobile) */}
        <header className="hidden md:block sticky top-0 z-50 border-b border-gray-200 bg-white/70 backdrop-blur">
          <div className="flex w-full items-center justify-between px-8 py-4">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-green-600 font-bold text-white">
                P
              </div>
              <span className="font-semibold text-lg">Puhana</span>
            </Link>

            {/* Middle: Nav */}
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
              <NavItem href="/dashboard/lessons">Lessons</NavItem>
              <NavItem href="/dashboard/alphabets">Alphabets</NavItem>
              <NavItem href="/dashboard/profile">Profile</NavItem>
            </nav>

            {/* Right: Auth */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Start
              </Link>
            </div>
          </div>
        </header>

        {/* Main Layout Grid */}
        <div className="flex-1 mx-auto max-w-7xl p-4 grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
          {/* Sidebar (desktop) */}
          <aside className="hidden md:block md:col-span-3 bg-white shadow rounded p-3">
            <nav className="space-y-2">
              <NavItem href="/dashboard/lessons">Lessons</NavItem>
              <NavItem href="/dashboard/alphabets">Alphabets</NavItem>
              <NavItem href="/dashboard/profile">Profile</NavItem>
            </nav>
          </aside>

          {/* Main content */}
          <main className="md:col-span-6 bg-white shadow rounded p-4 overflow-y-auto">
            {children}
          </main>

          {/* Right sidebar (desktop) */}
          <aside className="hidden md:block md:col-span-3 bg-white shadow rounded p-3">
            <h2 className="text-lg font-semibold">Tips</h2>
            <ul className="list-disc list-inside text-sm">
              <li>Click links on the left to load content</li>
            </ul>
          </aside>
        </div>

        {/* Bottom Navigation (mobile only) */}
        <BottomNav />
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