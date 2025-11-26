'use client';

import { useRouter } from 'next/navigation';
import { UserPlus, X } from 'lucide-react';
import { useState } from 'react';

export default function LeaderboardPrompt({ hasName }) {
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if user has name or if dismissed
  if (hasName || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <span className="text-xl">🎭</span>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1">
            You're competing as "Anonymous"
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Add your name to climb the ranks and show off your progress!
          </p>
          <button
            onClick={() => router.push('/dashboard/more')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <UserPlus className="w-4 h-4" />
            Add Your Name
          </button>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}