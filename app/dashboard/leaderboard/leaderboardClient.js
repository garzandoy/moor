'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Trophy,
  Medal,
  Crown,
  Zap,
  Flame,
  TrendingUp,
  Users,
  ArrowLeft,
  Calendar,
  Award,
  UserPlus,
  X,
} from 'lucide-react';

// Inline LeaderboardPrompt
function LeaderboardPrompt({ hasName, onAddName }) {
  const [dismissed, setDismissed] = useState(false);

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
            onClick={onAddName}
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

export default function LeaderboardClient({ initialLeaderboard, currentUserProfile, userId }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('all-time');
  const [category, setCategory] = useState('xp');

  // Auto-refresh every 10 seconds when viewing default leaderboard
  useEffect(() => {
    if (timeframe === 'all-time' && category === 'xp') {
      const interval = setInterval(() => {
        loadLeaderboard();
      }, 10000); // Refresh every 10 seconds

      return () => clearInterval(interval);
    }
  }, [timeframe, category]);

  // Fetch when filters change
  useEffect(() => {
    if (timeframe === 'all-time' && category === 'xp') {
      setLeaderboard(initialLeaderboard);
      return;
    }
    loadLeaderboard();
  }, [timeframe, category]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      let sortField = 'total_xp';
      if (category === 'streak') sortField = 'current_streak';
      if (category === 'lessons') sortField = 'lessons_completed';

      let query = supabase
        .from('profiles')
        .select('id, full_name, total_xp, current_streak, longest_streak, lessons_completed, last_activity_date')
        .order(sortField, { ascending: false })
        .limit(100);

      if (timeframe === 'monthly') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        query = query.gte('last_activity_date', monthAgo.toISOString().split('T')[0]);
      } else if (timeframe === 'weekly') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query = query.gte('last_activity_date', weekAgo.toISOString().split('T')[0]);
      }

      const { data: leaderboardData } = await query;

      const rankedData = leaderboardData.map((profile, index) => ({
        ...profile,
        rank: index + 1,
        isCurrentUser: profile.id === userId,
      }));

      setLeaderboard(rankedData);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUserRank = () => {
    const userInLeaderboard = leaderboard.find(u => u.isCurrentUser);
    return userInLeaderboard ? userInLeaderboard.rank : null;
  };

  const getValueByCategory = (profile) => {
    if (category === 'xp') return profile.total_xp?.toLocaleString() || '0';
    if (category === 'streak') return `${profile.current_streak || 0} days`;
    if (category === 'lessons') return `${profile.lessons_completed || 0} lessons`;
  };

  const getMedalIcon = (rank) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return null;
  };

  const getMedalBg = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
    if (rank === 3) return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300';
    return 'bg-white border-gray-200';
  };

  const currentUserRank = getCurrentUserRank();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard/lessons')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Lessons</span>
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          </div>
          <p className="text-gray-600">Compete with learners around the world</p>
        </div>

        {/* Current User Rank Card */}
        {currentUserProfile && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm border-2 border-white/30">
                  {currentUserProfile.full_name ? currentUserProfile.full_name[0].toUpperCase() : '👤'}
                </div>
                <div>
                  <p className="text-sm opacity-90">Your Rank</p>
                  <h2 className="text-3xl font-bold">
                    {currentUserRank ? `#${currentUserRank}` : 'Unranked'}
                  </h2>
                  <p className="text-sm opacity-75">
                    {getValueByCategory(currentUserProfile)}
                  </p>
                </div>
              </div>
              {currentUserRank && currentUserRank <= 3 && (
                <div className="text-5xl">
                  {currentUserRank === 1 ? '🏆' : currentUserRank === 2 ? '🥈' : '🥉'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Leaderboard Prompt for users without names */}
        <LeaderboardPrompt 
          hasName={!!currentUserProfile?.full_name}
          onAddName={() => router.push('/dashboard/more')}
        />

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rank By
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCategory('xp')}
                  disabled={loading}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    category === 'xp'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Zap className="w-4 h-4 inline mr-1" />
                  XP
                </button>
                <button
                  onClick={() => setCategory('streak')}
                  disabled={loading}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    category === 'streak'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Flame className="w-4 h-4 inline mr-1" />
                  Streak
                </button>
                <button
                  onClick={() => setCategory('lessons')}
                  disabled={loading}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    category === 'lessons'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Award className="w-4 h-4 inline mr-1" />
                  Lessons
                </button>
              </div>
            </div>

            {/* Timeframe Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeframe
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeframe('all-time')}
                  disabled={loading}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    timeframe === 'all-time'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  All Time
                </button>
                <button
                  onClick={() => setTimeframe('monthly')}
                  disabled={loading}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    timeframe === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Monthly
                </button>
                <button
                  onClick={() => setTimeframe('weekly')}
                  disabled={loading}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    timeframe === 'weekly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Users className="w-4 h-4 inline mr-1" />
                  Weekly
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center mt-4">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="mb-6">
            <div className="flex items-end justify-center gap-4 mb-8">
              {/* 2nd Place */}
              <div className="flex-1 max-w-[140px]">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl p-4 text-center border-2 border-gray-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-2 border-2 border-gray-400">
                    {leaderboard[1].full_name ? leaderboard[1].full_name[0].toUpperCase() : '👤'}
                  </div>
                  <p className="font-bold text-gray-900 text-sm truncate">
                    {leaderboard[1].full_name || 'Anonymous'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {getValueByCategory(leaderboard[1]).split(' ')[0]}
                  </p>
                </div>
                <div className="bg-gray-300 text-center py-2 rounded-b-xl">
                  <p className="text-2xl font-bold text-gray-700">2</p>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex-1 max-w-[160px]">
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-t-xl p-4 text-center border-2 border-yellow-400 transform scale-105">
                  <Crown className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2 border-2 border-yellow-500">
                    {leaderboard[0].full_name ? leaderboard[0].full_name[0].toUpperCase() : '👤'}
                  </div>
                  <p className="font-bold text-gray-900 truncate">
                    {leaderboard[0].full_name || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {getValueByCategory(leaderboard[0]).split(' ')[0]}
                  </p>
                </div>
                <div className="bg-yellow-400 text-center py-3 rounded-b-xl">
                  <p className="text-3xl font-bold text-yellow-900">1</p>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex-1 max-w-[140px]">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-t-xl p-4 text-center border-2 border-amber-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-2 border-2 border-amber-400">
                    {leaderboard[2].full_name ? leaderboard[2].full_name[0].toUpperCase() : '👤'}
                  </div>
                  <p className="font-bold text-gray-900 text-sm truncate">
                    {leaderboard[2].full_name || 'Anonymous'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {getValueByCategory(leaderboard[2]).split(' ')[0]}
                  </p>
                </div>
                <div className="bg-amber-400 text-center py-2 rounded-b-xl">
                  <p className="text-2xl font-bold text-amber-900">3</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Rankings</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {leaderboard.map((profile) => (
              <div
                key={profile.id}
                className={`px-6 py-4 transition-colors ${
                  profile.isCurrentUser
                    ? 'bg-blue-50 border-l-4 border-l-blue-600'
                    : profile.rank <= 3
                    ? getMedalBg(profile.rank) + ' border-l-4'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 text-center">
                      {getMedalIcon(profile.rank) || (
                        <span className="text-xl font-bold text-gray-600">{profile.rank}</span>
                      )}
                    </div>

                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      profile.isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {profile.full_name ? profile.full_name[0].toUpperCase() : '👤'}
                    </div>

                    <div className="flex-1">
                      <p className={`font-bold ${profile.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                        {profile.full_name || 'Anonymous'}
                        {profile.isCurrentUser && (
                          <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">You</span>
                        )}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        {category === 'xp' && (
                          <span className="text-sm text-gray-600">
                            <Zap className="w-3 h-3 inline text-purple-600" /> {profile.total_xp?.toLocaleString() || '0'} XP
                          </span>
                        )}
                        {category === 'streak' && (
                          <span className="text-sm text-gray-600">
                            <Flame className="w-3 h-3 inline text-orange-600" /> {profile.current_streak || 0} days
                          </span>
                        )}
                        {category === 'lessons' && (
                          <span className="text-sm text-gray-600">
                            <Award className="w-3 h-3 inline text-green-600" /> {profile.lessons_completed || 0} lessons
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`text-2xl font-bold ${
                        profile.rank === 1 ? 'text-yellow-600' :
                        profile.rank === 2 ? 'text-gray-500' :
                        profile.rank === 3 ? 'text-amber-600' :
                        profile.isCurrentUser ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {getValueByCategory(profile).split(' ')[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {leaderboard.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No learners found for this timeframe</p>
            </div>
          )}
        </div>

        {/* Motivational Message */}
        <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white text-center">
          <p className="text-lg font-semibold mb-2">
            {currentUserRank && currentUserRank <= 10
              ? '🎉 Amazing work! You\'re in the top 10!'
              : currentUserRank && currentUserRank <= 50
              ? '🚀 Keep going! You\'re climbing the ranks!'
              : '💪 Start your journey to the top today!'}
          </p>
          <p className="text-sm opacity-90">
            Complete lessons, maintain your streak, and earn XP to climb the leaderboard!
          </p>
        </div>
      </div>
    </div>
  );
}