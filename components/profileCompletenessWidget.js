'use client';

import { useState } from 'react';
import { X, User, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfileCompletenessWidget({ profile }) {
  const [dismissed, setDismissed] = useState(false);
  const router = useRouter();

  // Calculate profile completeness
  const getCompleteness = () => {
    let score = 0;
    let total = 4;

    if (profile?.full_name && profile.full_name !== 'Anonymous') score++;
    if (profile?.avatar_url) score++;
    if (profile?.bio) score++;
    if (profile?.location) score++;

    return Math.round((score / total) * 100);
  };

  const completeness = getCompleteness();

  // Don't show if profile is 100% complete or if dismissed
  if (completeness === 100 || dismissed) return null;

  const getMissingItems = () => {
    const missing = [];
    if (!profile?.full_name || profile.full_name === 'Anonymous') missing.push('Display name');
    if (!profile?.avatar_url) missing.push('Profile picture');
    if (!profile?.bio) missing.push('Bio');
    if (!profile?.location) missing.push('Location');
    return missing;
  };

  const missingItems = getMissingItems();

  return (
    <div className="bg-gradient-to-br from-rose-50 to-amber-50/30 border-2 border-rose-200 rounded-xl p-5 mb-6 relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-[#8B1538] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-gray-900">Complete Your Profile</h3>
            <span className="text-sm font-semibold text-[#8B1538]">{completeness}%</span>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            Add the following to unlock your full profile:
          </p>

          <ul className="text-sm text-gray-700 mb-4 space-y-1">
            {missingItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Star className="w-3 h-3 text-[#D4AF37]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div
              className="bg-gradient-to-r from-[#8B1538] to-[#660C21] h-2 rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>

          <button
            onClick={() => router.push('/dashboard/profile')}
            className="w-full px-4 py-2 bg-[#8B1538] text-white rounded-lg font-medium hover:bg-[#660C21] transition-colors text-sm"
          >
            Complete Profile (+50 XP)
          </button>
        </div>
      </div>
    </div>
  );
}