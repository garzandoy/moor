import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LeaderboardClient from './leaderboardClient';

export default async function LeaderboardPage() {
  const supabase = await createClient();

  // Get user server-side
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Get current user's profile
  const { data: currentUserProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get initial leaderboard data (all-time, by XP)
  const { data: leaderboardData } = await supabase
    .from('profiles')
    .select('id, full_name, total_xp, current_streak, longest_streak, lessons_completed, last_activity_date')
    .order('total_xp', { ascending: false })
    .limit(100);

  // Calculate rankings
  const rankedData = leaderboardData.map((profile, index) => ({
    ...profile,
    rank: index + 1,
    isCurrentUser: profile.id === user.id,
  }));

  // Pass data to client component
  return (
    <LeaderboardClient
      initialLeaderboard={rankedData}
      currentUserProfile={currentUserProfile}
      userId={user.id}
    />
  );
}