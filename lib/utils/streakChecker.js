// lib/utils/streakChecker.js
// Timezone-aware streak system

import { createClient } from '@/lib/supabase/client';

// Get user's local date based on their timezone
const getUserLocalDate = (timezone = 'UTC') => {
  try {
    return new Date().toLocaleDateString('en-CA', { timeZone: timezone });
  } catch (error) {
    console.error('Invalid timezone:', timezone);
    return new Date().toISOString().split('T')[0]; // Fallback to UTC
  }
};

export async function checkAndUpdateStreak(userId) {
  const supabase = createClient();
  
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!profile) return;

    // Use user's timezone for date calculation
    const userTimezone = profile.timezone || 'UTC';
    const today = getUserLocalDate(userTimezone);
    const lastActive = profile.last_active_date;

    console.log('🕐 Timezone check:', { userTimezone, today, lastActive });

    if (!lastActive) {
      await supabase
        .from('profiles')
        .update({
          last_active_date: today,
          current_streak: 0,
          longest_streak: Math.max(profile.longest_streak || 0, 0),
        })
        .eq('id', userId);
      return;
    }

    const lastActiveDate = new Date(lastActive + 'T00:00:00Z');
    const todayDate = new Date(today + 'T00:00:00Z');
    const diffTime = todayDate - lastActiveDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    console.log('📅 Days difference:', diffDays);

    if (diffDays === 0) {
      return; // Same day
    } else if (diffDays === 1) {
      // Consecutive day - update date but wait for completion
      await supabase
        .from('profiles')
        .update({
          last_active_date: today,
        })
        .eq('id', userId);
    } else {
      // Missed days - reset to 0
      console.log('💔 Streak broken! Resetting to 0');
      await supabase
        .from('profiles')
        .update({
          last_active_date: today,
          current_streak: 0,
        })
        .eq('id', userId);
    }
  } catch (error) {
    console.error('Error checking streak:', error);
  }
}

export async function incrementStreakOnCompletion(userId) {
  const supabase = createClient();
  
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!profile) return;

    const userTimezone = profile.timezone || 'UTC';
    const today = getUserLocalDate(userTimezone);

    console.log('🔥 Checking streak increment for:', today);

    // Check if they already completed a lesson today
    const { data: todayActivity } = await supabase
      .from('daily_activity')
      .select('*')
      .eq('user_id', userId)
      .eq('activity_date', today)
      .single();

    // Only increment if this is first activity today
    if (!todayActivity || todayActivity.exercises_completed === 0) {
      const newStreak = (profile.current_streak || 0) + 1;
      
      console.log('✨ Incrementing streak:', profile.current_streak, '→', newStreak);
      
      await supabase
        .from('profiles')
        .update({
          current_streak: newStreak,
          longest_streak: Math.max(profile.longest_streak || 0, newStreak),
          last_active_date: today,
        })
        .eq('id', userId);
    } else {
      console.log('ℹ️ Already completed lesson today, streak stays:', profile.current_streak);
    }
  } catch (error) {
    console.error('Error incrementing streak:', error);
  }
}

// Helper to get user's local date (export for use in other files)
export { getUserLocalDate };