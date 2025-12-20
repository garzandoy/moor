'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Sparkles, Target, Clock, ArrowRight } from 'lucide-react';

export default function WelcomeModal({ userId, userEmail, onComplete }) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  // Suggest name from email
  const suggestedName = userEmail
    ?.split('@')[0]
    .replace(/[._-]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || '';

  const [formData, setFormData] = useState({
    name: suggestedName,
    goal: '',
    dailyGoal: 15,
  });

  const goals = [
    { value: 'travel', label: '✈️ Travel to Afghanistan/Pakistan', icon: '✈️' },
    { value: 'family', label: '👨‍👩‍👧‍👦 Talk with family', icon: '👨‍👩‍👧‍👦' },
    { value: 'culture', label: '📚 Learn about culture', icon: '📚' },
    { value: 'work', label: '💼 Work/Business', icon: '💼' },
    { value: 'hobby', label: '🎯 Personal interest', icon: '🎯' },
    { value: 'other', label: '🌟 Other', icon: '🌟' },
  ];

  const dailyGoals = [
    { minutes: 5, label: 'Casual', desc: '5 min/day' },
    { minutes: 10, label: 'Regular', desc: '10 min/day' },
    { minutes: 15, label: 'Serious', desc: '15 min/day' },
    { minutes: 30, label: 'Intense', desc: '30 min/day' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.name.trim()) {
      return; // Name is required
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setSaving(true);
    
    try {
      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.name.trim(),
          learning_goal: formData.goal || null,
          daily_goal_minutes: formData.dailyGoal,
          onboarding_completed: true,
          total_xp: 50, // Welcome bonus!
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;

      // Mark onboarding as completed in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('onboarding_completed', 'true');
      }

      onComplete();
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B1538] to-[#660C21] text-white p-6 rounded-t-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold">Welcome to Puhanah!</h2>
          </div>
          <p className="text-rose-100 text-sm">Knowledge is Light ⭐</p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 py-4 bg-gray-50">
          {[1, 2, 3].map(dot => (
            <div
              key={dot}
              className={`h-2 rounded-full transition-all ${
                dot === step ? 'w-8 bg-[#8B1538]' : dot < step ? 'w-2 bg-[#8B1538]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          
          {/* Step 1: Name (REQUIRED) */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">What should we call you?</h3>
                <p className="text-sm text-gray-600">This name will appear on the leaderboard and your profile.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name <span className="text-[#8B1538]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1538] focus:border-transparent text-lg"
                  autoFocus
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">You can change this later in your profile</p>
              </div>

              {!formData.name.trim() && (
                <p className="text-sm text-[#8B1538] flex items-center gap-2">
                  ⚠️ Please enter your name to continue
                </p>
              )}
            </div>
          )}

          {/* Step 2: Learning Goal (Optional) */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Why do you want to learn Pashto?</h3>
                <p className="text-sm text-gray-600">This helps us personalize your experience (optional).</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => handleChange('goal', goal.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.goal === goal.value 
                        ? 'border-[#8B1538] bg-rose-50' 
                        : 'border-gray-200 hover:border-rose-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{goal.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{goal.label.replace(/^.+ /, '')}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Daily Goal (Optional) */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">How much time can you dedicate?</h3>
                <p className="text-sm text-gray-600">Set a daily goal to stay consistent (optional).</p>
              </div>

              <div className="space-y-3">
                {dailyGoals.map((goal) => (
                  <button
                    key={goal.minutes}
                    onClick={() => handleChange('dailyGoal', goal.minutes)}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      formData.dailyGoal === goal.minutes 
                        ? 'border-[#8B1538] bg-rose-50' 
                        : 'border-gray-200 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#8B1538]" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{goal.label}</div>
                        <div className="text-sm text-gray-600">{goal.desc}</div>
                      </div>
                    </div>
                    {formData.dailyGoal === goal.minutes && (
                      <div className="w-6 h-6 bg-[#8B1538] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">💡 <strong>Tip:</strong> Consistency is key! Start small and build your streak.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl flex items-center justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              ← Back
            </button>
          )}
          
          <div className="flex-1" />

          <button
            onClick={handleNext}
            disabled={saving || (step === 1 && !formData.name.trim())}
            className="flex-1 px-6 py-3 bg-[#8B1538] text-white rounded-lg hover:bg-[#660C21] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              'Saving...'
            ) : step === 3 ? (
              <>
                Start Learning
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Reward Preview */}
        {step === 3 && (
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-[#D4AF37] rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎁</div>
              <p className="font-bold text-gray-900">Complete setup and earn +50 XP!</p>
              <p className="text-sm text-gray-600 mt-1">Start your learning journey with a bonus</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}