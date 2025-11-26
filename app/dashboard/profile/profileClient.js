'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Flame,
  Zap,
  BookOpen,
  Award,
  TrendingUp,
  Crown,
  Star,
  Medal,
  ArrowLeft,
  X,
} from 'lucide-react';

// Welcome Modal Component (inline for now - can be extracted later)
function WelcomeModal({ profile, onComplete }) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleSave = async () => {
    if (!name.trim()) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: name.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) throw error;
      
      // Mark as dismissed
      if (typeof window !== 'undefined') {
        localStorage.setItem('welcomeDismissed', 'true');
      }
      
      onComplete(name.trim());
      
      // Refresh the page data from server
      router.refresh();
    } catch (error) {
      console.error('Error saving name:', error);
      alert('Error saving name. Please try again.');
      setSaving(false);
    }
  };

  const handleSkip = () => {
    // Mark as dismissed even when skipping
    if (typeof window !== 'undefined') {
      localStorage.setItem('welcomeDismissed', 'true');
    }
    onComplete(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">👋</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Puhana!
          </h2>
          <p className="text-gray-600">
            Let's personalize your learning experience
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What should we call you?
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            placeholder="Enter your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            autoFocus
          />
          <p className="text-xs text-gray-500 mt-2">
            This will be displayed on your profile and leaderboard
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Skip for now
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || saving}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfileClient({ profile: initialProfile, achievements, weekActivity }) {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  // Only show welcome if: no name in database
  const [showWelcome, setShowWelcome] = useState(() => {
    // Don't show if name already exists
    if (initialProfile?.full_name) return false;
    
    // Check if user dismissed it before
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('welcomeDismissed');
      return !dismissed;
    }
    return true;
  });

  const handleWelcomeComplete = (name) => {
    setShowWelcome(false);
    
    if (name) {
      // Update local state immediately for UI
      setProfile({ ...profile, full_name: name });
    }
  };

  const calculateLevel = (xp) => {
    return Math.floor(xp / 1000) + 1;
  };

  const getXpForNextLevel = (xp) => {
    const currentLevel = calculateLevel(xp);
    return currentLevel * 1000;
  };

  const getXpProgress = (xp) => {
    const currentLevelXp = (calculateLevel(xp) - 1) * 1000;
    const nextLevelXp = getXpForNextLevel(xp);
    const progress = xp - currentLevelXp;
    const total = nextLevelXp - currentLevelXp;
    return (progress / total) * 100;
  };

  const getStreakEmoji = (streak) => {
    if (streak >= 30) return '🔥🔥🔥';
    if (streak >= 14) return '🔥🔥';
    if (streak >= 7) return '🔥';
    return '🌟';
  };

  const getLevelTitle = (level) => {
    if (level >= 20) return 'Master';
    if (level >= 15) return 'Expert';
    if (level >= 10) return 'Advanced';
    if (level >= 5) return 'Intermediate';
    return 'Beginner';
  };

  const currentLevel = calculateLevel(profile?.total_xp || 0);

  return (
    <>
      {showWelcome && <WelcomeModal profile={profile} onComplete={handleWelcomeComplete} />}
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => router.push('/dashboard/lessons')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Lessons</span>
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          </div>

          {/* Profile Header Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm border-4 border-white/30">
                  {profile?.full_name ? profile.full_name[0].toUpperCase() : '👤'}
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {profile?.full_name || 'Pashto Learner'}
                  </h2>
                  
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full w-fit">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm font-bold">
                      Level {currentLevel} · {getLevelTitle(currentLevel)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* XP & Level */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-gray-900">Experience Points</h3>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {(profile?.total_xp || 0).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Total XP Earned</p>
              </div>

              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Level {currentLevel}</span>
                  <span className="text-gray-600">Level {currentLevel + 1}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getXpProgress(profile?.total_xp || 0)}%` }}
                  />
                </div>
              </div>
              
              <p className="text-xs text-center text-gray-600">
                {getXpForNextLevel(profile?.total_xp || 0) - (profile?.total_xp || 0)} XP to next level
              </p>
            </div>

            {/* Streak */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-6 h-6 text-orange-600" />
                <h3 className="font-bold text-gray-900">Learning Streak</h3>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">
                  {getStreakEmoji(profile?.current_streak || 0)}
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {profile?.current_streak || 0}
                </div>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                <p className="text-xs text-orange-700">
                  🏆 Longest streak: <span className="font-bold">{profile?.longest_streak || 0} days</span>
                </p>
              </div>
            </div>

            {/* Lessons Completed */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-gray-900">Lessons</h3>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {profile?.lessons_completed || 0}
                </div>
                <p className="text-sm text-gray-600">Lessons Completed</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Exercises</span>
                  <span className="font-bold text-gray-900">{profile?.total_exercises_completed || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Weekly Activity</h2>
            </div>

            <div className="flex items-end justify-between gap-3 h-48">
              {[...Array(7)].map((_, index) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - index));
                const dateStr = date.toISOString().split('T')[0];
                const dayActivity = weekActivity.find(a => a.activity_date === dateStr);
                const minutes = dayActivity?.time_spent_minutes || 0;
                const maxMinutes = Math.max(...weekActivity.map(a => a.time_spent_minutes || 0), 1);
                const height = minutes > 0 ? (minutes / maxMinutes) * 100 : 5;

                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center h-40 relative group">
                      <div
                        className={`w-full rounded-t-lg transition-all ${
                          minutes > 0 ? 'bg-gradient-to-t from-blue-500 to-blue-400' : 'bg-gray-200'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        {minutes} min
                        {dayActivity && (
                          <div className="text-gray-300">
                            {dayActivity.exercises_completed} exercises · +{dayActivity.xp_earned} XP
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-gray-600 font-medium block">
                        {date.toLocaleDateString('en', { weekday: 'short' })}
                      </span>
                      <span className="text-xs text-gray-400">
                        {date.getDate()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
              <span className="ml-auto text-sm text-gray-600">
                {achievements.length} unlocked
              </span>
            </div>

            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                  >
                    <div className="text-4xl flex-shrink-0">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm">{achievement.achievement_name}</h3>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(achievement.earned_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Medal className="w-5 h-5 text-yellow-600" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No achievements yet</p>
                <p className="text-sm text-gray-500 mt-1">Complete lessons to earn badges!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}