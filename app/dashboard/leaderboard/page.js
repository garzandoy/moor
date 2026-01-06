import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LeaderboardClient from './leaderboardClient';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Leaderboard | Language Learning App',
  description: 'Compete with learners around the world',
};

export default async function LeaderboardPage() {
  const supabase = await createClient();

  // Get user server-side
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  try {
    // Get current user's profile
    const { data: currentUserProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
    }

    // Get initial leaderboard data (all-time, by XP)
    // Only fetch top 100 to improve performance
    const { data: leaderboardData, error: leaderboardError } = await supabase
      .from('profiles')
      .select('id, full_name, total_xp, current_streak, longest_streak, lessons_completed, last_activity_date')
      .order('total_xp', { ascending: false })
      .limit(100);

    if (leaderboardError) {
      console.error('Error fetching leaderboard:', leaderboardError);
    }

    // Calculate rankings with tie handling
    const rankedData = [];
    let currentRank = 1;
    let previousValue = null;
    let sameRankCount = 0;

    (leaderboardData || []).forEach((profile, index) => {
      const currentValue = profile.total_xp;

      if (previousValue !== null && currentValue < previousValue) {
        currentRank += sameRankCount;
        sameRankCount = 1;
      } else {
        sameRankCount++;
      }

      rankedData.push({
        ...profile,
        rank: currentRank,
        isCurrentUser: profile.id === user.id,
        rankChange: 0, // Initial load, no change
      });

      previousValue = currentValue;
    });

    // Pass data to client component
    return (
      <LeaderboardClient
        initialLeaderboard={rankedData}
        currentUserProfile={currentUserProfile || null}
        userId={user.id}
      />
    );
  } catch (error) {
    console.error('Unexpected error in LeaderboardPage:', error);
    
    // Fallback with empty data
    return (
      <LeaderboardClient
        initialLeaderboard={[]}
        currentUserProfile={null}
        userId={user.id}
      />
    );
  }
}