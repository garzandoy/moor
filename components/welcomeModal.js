'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { X, ArrowRight, Sparkles } from 'lucide-react';

export default function WelcomeModal({ userId, userEmail, onComplete }) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  // Generate name suggestion from email
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

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = async () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboardingCompleted', 'true');
    }
    onComplete();
  };

  const handleComplete = async () => {
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.name.trim() || null,
          daily_goal_minutes: formData.dailyGoal,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;

      if (typeof window !== 'undefined') {
        localStorage.setItem('onboardingCompleted', 'true');
      }

      router.refresh();
      onComplete();
    } catch (error) {
      console.error('Error saving onboarding:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.name.trim().length > 0;
    if (step === 2) return formData.goal.length > 0;
    return true;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-slideUp">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`h-2 rounded-full transition-all duration-300 ${
                dot === step ? 'w-8 bg-blue-600' : dot < step ? 'w-2 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">👋</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Puhana!</h2>
              <p className="text-gray-600">Let's personalize your learning experience</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What should we call you?</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">This will appear on your profile and leaderboard</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Why are you learning Pashto?</h2>
              <p className="text-gray-600">This helps us personalize your lessons</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'travel', label: 'Travel to Afghanistan/Pakistan', emoji: '✈️' },
                { value: 'family', label: 'Connect with family & friends', emoji: '👨‍👩‍👧‍👦' },
                { value: 'career', label: 'Career & professional growth', emoji: '💼' },
                { value: 'culture', label: 'Culture & personal interest', emoji: '📚' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange('goal', option.value)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    formData.goal === option.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium text-gray-900">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">⏰</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Set your daily goal</h2>
              <p className="text-gray-600">How much time can you dedicate each day?</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Daily learning time</label>
              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 15, 20, 30, 60].map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => handleChange('dailyGoal', minutes)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.dailyGoal === minutes ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-900">{minutes}</div>
                    <div className="text-xs text-gray-600">min</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">💡 <strong>Tip:</strong> Consistency is key! Start small and build your streak.</p>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-8">
          <button
            onClick={handleSkip}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Skip for now
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed() || saving}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? 'Saving...' : step === 3 ? (
              <>
                <Sparkles className="w-5 h-5" />
                Let's Go!
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        <div className="text-center mt-4">
          <button onClick={handleSkip} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            I'll do this later
          </button>
        </div>
      </div>
    </div>
  );
}