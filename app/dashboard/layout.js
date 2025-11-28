'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { LogOut, User, BookOpen, Trophy, Home, Settings, Grid, Flame, Zap, Target } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profileData);
      }
      
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
    <>
      {/* Desktop Layout - 3 Columns with Sticky Sidebars */}
      <div className="hidden md:flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        
        {/* Left Sidebar - Navigation (Sticky) */}
        <div className="w-64 flex-shrink-0 bg-white overflow-y-auto">
          <div className="p-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <span className="font-bold text-xl text-gray-900">Puhana</span>
            </Link>

            {/* Navigation */}
            <nav className="space-y-2">
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
          </div>
        </div>

        {/* Thin vertical line */}
        <div className="w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200"></div>

        {/* Middle Content - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          {children}
        </div>

        {/* Right Sidebar - Stats (Sticky, seamless with content) */}
        <div className="w-72 flex-shrink-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 overflow-y-auto">
          <div className="space-y-4">
            
            {/* Simple Stats */}
            {!loading && profile && (
              <>
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-600">Streak</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{profile.current_streak || 0} days</div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-600">Total XP</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{profile.total_xp || 0}</div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600">Lessons</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{profile.lessons_completed || 0}</div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-gray-100 flex flex-col">
        {/* Mobile Top Bar */}
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-center sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-green-600 font-bold text-white">
              P
            </div>
            <span className="font-semibold text-lg">Puhana</span>
          </Link>
        </header>

        {/* Mobile Content */}
        <main className="flex-1 bg-white pb-20">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
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
    </>
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