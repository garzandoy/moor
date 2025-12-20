'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Sparkles, Star } from 'lucide-react';

export default function WelcomeModal({ userId, userEmail, onComplete }) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  // Suggest name from email
  const suggestedName = userEmail
    ?.split('@')[0]
    .replace(/[._-]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setSaving(true);
    setError('');
    
    try {
      // Update profile with name and bonus XP
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: name.trim(),
          onboarding_completed: true,
          total_xp: 50, // Welcome bonus!
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      // Mark onboarding as completed in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('onboarding_completed', 'true');
      }

      // Call onComplete callback
      onComplete();
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B1538] to-[#660C21] text-white p-8 rounded-t-2xl text-center">
          <div className="flex justify-center mb-3">
            <Sparkles className="w-12 h-12 text-[#D4AF37]" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome to Puhanah!</h2>
          <p className="text-rose-100 flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-[#D4AF37]" />
            Knowledge is Light
            <Star className="w-4 h-4 text-[#D4AF37]" />
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">What should we call you?</h3>
            <p className="text-sm text-gray-600">This name will appear on the leaderboard and your profile.</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name <span className="text-[#8B1538]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={suggestedName || "Enter your name"}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538] outline-none text-lg transition-all"
              autoFocus
              maxLength={50}
              required
            />
            {error && (
              <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                ⚠️ {error}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">You can change this later in your profile</p>
          </div>

          {/* Bonus Preview */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-[#D4AF37] rounded-xl p-4 text-center mb-6">
            <div className="text-3xl mb-2">🎁</div>
            <p className="font-bold text-gray-900">Get started with +50 XP!</p>
            <p className="text-sm text-gray-600 mt-1">Your welcome bonus</p>
          </div>

          <button
            type="submit"
            disabled={saving || !name.trim()}
            className="w-full px-6 py-4 bg-gradient-to-r from-[#8B1538] to-[#660C21] text-white rounded-lg hover:shadow-lg transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Start Learning
                <Sparkles className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="px-8 pb-8">
          <p className="text-xs text-gray-500 text-center">
            By continuing, you're ready to master Pashto! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}