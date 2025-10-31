import Link from "next/link";

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
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 w-full px-4 py-4">
          
          {/* Sidebar */}
          <aside className="hidden md:flex md:flex-col md:col-span-2 bg-white shadow rounded-lg p-4 space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-green-600 font-bold text-white">
                P
              </div>
              <span className="font-semibold text-lg">Puhana</span>
            </Link>

            {/* Navigation */}
            <nav className="space-y-3">
              <NavItem href="/dashboard/lessons">📘 Learn</NavItem>
              <NavItem href="/dashboard/alphabets">🔡 Alphabets</NavItem>
              <NavItem href="/dashboard/profile">👤 Profile</NavItem>
              <NavItem href="/dashboard/quests">🏆 Leaderboard</NavItem>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-7 bg-white shadow rounded-lg p-6 overflow-y-auto">
            {children}
          </main>

          {/* Right Section */}
          <aside className="hidden md:flex md:flex-col md:col-span-3 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h2 className="font-semibold text-lg mb-2 text-gray-800">
                Unlock Leaderboards!
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Complete 10 more lessons to start competing.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h2 className="font-semibold text-lg mb-3 text-gray-800">
                Save Your Progress
              </h2>
              <button className="w-full bg-green-600 py-2 rounded-md font-semibold text-white hover:bg-green-700">
                Create a Profile
              </button>
              <button className="w-full mt-2 bg-gray-200 py-2 rounded-md font-semibold text-gray-700 hover:bg-gray-300">
                Sign In
              </button>
            </div>
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