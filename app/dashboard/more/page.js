import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import MoreClient from './moreClient';

export default async function MorePage() {
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

  return (
    <MoreClient
      user={user}
      profile={profile}
    />
  );
}