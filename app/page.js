'use client';

import { useState, useEffect } from 'react';
import LightMode from '@/components/landingLightMode';
import DarkMode from '@/components/landingDarkMode';
import { Moon, Sun } from 'lucide-react';

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <>
      {/* Theme Toggle Button - Bottom Right */}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-xl transition-all border-2 ${
          isDark 
            ? 'bg-slate-800 text-[#D4AF37] hover:bg-slate-700 border-[#D4AF37]/30' 
            : 'bg-white text-gray-900 hover:bg-gray-100 border-gray-200'
        }`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Render either Light or Dark Mode */}
      {isDark ? <DarkMode /> : <LightMode />}
    </>
  );
}