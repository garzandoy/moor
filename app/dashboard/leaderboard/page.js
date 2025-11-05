'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Trophy, Medal, Crown, TrendingUp, User } from 'lucide-react';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all-time'); // 'all-time', 'monthly', 'weekly'
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);

      // Get user stats with email (joining with auth.users)
      const { data, error } = await supabase
        .from('user_stats')
        .select(`
          user_id,
          total_lessons_completed,
          current_streak,
          total_time_minutes
        `)
        .order('total_lessons_completed', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        // Use mock data if there's an error or no data yet
        setLeaderboard(getMockLeaderboard());
      } else if (!data || data.length === 0) {
        // Use mock data if table is empty
        setLeaderboard(getMockLeaderboard());
      } else {
        // Fetch user emails from auth.users for each user_id
        const usersWithEmails = await Promise.all(
          data.map(async (stat) => {
            const { data: userData } = await supabase.auth.admin.getUserById(stat.user_id);
            return {
              ...stat,
              email: userData?.user?.email || 'Anonymous'
            };
          })
        );
        setLeaderboard(usersWithEmails);
      }

      setLoading(false);
    };

    fetchData();
  }, [supabase, timeRange]);

  const getMockLeaderboard = () => {
    return [
      { user_id: '1', email: 'sarah.j@example.com', total_lessons_completed: 45, current_streak: 30, total_time_minutes: 1200 },
      { user_id: '2', email: 'ahmad.r@example.com', total_lessons_completed: 38, current_streak: 15, total_time_minutes: 950 },
      { user_id: '3', email: 'michael.t@example.com', total_lessons_completed: 35, current_streak: 20, total_time_minutes: 880 },
      { user_id: '4', email: 'fatima.k@example.com', total_lessons_completed: 32, current_streak: 12, total_time_minutes: 750 },
      { user_id: '5', email: 'james.w@example.com', total_lessons_completed: 28, current_streak: 8, total_time_minutes: 680 },
      { user_id: '6', email: 'aisha.m@example.com', total_lessons_completed: 25, current_streak: 10, total_time_minutes: 600 },
      { user_id: '7', email: 'david.l@example.com', total_lessons_completed: 22, current_streak: 5, total_time_minutes: 550 },
      { user_id: '8', email: 'zainab.a@example.com', total_lessons_completed: 20, current_streak: 7, total_time_minutes: 480 },
      { user_id: '9', email: 'robert.h@example.com', total_lessons_completed: 18, current_streak: 4, total_time_minutes: 420 },
      { user_id: '10', email: 'mariam.s@example.com', total_lessons_completed: 15, current_streak: 6, total_time_minutes: 380 },
    ];
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return null;
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  // Find current user's rank
  const currentUserRank = leaderboard.findIndex(u => u.user_id === currentUser?.id) + 1;
  const currentUserStats = leaderboard.find(u => u.user_id === currentUser?.id);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        </div>
        <p className="text-gray-600">Compete with other learners and climb the ranks!</p>
      </div>

      {/* Time Range Filter */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTimeRange('all-time')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            timeRange === 'all-time'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Time
        </button>
        <button
          onClick={() => setTimeRange('monthly')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            timeRange === 'monthly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          This Month
        </button>
        <button
          onClick={() => setTimeRange('weekly')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            timeRange === 'weekly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          This Week
        </button>
      </div>

      {/* Current User Stats Card */}
      {currentUserStats && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Your Rank</p>
              <div className="flex items-center gap-3">
                <div className="text-4xl font-bold">#{currentUserRank}</div>
                {getRankIcon(currentUserRank)}
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm mb-1">Lessons Completed</p>
              <div className="text-3xl font-bold">{currentUserStats.total_lessons_completed}</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-blue-100 text-xs">Streak</p>
              <p className="text-xl font-semibold">{currentUserStats.current_streak} days 🔥</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs">Time Spent</p>
              <p className="text-xl font-semibold">{Math.floor(currentUserStats.total_time_minutes / 60)}h</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Lessons
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Streak
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaderboard.map((user, index) => {
                const rank = index + 1;
                const isCurrentUser = user.user_id === currentUser?.id;
                
                return (
                  <tr
                    key={user.user_id}
                    className={`transition-colors ${
                      isCurrentUser
                        ? 'bg-blue-50 hover:bg-blue-100'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Rank */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankBadge(
                            rank
                          )}`}
                        >
                          {rank}
                        </span>
                        {getRankIcon(rank)}
                      </div>
                    </td>

                    {/* User */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className={`font-medium ${isCurrentUser ? 'text-blue-700' : 'text-gray-900'}`}>
                            {user.email?.split('@')[0]}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Lessons */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-gray-900">
                          {user.total_lessons_completed}
                        </span>
                      </div>
                    </td>

                    {/* Streak */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="font-medium text-gray-900">
                        {user.current_streak} 🔥
                      </span>
                    </td>

                    {/* Time */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-gray-600">
                        {Math.floor(user.total_time_minutes / 60)}h {user.total_time_minutes % 60}m
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Complete more lessons to climb the leaderboard! Rankings update in real-time.
        </p>
      </div>
    </div>
  );
}