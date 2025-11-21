'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Flame,
  Trophy,
  Zap,
  BookOpen,
  Award,
  Calendar,
  Settings,
  User,
  Mail,
  Clock,
  Target,
  TrendingUp,
  Crown,
  Star,
  Medal,
  ArrowLeft,
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);
  const [weekActivity, setWeekActivity] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      // Get profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);
      setEditedProfile({
        full_name: profileData?.full_name || '',
        daily_goal_minutes: profileData?.daily_goal_minutes || 15,
      });

      // Get achievements
      const { data: achievementsData } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });
      setAchievements(achievementsData || []);

      // Get week activity for chart
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const { data: weekData } = await supabase
        .from('daily_activity')
        .select('*')
        .eq('user_id', user.id)
        .gte('activity_date', weekAgo.toISOString().split('T')[0])
        .order('activity_date', { ascending: true });
      setWeekActivity(weekData || []);

    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await supabase
        .from('profiles')
        .update({
          full_name: editedProfile.full_name,
          daily_goal_minutes: editedProfile.daily_goal_minutes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      setProfile({ ...profile, ...editedProfile });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load profile</p>
        </div>
      </div>
    );
  }

  const currentLevel = calculateLevel(profile.total_xp);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm border-4 border-white/30">
                {profile.full_name ? profile.full_name[0].toUpperCase() : '👤'}
              </div>
              
              <div>
                {editMode ? (
                  <input
                    type="text"
                    value={editedProfile.full_name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, full_name: e.target.value })}
                    className="text-2xl font-bold mb-2 bg-white/20 border-2 border-white/40 rounded-lg px-4 py-2 text-white placeholder-white/60"
                    placeholder="Your name"
                  />
                ) : (
                  <h2 className="text-2xl font-bold mb-2">
                    {profile.full_name || 'Pashto Learner'}
                  </h2>
                )}
                
                <div className="flex items-center gap-2 text-blue-100 mb-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full w-fit">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm font-bold">
                    Level {currentLevel} · {getLevelTitle(currentLevel)}
                  </span>
                </div>
              </div>
            </div>

            {editMode && (
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Save Changes
              </button>
            )}
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
                {profile.total_xp.toLocaleString()}
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
                  style={{ width: `${getXpProgress(profile.total_xp)}%` }}
                />
              </div>
            </div>
            
            <p className="text-xs text-center text-gray-600">
              {getXpForNextLevel(profile.total_xp) - profile.total_xp} XP to next level
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
                {getStreakEmoji(profile.current_streak)}
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {profile.current_streak}
              </div>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
              <p className="text-xs text-orange-700">
                🏆 Longest streak: <span className="font-bold">{profile.longest_streak} days</span>
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
                {profile.lessons_completed}
              </div>
              <p className="text-sm text-gray-600">Lessons Completed</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Exercises</span>
                <span className="font-bold text-gray-900">{profile.total_exercises_completed}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Avg. Score</span>
                <span className="font-bold text-green-600">
                  {profile.total_exercises_completed > 0
                    ? Math.round((profile.lessons_completed / profile.total_exercises_completed) * 100)
                    : 0}%
                </span>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                  >
                    <div className="text-4xl flex-shrink-0">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{achievement.achievement_name}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Earned {new Date(achievement.earned_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Medal className="w-6 h-6 text-yellow-600" />
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

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Settings</h2>
            </div>

            <div className="space-y-6">
              {/* Daily Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Goal (minutes)
                </label>
                {editMode ? (
                  <select
                    value={editedProfile.daily_goal_minutes}
                    onChange={(e) => setEditedProfile({ ...editedProfile, daily_goal_minutes: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={20}>20 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{profile.daily_goal_minutes} minutes per day</span>
                  </div>
                )}
              </div>

              {/* Account Created */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Since
                </label>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">
                    {new Date(profile.created_at).toLocaleDateString('en', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}