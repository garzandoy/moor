'use client';

import { Trophy, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LeaderboardPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has dismissed the prompt
    const dismissed = localStorage.getItem('leaderboard-prompt-dismissed');
    const lastShown = localStorage.getItem('leaderboard-prompt-last-shown');
    const now = new Date().getTime();
    
    // Show if never dismissed, or if it's been more than 7 days since last shown
    if (!dismissed || (lastShown && now - parseInt(lastShown) > 7 * 24 * 60 * 60 * 1000)) {
      // Show after 5 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('leaderboard-prompt-dismissed', 'true');
    localStorage.setItem('leaderboard-prompt-last-shown', new Date().getTime().toString());
    setShowPrompt(false);
  };

  const handleViewLeaderboard = () => {
    localStorage.setItem('leaderboard-prompt-last-shown', new Date().getTime().toString());
    router.push('/dashboard/leaderboard');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white rounded-xl shadow-2xl border border-gray-200 p-6 animate-slide-up z-40">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Check the Leaderboard!
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            See how you rank against other Pashto learners. Compete and stay motivated!
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleViewLeaderboard}
              className="px-4 py-2 bg-[#8B1538] text-white rounded-lg font-medium hover:bg-[#660C21] transition-colors text-sm"
            >
              View Leaderboard
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}