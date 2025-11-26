'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { LogOut, User, BookOpen, Trophy, Home, Settings, Grid } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Mobile Top Bar */}
      <header className="md:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-center sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-green-600 font-bold text-white">
            P
          </div>
          <span className="font-semibold text-lg">Puhana</span>
        </Link>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-4 w-full px-0 md:px-4 py-4 pb-20 md:pb-4">
        
        {/* Desktop Sidebar */}
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
            <NavItem href="/dashboard/lessons" active={isActive('/dashboard/lessons')}>
              📘 Learn
            </NavItem>
            <NavItem href="/dashboard/alphabets" active={isActive('/dashboard/alphabets')}>
              🔡 Alphabets
            </NavItem>
            <NavItem href="/dashboard/leaderboard" active={isActive('/dashboard/leaderboard')}>
              🏆 Leaderboard
            </NavItem>
            <NavItem href="/dashboard/profile" active={isActive('/dashboard/profile')}>
              👤 Profile
            </NavItem>
            <NavItem href="/dashboard/more" active={isActive('/dashboard/more')}>
              ⚙️ More
            </NavItem>
          </nav>

          {/* User Info at Bottom */}
          {!loading && user && (
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="md:col-span-7 bg-white shadow-none md:shadow rounded-none md:rounded-lg overflow-y-auto">
          {children}
        </main>

        {/* Right Section - Desktop Only */}
        <aside className="hidden md:flex md:flex-col md:col-span-3 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold text-lg mb-2 text-gray-800">
              Unlock Leaderboards!
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Complete 10 more lessons to start competing.
            </p>
          </div>

          {/* Show user stats when logged in */}
          {!loading && user && (
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-green-700" />
                <h2 className="font-semibold text-lg text-green-900">
                  Your Progress
                </h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Lessons</span>
                  <span className="font-bold text-green-900">5/50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Streak</span>
                  <span className="font-bold text-green-900">0 days 🔥</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Time</span>
                  <span className="font-bold text-green-900">0h</span>
                </div>
              </div>
              <Link
                href="/dashboard/profile"
                className="block w-full mt-4 bg-green-600 py-2 rounded-md font-semibold text-white hover:bg-green-700 text-center text-sm"
              >
                View Full Profile
              </Link>
            </div>
          )}
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          <BottomNavItem 
            href="/dashboard/lessons" 
            icon={BookOpen}
            label="Learn"
            active={isActive('/dashboard/lessons')}
          />
          <BottomNavItem 
            href="/dashboard/alphabets" 
            icon={Grid}
            label="Alphabets"
            active={isActive('/dashboard/alphabets')}
          />
          <BottomNavItem 
            href="/dashboard/leaderboard" 
            icon={Trophy}
            label="Leaderboard"
            active={isActive('/dashboard/leaderboard')}
          />
          <BottomNavItem 
            href="/dashboard/profile" 
            icon={User}
            label="Profile"
            active={isActive('/dashboard/profile')}
          />
          <BottomNavItem 
            href="/dashboard/more" 
            icon={Settings}
            label="More"
            active={isActive('/dashboard/more')}
          />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ href, children, active }) {
  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded text-sm transition-colors ${
        active ? 'bg-green-100 text-green-700 font-semibold' : 'hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}

function BottomNavItem({ href, icon: Icon, label, active }) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors ${
        active ? 'text-green-600' : 'text-gray-600'
      }`}
    >
      <Icon className={`w-6 h-6 mb-1 ${active ? 'stroke-[2.5]' : ''}`} />
      <span className={`text-xs ${active ? 'font-semibold' : ''}`}>{label}</span>
    </Link>
  );
}