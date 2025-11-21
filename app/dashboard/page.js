'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  BookOpen,
  PlayCircle,
  CheckCircle,
  Lock,
  Target,
  User,
  Trophy,
  Flame,
  Zap,
} from 'lucide-react';

export default function LessonsPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonProgress, setLessonProgress] = useState([]);
  const [todayActivity, setTodayActivity] = useState(null);

  // Replace with your actual lessons from /lib/data/lessons.js
  const availableLessons = [
    { id: 1, slug: 'greetings-basics', title: 'Greetings & Basics', difficulty: 'Beginner', estimatedTime: 10, icon: '👋' },
    { id: 2, slug: 'pashto-alphabet', title: 'Pashto Alphabet', difficulty: 'Beginner', estimatedTime: 15, icon: '🔤' },
    { id: 3, slug: 'numbers-counting', title: 'Numbers & Counting', difficulty: 'Beginner', estimatedTime: 12, icon: '🔢' },
    { id: 4, slug: 'family-members', title: 'Family Members', difficulty: 'Beginner', estimatedTime: 10, icon: '👨‍👩‍👧‍👦' },
    { id: 5, slug: 'common-phrases', title: 'Common Phrases', difficulty: 'Intermediate', estimatedTime: 15, icon: '💬' },
    { id: 6, slug: 'food-drinks', title: 'Food & Drinks', difficulty: 'Intermediate', estimatedTime: 12, icon: '🍽️' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);

      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id);
      setLessonProgress(progressData || []);

      const today = new Date().toISOString().split('T')[0];
      const { data: todayData } = await supabase
        .from('daily_activity')
        .select('*')
        .eq('user_id', user.id)
        .eq('activity_date', today)
        .single();
      setTodayActivity(todayData);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLessonStatus = (lessonId) => {
    const progress = lessonProgress.find(p => p.lesson_id === lessonId);
    if (!progress) return { status: 'locked', score: null };
    if (progress.completed) return { status: 'completed', score: progress.score };
    return { status: 'in-progress', score: null };
  };

  const getDailyGoalProgress = () => {
    if (!todayActivity || !profile) return 0;
    return Math.min((todayActivity.time_spent_minutes / profile.daily_goal_minutes) * 100, 100);
  };

  const getNextLesson = () => {
    for (const lesson of availableLessons) {
      const status = getLessonStatus(lesson.id);
      if (status.status !== 'completed') return lesson;
    }
    return availableLessons[0];
  };

  const calculateLevel = (xp) => Math.floor(xp / 1000) + 1;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const nextLesson = getNextLesson();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">Puhana</div>
              <div className="hidden md:flex items-center gap-6 ml-8">
                <button 
                  onClick={() => router.push('/dashboard/lessons')}
                  className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1"
                >
                  Learn
                </button>
                <button 
                  onClick={() => router.push('/dashboard/alphabets')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Alphabet
                </button>
                <button 
                  onClick={() => router.push('/dashboard/leaderboard')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Leaderboard
                </button>
              </div>
            </div>

            {/* User Stats */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-lg">
                  <Flame className="w-4 h-4 text-orange-600" />
                  <span className="font-bold text-orange-600">{profile?.current_streak || 0}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="font-bold text-purple-600">{profile?.total_xp || 0}</span>
                </div>
              </div>
              
              <button
                onClick={() => router.push('/dashboard/profile')}
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold hover:bg-blue-700 transition-colors"
              >
                {profile?.full_name ? profile.full_name[0].toUpperCase() : <User className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Card - Continue Learning */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium opacity-90 mb-2">Continue Your Journey</div>
              <h2 className="text-3xl font-bold mb-3">{nextLesson.title}</h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {nextLesson.difficulty}
                </span>
                <span className="text-sm opacity-90">
                  ⏱️ {nextLesson.estimatedTime} min
                </span>
              </div>
              <button
                onClick={() => router.push(`/dashboard/lessons/${nextLesson.slug}`)}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all inline-flex items-center gap-2 group"
              >
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Start Lesson
              </button>
            </div>
            <div className="hidden lg:block text-8xl opacity-20">
              {nextLesson.icon}
            </div>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-gray-900">Daily Goal</h3>
            </div>
            <span className="text-sm text-gray-600">
              {todayActivity?.time_spent_minutes || 0} / {profile?.daily_goal_minutes || 15} min
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${getDailyGoalProgress()}%` }}
            />
          </div>
          
          {getDailyGoalProgress() >= 100 && (
            <p className="text-green-600 font-medium text-sm mt-2">🎉 Goal completed today!</p>
          )}
        </div>

        {/* Lessons Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Lessons</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableLessons.map((lesson, index) => {
              const { status, score } = getLessonStatus(lesson.id);
              const isLocked = index > 0 && getLessonStatus(availableLessons[index - 1].id).status !== 'completed';

              return (
                <div
                  key={lesson.id}
                  onClick={() => !isLocked && router.push(`/dashboard/lessons/${lesson.slug}`)}
                  className={`bg-white rounded-xl shadow-lg p-6 transition-all ${
                    isLocked
                      ? 'opacity-60 cursor-not-allowed'
                      : 'cursor-pointer hover:shadow-xl hover:scale-105'
                  }`}
                >
                  {/* Lesson Icon & Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-5xl ${isLocked ? 'grayscale' : ''}`}>
                      {lesson.icon}
                    </div>
                    {isLocked ? (
                      <Lock className="w-6 h-6 text-gray-400" />
                    ) : status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : status === 'in-progress' ? (
                      <PlayCircle className="w-6 h-6 text-blue-500" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                    )}
                  </div>

                  {/* Lesson Title & Details */}
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {lesson.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span>{lesson.difficulty}</span>
                    <span>•</span>
                    <span>{lesson.estimatedTime} min</span>
                  </div>

                  {/* Progress/Score */}
                  {!isLocked && status === 'completed' && (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Best Score</span>
                        <span className={`font-bold ${score === 100 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${score === 100 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      {score === 100 && (
                        <p className="text-yellow-600 text-sm font-medium mt-2">
                          ⭐ Perfect Score!
                        </p>
                      )}
                    </div>
                  )}

                  {!isLocked && status === 'in-progress' && (
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <p className="text-blue-600 text-sm font-medium">In Progress</p>
                    </div>
                  )}

                  {isLocked && (
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-gray-500 text-sm">Complete previous lesson</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <button
            onClick={() => router.push('/dashboard/alphabets')}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all text-left"
          >
            <div className="text-3xl mb-2">🔤</div>
            <h3 className="font-bold text-gray-900">Practice Alphabet</h3>
            <p className="text-sm text-gray-600">Master Pashto script</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/profile')}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all text-left"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-bold text-gray-900">View Stats</h3>
            <p className="text-sm text-gray-600">Track your progress</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/leaderboard')}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all text-left"
          >
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-bold text-gray-900">Leaderboard</h3>
            <p className="text-sm text-gray-600">Compete with others</p>
          </button>
        </div>
      </div>
    </div>
  );
}