import { createClient } from '@/lib/supabase/server';
import LessonsClient from './lessonsClient';

export default async function LessonsPage() {
  const supabase = await createClient();

  // Get user server-side (but DON'T redirect if no user)
  const { data: { user } } = await supabase.auth.getUser();
  
  // Guest mode - no user
  if (!user) {
    return (
      <LessonsClient
        profile={null}
        lessonProgress={[]}
        isGuest={true}
      />
    );
  }

  // Logged-in user - get their data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: lessonProgress } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', user.id);

  return (
    <LessonsClient
      profile={profile}
      lessonProgress={lessonProgress || []}
      isGuest={false}
    />
  );
}