import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LessonClient from './lessonClient';

export default async function LessonPage({ params }) {
  const supabase = await createClient();
  const { slug } = params;

  // Get user
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

  // Get lesson progress for this specific lesson
  const { data: lessonProgress } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('lesson_slug', slug)
    .single();

  return (
    <LessonClient
      slug={slug}
      profile={profile}
      lessonProgress={lessonProgress}
      userId={user.id}
    />
  );
}