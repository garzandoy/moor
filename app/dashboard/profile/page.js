import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProfileClient from './profileClient';

export default async function ProfilePage() {
  const supabase = await createClient();

  // Get user server-side
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (!user || userError) {
    redirect('/login');
  }

  // Get profile with error handling
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // If profile doesn't exist, create it
  if (!profile || profileError) {
    const { data: newProfile } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        full_name: '',
        total_xp: 0,
        current_streak: 0,
        longest_streak: 0,
        lessons_completed: 0,
        total_exercises_completed: 0,
        daily_goal_minutes: 15,
        native_language: 'English',
        notification_enabled: false,
      })
      .select()
      .single();
    
    return (
      <ProfileClient
        profile={newProfile}
        achievements={[]}
        weekActivity={[]}
      />
    );
  }

  // Get achievements
  const { data: achievements } = await supabase
    .from('achievements')
    .select('*')
    .eq('user_id', user.id)
    .order('earned_at', { ascending: false });

  // Get week activity for chart
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const { data: weekActivity } = await supabase
    .from('daily_activity')
    .select('*')
    .eq('user_id', user.id)
    .gte('activity_date', weekAgo.toISOString().split('T')[0])
    .order('activity_date', { ascending: true });

  return (
    <ProfileClient
      profile={profile}
      achievements={achievements || []}
      weekActivity={weekActivity || []}
    />
  );
}