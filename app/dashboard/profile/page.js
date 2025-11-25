import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProfileClient from './profileClient';

export default async function ProfilePage() {
  const supabase = await createClient();

  // Get user server-side
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

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