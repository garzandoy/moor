'use client';

import { useState, useEffect } from 'react';
import LightMode from '@/components/landingLightMode';
import DarkMode from '@/components/landingDarkMode';
import { Moon, Sun } from 'lucide-react';

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  // Save theme preference when it changes
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <>
      {/* Theme Toggle Button - Floating */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all ${
          isDark 
            ? 'bg-slate-800 text-[#D4AF37] hover:bg-slate-700' 
            : 'bg-white text-[#8B1538] hover:bg-gray-100'
        }`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Render the appropriate mode */}
      {isDark ? <DarkMode /> : <LightMode />}
    </>
  );
}