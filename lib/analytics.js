// lib/analytics.js
// Helper functions to track custom events in Google Analytics

// Track when a user completes a lesson
export const trackLessonCompleted = (lessonSlug, lessonTitle, xpEarned) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'lesson_completed', {
      lesson_slug: lessonSlug,
      lesson_title: lessonTitle,
      xp_earned: xpEarned,
      event_category: 'engagement',
      event_label: lessonTitle,
      value: xpEarned
    });
  }
};

// Track when a user signs up
export const trackSignup = (method = 'email') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sign_up', {
      method: method,
      event_category: 'conversion'
    });
  }
};

// Track when a user starts a lesson
export const trackLessonStarted = (lessonSlug, lessonTitle, isGuest) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'lesson_started', {
      lesson_slug: lessonSlug,
      lesson_title: lessonTitle,
      user_type: isGuest ? 'guest' : 'registered',
      event_category: 'engagement'
    });
  }
};

// Track when guest hits a locked lesson (conversion opportunity)
export const trackLockedLessonView = (lessonSlug) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'locked_lesson_viewed', {
      lesson_slug: lessonSlug,
      event_category: 'conversion',
      event_label: 'signup_prompt_shown'
    });
  }
};

// Track when user clicks "Sign Up" button
export const trackSignupClick = (location) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'signup_button_clicked', {
      button_location: location, // e.g., 'navbar', 'lesson_complete', 'lock_modal'
      event_category: 'conversion'
    });
  }
};

// Track when user completes an exercise (individual question)
export const trackExerciseCompleted = (exerciseType, isCorrect) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exercise_completed', {
      exercise_type: exerciseType, // 'select-word', 'translate-sentence', etc.
      is_correct: isCorrect,
      event_category: 'engagement'
    });
  }
};

// Track streak milestones
export const trackStreakMilestone = (streakDays) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'streak_milestone', {
      streak_days: streakDays,
      event_category: 'achievement',
      event_label: `${streakDays}_day_streak`
    });
  }
};

// Track when user views leaderboard
export const trackLeaderboardView = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'leaderboard_viewed', {
      event_category: 'engagement'
    });
  }
};