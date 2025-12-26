// lib/utils/streakChecker.js
// Call this on every dashboard visit to check/update streaks

import { createClient } from '@/lib/supabase/client';

export async function checkAndUpdateStreak(userId) {
  const supabase = createClient();
  
  try {
    // Get user's profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!profile) return;

    const today = new Date().toISOString().split('T')[0];
    const lastActive = profile.last_active_date;

    // If no last active date, this is first time
    if (!lastActive) {
      await supabase
        .from('profiles')
        .update({
          last_active_date: today,
          current_streak: 1,
          longest_streak: Math.max(profile.longest_streak || 0, 1),
        })
        .eq('id', userId);
      return;
    }

    // Calculate days difference
    const lastActiveDate = new Date(lastActive);
    const todayDate = new Date(today);
    const diffTime = todayDate - lastActiveDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Same day - no change
      return;
    } else if (diffDays === 1) {
      // Consecutive day - increment streak
      const newStreak = (profile.current_streak || 0) + 1;
      await supabase
        .from('profiles')
        .update({
          last_active_date: today,
          current_streak: newStreak,
          longest_streak: Math.max(profile.longest_streak || 0, newStreak),
        })
        .eq('id', userId);
    } else {
      // Missed a day - reset streak
      await supabase
        .from('profiles')
        .update({
          last_active_date: today,
          current_streak: 1, // Reset to 1 (today counts)
        })
        .eq('id', userId);
    }
  } catch (error) {
    console.error('Error checking streak:', error);
  }
}

// Check if user has completed any activity today
export async function recordDailyActivity(userId) {
  const supabase = createClient();
  const today = new Date().toISOString().split('T')[0];

  try {
    const { data: activity } = await supabase
      .from('daily_activity')
      .select('*')
      .eq('user_id', userId)
      .eq('activity_date', today)
      .single();

    // If no activity today, just checking in counts for streak
    if (!activity) {
      await supabase
        .from('daily_activity')
        .insert({
          user_id: userId,
          activity_date: today,
          exercises_completed: 0,
          xp_earned: 0,
          time_spent_minutes: 0,
        });
    }
  } catch (error) {
    // Ignore error if record already exists
  }
}