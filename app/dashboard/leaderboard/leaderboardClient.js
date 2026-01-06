'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { trackLeaderboardView } from '@/lib/analytics';
import {
  Trophy,
  ArrowLeft,
  UserPlus,
  X,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  MapPin,
  Crown,
  Users,
} from 'lucide-react';

const ITEMS_PER_PAGE = 20;
const CACHE_DURATION = 30000;

const getRankBadgeColor = (rank) => {
  if (rank === 1) return 'text-yellow-600';
  if (rank === 2) return 'text-gray-500';
  if (rank === 3) return 'text-orange-500';
  return 'text-gray-600';
};

const AVATAR_COLORS = [
  'bg-red-300', 'bg-blue-300', 'bg-purple-300', 'bg-green-300',
  'bg-rose-300', 'bg-pink-300', 'bg-indigo-300', 'bg-teal-300',
  'bg-fuchsia-300', 'bg-violet-300', 'bg-cyan-300', 'bg-emerald-300',
];

const getAvatarColor = (name) => {
  if (!name) return 'bg-gray-400';
  const charCode = name.charCodeAt(0);
  return AVATAR_COLORS[charCode % AVATAR_COLORS.length];
};

function SkeletonLoader({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-4 animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="bg-gray-200 rounded-full" style={{width: '60px', height: '60px'}}></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
      ))}
    </>
  );
}

function LeaderboardPrompt({ hasName, onAddName }) {
  const [dismissed, setDismissed] = useState(false);
  if (hasName || dismissed) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xl">🎭</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1">You're competing as "Anonymous"</h3>
          <p className="text-sm text-gray-600 mb-3">Add your name to climb the ranks!</p>
          <button
            onClick={onAddName}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-bold"
          >
            <UserPlus className="w-4 h-4" />
            Add Your Name
          </button>
        </div>
        <button onClick={() => setDismissed(true)} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function RankChangeIndicator({ change }) {
  if (!change || change === 0) return null;
  
  return change > 0 ? (
    <div className="flex items-center gap-0.5 text-green-600 text-xs font-bold">
      <ChevronUp className="w-3 h-3" />{change}
    </div>
  ) : (
    <div className="flex items-center gap-0.5 text-red-600 text-xs font-bold">
      <ChevronDown className="w-3 h-3" />{Math.abs(change)}
    </div>
  );
}

function LeaderboardItem({ profile, isCurrentUser }) {
  const rankBadgeColor = getRankBadgeColor(profile.rank);
  const avatarColor = getAvatarColor(profile.full_name);
  
  return (
    <div className={`flex items-center gap-3 p-4 ${isCurrentUser ? 'bg-blue-50' : ''}`}>
      <div className={`w-10 h-10 flex items-center justify-center font-bold text-lg ${rankBadgeColor} flex-shrink-0`}>
        {profile.rank === 1 ? <Crown className="w-6 h-6" /> : profile.rank}
      </div>

      <div className={`w-15 h-15 rounded-full flex items-center justify-center text-gray-700 text-2xl font-bold ${avatarColor} flex-shrink-0`} style={{width: '60px', height: '60px'}}>
        {profile.full_name ? profile.full_name[0].toUpperCase() : '👤'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-900 text-lg truncate">
            {profile.full_name || 'Anonymous'}
          </h3>
          {isCurrentUser && (
            <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">YOU</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-500">⚡ Level {Math.floor((profile.total_xp || 0) / 100)}</span>
          <RankChangeIndicator change={profile.rankChange} />
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <div className="font-bold text-gray-500 text-xl">{profile.total_xp?.toLocaleString() || '0'} XP</div>
      </div>
    </div>
  );
}

export default function LeaderboardClient({ initialLeaderboard, currentUserProfile, userId }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cachedData, setCachedData] = useState({});
  const [previousRanks, setPreviousRanks] = useState({});

  useEffect(() => {
    trackLeaderboardView();
    const ranks = {};
    initialLeaderboard.forEach(profile => { ranks[profile.id] = profile.rank; });
    setPreviousRanks(ranks);
  }, []);

  const loadLeaderboard = useCallback(async (skipCache = false) => {
    const cacheKey = 'leaderboard';
    
    if (!skipCache && cachedData[cacheKey]) {
      const cacheAge = Date.now() - cachedData[cacheKey].timestamp;
      if (cacheAge < CACHE_DURATION) {
        setLeaderboard(cachedData[cacheKey].data);
        return;
      }
    }

    setLoading(true);
    setError(null);
    
    try {
      const query = supabase
        .from('profiles')
        .select('id, full_name, total_xp, current_streak, lessons_completed, last_activity_date')
        .order('total_xp', { ascending: false })
        .limit(100);

      const { data: leaderboardData, error: fetchError } = await query;
      if (fetchError) throw fetchError;

      // Sequential ranking (no ties) - each user gets unique rank
      const rankedData = leaderboardData.map((profile, index) => ({
        ...profile,
        rank: index + 1, // Sequential: 1, 2, 3, 4, 5...
        isCurrentUser: profile.id === userId,
        rankChange: previousRanks[profile.id] ? previousRanks[profile.id] - (index + 1) : 0,
      }));

      setLeaderboard(rankedData);
      setCachedData(prev => ({ ...prev, [cacheKey]: { data: rankedData, timestamp: Date.now() } }));

      const newRanks = {};
      rankedData.forEach(profile => { newRanks[profile.id] = profile.rank; });
      setPreviousRanks(newRanks);

    } catch (error) {
      setError('Failed to load leaderboard. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [supabase, userId, cachedData, previousRanks]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const getCurrentUserRank = () => {
    const user = leaderboard.find(u => u.isCurrentUser);
    return user ? user.rank : null;
  };

  const totalPages = Math.ceil(leaderboard.length / ITEMS_PER_PAGE);
  const paginatedLeaderboard = leaderboard.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const currentUserRank = getCurrentUserRank();

  const handleJumpToMyRank = () => {
    const userIndex = leaderboard.findIndex(u => u.isCurrentUser);
    if (userIndex !== -1) {
      setCurrentPage(Math.floor(userIndex / ITEMS_PER_PAGE) + 1);
      document.getElementById('leaderboard-list')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="p-4">
            <button
              onClick={() => router.push('/dashboard/lessons')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold">Back</span>
            </button>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
              </div>
              <button
                onClick={() => loadLeaderboard(true)}
                disabled={loading}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="m-4 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800 text-sm font-bold">{error}</p>
          </div>
        )}

        <div className="p-4 pt-2">
          <LeaderboardPrompt 
            hasName={!!currentUserProfile?.full_name}
            onAddName={() => router.push('/dashboard/more')}
          />
        </div>

        {/* Leaderboard List */}
        <div id="leaderboard-list" className="divide-y divide-gray-200">
          {loading && !leaderboard.length ? (
            <SkeletonLoader count={10} />
          ) : paginatedLeaderboard.length > 0 ? (
            paginatedLeaderboard.map((profile) => (
              <LeaderboardItem
                key={profile.id}
                profile={profile}
                isCurrentUser={profile.isCurrentUser}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-bold">No learners yet</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 font-bold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Jump to Rank */}
        {currentUserRank && currentUserRank > 10 && (
          <button
            onClick={handleJumpToMyRank}
            className="fixed bottom-20 right-4 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 font-bold text-sm flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Jump to #{currentUserRank}
          </button>
        )}
      </div>
    </div>
  );
}