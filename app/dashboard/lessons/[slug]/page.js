import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import LessonClient from './lessonClient';
import { getLessonBySlug } from '@/lib/data/lessons';

export default async function LessonPage({ params }) {
  const supabase = await createClient();
  
  // Await params in Next.js 15
  const { slug } = await params;

  // Get the lesson to check if it's 1-3
  const lesson = getLessonBySlug(slug);
  
  if (!lesson) {
    redirect('/dashboard/lessons');
  }

  // Get user
  const { data: { user } } = await supabase.auth.getUser();
  
  // Guest mode: Allow lessons 1-3 only
  if (!user) {
    if (lesson.id > 3) {
      // Redirect to lessons page if trying to access locked lesson
      redirect('/dashboard/lessons');
    }
    
    // Allow guest access to lessons 1-3
    return (
      <LessonClient
        slug={slug}
        profile={null}
        lessonProgress={null}
        userId={null}
        isGuest={true}
      />
    );
  }

  // Logged-in user: Get their data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

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
      isGuest={false}
    />
  );
}