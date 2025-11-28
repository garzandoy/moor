'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  BookOpen,
  PlayCircle,
  CheckCircle,
  Lock,
  Star,
  Trophy,
  Flame,
  Zap,
  Crown,
  ChevronRight,
} from 'lucide-react';

export default function VerticalLessonPath() {
  const router = useRouter();
  const supabase = createClient();
  
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonProgress, setLessonProgress] = useState([]);

  // Lessons ordered NORMALLY - Lesson 1 at TOP, newest at BOTTOM
  const lessons = [
    // Unit 1 - Beginner (Start here)
    { id: 1, slug: 'introduction', title: 'Introduction to Pashto', difficulty: 'Beginner', icon: '🎯', unit: 1 },
    { id: 2, slug: 'greetings-basics', title: 'Greetings & Basics', difficulty: 'Beginner', icon: '👋', unit: 1 },
    { id: 3, slug: 'pashto-alphabet', title: 'Pashto Alphabet', difficulty: 'Beginner', icon: '🔤', unit: 1 },
    { id: 4, slug: 'numbers-counting', title: 'Numbers & Counting', difficulty: 'Beginner', icon: '🔢', unit: 1 },
    { id: 5, slug: 'family-members', title: 'Family Members', difficulty: 'Beginner', icon: '👨‍👩‍👧‍👦', unit: 1 },
    { id: 6, slug: 'common-phrases', title: 'Common Phrases', difficulty: 'Beginner', icon: '💬', unit: 1 },
    
    // Unit 2
    { id: 7, slug: 'food-drinks', title: 'Food & Drinks', difficulty: 'Beginner', icon: '🍽️', unit: 2 },
    { id: 8, slug: 'places-locations', title: 'Places & Locations', difficulty: 'Beginner', icon: '🏛️', unit: 2 },
    { id: 9, slug: 'daily-routine', title: 'Daily Routine', difficulty: 'Intermediate', icon: '🌅', unit: 2 },
    { id: 10, slug: 'body-parts', title: 'Body Parts', difficulty: 'Intermediate', icon: '👤', unit: 2 },
    { id: 11, slug: 'transportation', title: 'Transportation', difficulty: 'Intermediate', icon: '🚗', unit: 2 },
    
    // Unit 3
    { id: 12, slug: 'common-verbs', title: 'Common Verbs', difficulty: 'Intermediate', icon: '🏃', unit: 3 },
    { id: 13, slug: 'colors-adjectives', title: 'Colors & Adjectives', difficulty: 'Intermediate', icon: '🎨', unit: 3 },
    { id: 14, slug: 'time-expressions', title: 'Time Expressions', difficulty: 'Intermediate', icon: '⏰', unit: 3 },
    { id: 15, slug: 'asking-directions', title: 'Asking Directions', difficulty: 'Intermediate', icon: '🗺️', unit: 3 },
    { id: 16, slug: 'shopping-market', title: 'Shopping at Market', difficulty: 'Intermediate', icon: '🛒', unit: 3 },
    { id: 17, slug: 'weather-seasons', title: 'Weather & Seasons', difficulty: 'Intermediate', icon: '🌤️', unit: 3 },
    
    // Unit 4 - Advanced
    { id: 18, slug: 'storytelling', title: 'Storytelling', difficulty: 'Advanced', icon: '📖', unit: 4 },
    { id: 19, slug: 'business-pashto', title: 'Business Pashto', difficulty: 'Advanced', icon: '💼', unit: 4 },
    { id: 20, slug: 'advanced-conversations', title: 'Advanced Conversations', difficulty: 'Advanced', icon: '🗣️', unit: 4 },
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

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLessonStatus = (lessonId) => {
    const progress = lessonProgress.find(p => p.lesson_id === lessonId);
    if (progress?.completed) return 'completed';
    if (progress?.started) return 'in-progress';
    return 'not-started';
  };

  const getCompletionPercentage = (lessonId) => {
    const progress = lessonProgress.find(p => p.lesson_id === lessonId);
    return progress?.completion_percentage || 0;
  };

  const isLessonUnlocked = (lesson, index) => {
    // All lessons unlocked for now
    return true;
  };

  const handleLessonClick = (lesson, unlocked) => {
    if (!unlocked) return;
    router.push(`/dashboard/lessons/${lesson.slug}`);
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Beginner') return 'text-green-600 bg-green-100';
    if (difficulty === 'Intermediate') return 'text-yellow-600 bg-yellow-100';
    if (difficulty === 'Advanced') return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getUnitColor = (unit) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
    ];
    return colors[(unit - 1) % colors.length];
  };

  // Group lessons by unit
  const groupedLessons = lessons.reduce((acc, lesson, index) => {
    const unit = lesson.unit;
    if (!acc[unit]) {
      acc[unit] = [];
    }
    acc[unit].push({ ...lesson, originalIndex: index });
    return acc;
  }, {});

  const units = Object.keys(groupedLessons).sort((a, b) => a - b); // Normal order (1, 2, 3, 4)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Stats */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Learn Pashto</h1>
            <p className="text-sm text-gray-600">Your learning path</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-xs text-gray-600">Streak</div>
                <div className="font-bold text-orange-600">{profile?.current_streak || 0}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="text-xs text-gray-600">Total XP</div>
                <div className="font-bold text-yellow-600">{profile?.total_xp || 0}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-xs text-gray-600">Completed</div>
                <div className="font-bold text-purple-600">{profile?.lessons_completed || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Lesson Path */}
      <div className="max-w-2xl mx-auto py-12 px-6">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 transform -translate-x-1/2 rounded-full"></div>

          {/* Units */}
          {units.map((unit, unitIndex) => (
            <div key={unit} className="mb-16">
              {/* Unit Header */}
              <div className="flex justify-center mb-8">
                <div className={`bg-gradient-to-r ${getUnitColor(parseInt(unit))} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 relative z-10`}>
                  <Crown className="w-5 h-5" />
                  <span className="font-bold">Unit {unit}</span>
                </div>
              </div>

              {/* Lessons in Unit */}
              <div className="space-y-8">
                {groupedLessons[unit].map((lesson) => {
                  const status = getLessonStatus(lesson.id);
                  const unlocked = isLessonUnlocked(lesson, lesson.originalIndex);
                  const completion = getCompletionPercentage(lesson.id);
                  const isOdd = lesson.id % 2 === 1;

                  return (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-8 ${isOdd ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Lesson Card */}
                      <div className="flex-1">
                        <button
                          onClick={() => handleLessonClick(lesson, unlocked)}
                          disabled={!unlocked}
                          className={`w-full text-left transition-all duration-300 ${
                            unlocked ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed opacity-60'
                          }`}
                        >
                          <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${
                            status === 'completed' 
                              ? 'border-green-400 bg-green-50' 
                              : status === 'in-progress'
                              ? 'border-blue-400 bg-blue-50'
                              : unlocked
                              ? 'border-gray-200 hover:border-blue-400 hover:shadow-xl'
                              : 'border-gray-200'
                          }`}>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="text-4xl">{lesson.icon}</div>
                                <div>
                                  <h3 className="font-bold text-gray-900 text-lg">{lesson.title}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                                      {lesson.difficulty}
                                    </span>
                                    <span className="text-xs text-gray-500">Lesson {lesson.id}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Status Icon */}
                              <div className="flex-shrink-0">
                                {!unlocked ? (
                                  <Lock className="w-6 h-6 text-gray-400" />
                                ) : status === 'completed' ? (
                                  <CheckCircle className="w-6 h-6 text-green-600" />
                                ) : status === 'in-progress' ? (
                                  <PlayCircle className="w-6 h-6 text-blue-600" />
                                ) : (
                                  <Star className="w-6 h-6 text-yellow-500" />
                                )}
                              </div>
                            </div>

                            {/* Progress Bar */}
                            {status === 'in-progress' && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                  <span>Progress</span>
                                  <span>{completion}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${completion}%` }}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Start Button */}
                            {unlocked && status === 'not-started' && (
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-sm text-gray-600">Ready to start</span>
                                <ChevronRight className="w-5 h-5 text-blue-600" />
                              </div>
                            )}
                          </div>
                        </button>
                      </div>

                      {/* Center Node */}
                      <div className="flex-shrink-0 w-4 h-4 relative z-10">
                        <div className={`w-4 h-4 rounded-full border-4 ${
                          status === 'completed'
                            ? 'bg-green-500 border-green-300'
                            : status === 'in-progress'
                            ? 'bg-blue-500 border-blue-300'
                            : unlocked
                            ? 'bg-white border-gray-300'
                            : 'bg-gray-300 border-gray-200'
                        }`}></div>
                      </div>

                      {/* Empty Space (for alternating layout) */}
                      <div className="flex-1"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* End Point */}
          <div className="flex justify-center mt-8">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg flex items-center gap-2 relative z-10">
              <Trophy className="w-6 h-6" />
              <span className="font-bold text-lg">More lessons coming soon!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}