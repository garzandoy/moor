import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LessonsClient from './lessonsClient';

export default async function LessonsPage() {
  const supabase = await createClient();

  // Get user server-side
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get lesson progress
  const { data: lessonProgress } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', user.id);

  // Pass data to client component
  return (
    <LessonsClient
      profile={profile}
      lessonProgress={lessonProgress || []}
    />
  );
}