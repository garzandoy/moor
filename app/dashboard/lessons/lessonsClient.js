'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
  PlayCircle,
  CheckCircle,
  Star,
  Trophy,
  Lock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function LessonsClient({ profile, lessonProgress: initialLessonProgress, isGuest = false }) {
  const router = useRouter();
  const supabase = createClient();
  const [currentView, setCurrentView] = useState({ section: 1, unit: 1, unitTitle: 'Greetings & Introductions' });
  const [guestProgress, setGuestProgress] = useState([]);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonProgress, setLessonProgress] = useState(initialLessonProgress);
  const unitRefs = useRef({});

  // Load guest progress from localStorage
  useEffect(() => {
    if (isGuest && typeof window !== 'undefined') {
      const saved = localStorage.getItem('guest_progress');
      if (saved) {
        setGuestProgress(JSON.parse(saved));
      }
    }
  }, [isGuest]);

  // Reload lesson progress from database when component mounts or comes back into view
  useEffect(() => {
    if (!isGuest && profile) {
      const reloadProgress = async () => {
        const { data } = await supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', profile.id);
        
        if (data) {
          setLessonProgress(data);
        }
      };

      reloadProgress();

      // Also reload when window regains focus (user comes back from lesson)
      const handleFocus = () => {
        reloadProgress();
      };

      window.addEventListener('focus', handleFocus);
      return () => window.removeEventListener('focus', handleFocus);
    }
  }, [isGuest, profile, supabase]);

  // Separate effect for scroll restoration
  useEffect(() => {
    const justCompleted = localStorage.getItem('justCompletedLesson');
    console.log('🔍 Checking for completed lesson:', justCompleted);
    
    if (justCompleted) {
      console.log('📍 Found completed lesson, scrolling to:', justCompleted);
      localStorage.removeItem('justCompletedLesson');
      
      setTimeout(() => {
        const lessonElement = document.querySelector(`[data-lesson-id="${justCompleted}"]`);
        console.log('🎯 Found lesson element:', lessonElement);
        
        if (lessonElement) {
          lessonElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          console.log('✅ Scrolled to lesson!');
        } else {
          console.log('❌ Lesson element not found');
        }
      }, 500);
    }
  }, [lessonProgress]); // Run when lessonProgress updates

  // Structured lesson data
  const lessonStructure = {
    section: 1,
    title: "Pashto Fundamentals",
    units: [
      {
        id: 1,
        title: "Greetings & Introductions",
        icon: "👋",
        color: "from-[#8B1538] to-[#660C21]",
        lessons: [
          { id: 1, slug: 'basic-greetings', title: 'Basic Greetings', difficulty: 'Beginner' },
          { id: 2, slug: 'introducing-yourself', title: 'Introducing Yourself', difficulty: 'Beginner' },
          { id: 3, slug: 'asking-names', title: 'Asking Names', difficulty: 'Beginner' },
        ]
      },
      {
        id: 2,
        title: "Numbers & Counting",
        icon: "🔢",
        color: "from-emerald-500 to-teal-600",
        lessons: [
          { id: 4, slug: 'numbers-1-10', title: 'Numbers 1-10', difficulty: 'Beginner' },
          { id: 5, slug: 'numbers-11-20', title: 'Numbers 11-20', difficulty: 'Beginner' },
          { id: 6, slug: 'counting-objects', title: 'Counting Objects', difficulty: 'Beginner' },
        ]
      },
      {
        id: 3,
        title: "Family & Relationships",
        icon: "👨‍👩‍👧‍👦",
        color: "from-violet-500 to-purple-600",
        lessons: [
          { id: 7, slug: 'immediate-family', title: 'Immediate Family', difficulty: 'Beginner' },
          { id: 8, slug: 'extended-family', title: 'Extended Family', difficulty: 'Beginner' },
          { id: 9, slug: 'describing-relationships', title: 'Describing Relationships', difficulty: 'Intermediate' },
        ]
      },
      {
        id: 4,
        title: "Food & Dining",
        icon: "🍽️",
        color: "from-orange-500 to-rose-600",
        lessons: [
          { id: 10, slug: 'common-foods', title: 'Common Foods', difficulty: 'Beginner' },
          { id: 11, slug: 'at-restaurant', title: 'At the Restaurant', difficulty: 'Intermediate' },
          { id: 12, slug: 'cooking-terms', title: 'Cooking Terms', difficulty: 'Intermediate' },
        ]
      },
      {
        id: 5,
        title: "Daily Activities",
        icon: "🌅",
        color: "from-amber-500 to-orange-600",
        lessons: [
          { id: 13, slug: 'morning-routine', title: 'Morning Routine', difficulty: 'Intermediate' },
          { id: 14, slug: 'work-activities', title: 'Work Activities', difficulty: 'Intermediate' },
          { id: 15, slug: 'evening-routine', title: 'Evening Routine', difficulty: 'Intermediate' },
        ]
      },
      {
        id: 6,
        title: "Travel & Directions",
        icon: "🗺️",
        color: "from-rose-500 to-[#8B1538]",
        lessons: [
          { id: 16, slug: 'asking-directions', title: 'Asking Directions', difficulty: 'Intermediate' },
          { id: 17, slug: 'transportation', title: 'Transportation', difficulty: 'Intermediate' },
          { id: 18, slug: 'locations-places', title: 'Locations & Places', difficulty: 'Intermediate' },
        ]
      },
      {
        id: 7,
        title: "Shopping & Market",
        icon: "🛒",
        color: "from-pink-500 to-fuchsia-600",
        lessons: [
          { id: 19, slug: 'at-market', title: 'At the Market', difficulty: 'Intermediate' },
          { id: 20, slug: 'bargaining', title: 'Bargaining', difficulty: 'Advanced' },
          { id: 21, slug: 'money-prices', title: 'Money & Prices', difficulty: 'Intermediate' },
        ]
      },
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const unitId = parseInt(entry.target.dataset.unitId);
            const unit = lessonStructure.units.find(u => u.id === unitId);
            if (unit) {
              setCurrentView({
                section: lessonStructure.section,
                unit: unit.id,
                unitTitle: unit.title
              });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(unitRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getLessonStatus = (lesson) => {
    if (isGuest) {
      const status = guestProgress.includes(lesson.id) ? 'completed' : 'not-started';
      console.log(`[GUEST] Lesson ${lesson.slug} status:`, status);
      return status;
    }
    
    // Match by slug instead of ID (more reliable!)
    const progress = lessonProgress.find(p => p.lesson_slug === lesson.slug);
    console.log(`[USER] Lesson ${lesson.slug}:`, {
      progress,
      completed: progress?.completed,
      started: progress?.started,
      allProgress: lessonProgress
    });
    
    if (progress?.completed) return 'completed';
    if (progress?.started) return 'in-progress';
    return 'not-started';
  };

  const getCompletionPercentage = (lessonId) => {
    if (isGuest) return 0;
    const progress = lessonProgress.find(p => p.lesson_id === lessonId);
    return progress?.completion_percentage || 0;
  };

  const isLessonUnlocked = (lessonId) => {
    if (isGuest) {
      // Only lessons 1-3 unlocked for guests
      return lessonId <= 3;
    }
    // All lessons unlocked for logged-in users
    return true;
  };

  const handleLessonClick = (lesson) => {
    if (isGuest && lesson.id > 3) {
      // Show signup modal for locked lessons
      setSelectedLesson(lesson);
      setShowSignupModal(true);
    } else {
      router.push(`/dashboard/lessons/${lesson.slug}`);
    }
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Beginner') return 'text-green-600 bg-green-100';
    if (difficulty === 'Intermediate') return 'text-yellow-600 bg-yellow-100';
    if (difficulty === 'Advanced') return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  const completedCount = isGuest ? guestProgress.length : (profile?.lessons_completed || 0);
  const totalLessons = lessonStructure.units.reduce((acc, u) => acc + u.lessons.length, 0);

  return (
    <div className="relative min-h-screen">
      {/* Guest Banner */}
      {isGuest && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200 py-4 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                <div>
                  <p className="font-semibold text-gray-900">Try 3 Free Lessons!</p>
                  <p className="text-sm text-gray-700">Sign up to unlock all 21 lessons and save your progress</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{completedCount}/3</div>
                  <div className="text-xs text-gray-600">Completed</div>
                </div>
                
                <Link
                  href="/register"
                  className="bg-[#8B1538] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#660C21] transition-all shadow-sm flex items-center gap-2"
                >
                  Unlock All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      <div className={`sticky ${isGuest ? 'top-[88px]' : 'top-0'} z-10 bg-gradient-to-r from-[#8B1538] to-[#660C21] shadow-lg`}>
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <span className="text-xl md:text-2xl">{lessonStructure.units.find(u => u.id === currentView.unit)?.icon || '📚'}</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs md:text-xs text-white/80 font-medium truncate">Section {currentView.section} • Unit {currentView.unit}</div>
                <div className="text-sm md:text-lg font-bold truncate">{currentView.unitTitle}</div>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <div className="text-xs text-white/80">Progress</div>
              <div className="text-sm md:text-lg font-bold">{completedCount}/{isGuest ? 3 : totalLessons}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Path */}
      <div className="max-w-3xl mx-auto py-8 md:py-12 px-4 md:px-6">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-rose-300 via-[#8B1538] to-amber-300 transform -translate-x-1/2 rounded-full"></div>

          {/* Units */}
          {lessonStructure.units.map((unit) => (
            <div 
              key={unit.id} 
              ref={(el) => (unitRefs.current[unit.id] = el)}
              data-unit-id={unit.id}
              className="mb-12 md:mb-16 scroll-mt-20"
            >
              {/* Unit Header */}
              <div className="flex justify-center mb-6 md:mb-8">
                <div className={`bg-gradient-to-r ${unit.color} text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg flex items-center gap-2 relative z-10`}>
                  <span className="text-xl md:text-2xl">{unit.icon}</span>
                  <div>
                    <div className="text-xs opacity-90">Unit {unit.id}</div>
                    <div className="font-bold text-sm md:text-base">{unit.title}</div>
                  </div>
                  {isGuest && unit.id > 1 && (
                    <Lock className="w-4 h-4 ml-2" />
                  )}
                </div>
              </div>

              {/* Lessons in Unit */}
              <div className="space-y-6 md:space-y-8">
                {unit.lessons.map((lesson, index) => {
                  const status = getLessonStatus(lesson);
                  const unlocked = isLessonUnlocked(lesson.id);
                  const completion = getCompletionPercentage(lesson.id);
                  const isOdd = index % 2 === 1;

                  return (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-4 md:gap-8 ${isOdd ? 'flex-row-reverse' : ''}`}
                      data-lesson-id={lesson.id}
                    >
                      {/* Lesson Card */}
                      <div className="flex-1">
                        <button
                          onClick={() => handleLessonClick(lesson)}
                          className={`w-full text-left transition-all duration-300 ${unlocked ? 'hover:scale-105' : 'cursor-pointer'}`}
                        >
                          <div className={`bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border-2 ${
                            !unlocked
                              ? 'border-gray-300 bg-gray-50 opacity-60'
                              : status === 'completed' 
                              ? 'border-[#D4AF37] bg-gradient-to-br from-yellow-50 to-amber-50 shadow-amber-200' 
                              : status === 'in-progress'
                              ? 'border-[#8B1538] bg-rose-50'
                              : 'border-gray-200 hover:border-[#8B1538] hover:shadow-xl'
                          }`}>
                            <div className="flex items-start justify-between mb-2 md:mb-3">
                              <div className="flex-1 min-w-0 pr-2">
                                <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1 truncate">{lesson.title}</h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                                    {lesson.difficulty}
                                  </span>
                                  {!unlocked && (
                                    <span className="text-xs text-gray-500">🔒 Sign up to unlock</span>
                                  )}
                                  {status === 'completed' && (
                                    <span className="text-xs bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-white px-2 py-1 rounded-full font-bold shadow-sm">
                                      ★ Completed
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Status Icon */}
                              <div className="flex-shrink-0">
                                {!unlocked ? (
                                  <Lock className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                                ) : status === 'completed' ? (
                                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#D4AF37] to-yellow-600 rounded-full flex items-center justify-center shadow-md">
                                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                  </div>
                                ) : status === 'in-progress' ? (
                                  <PlayCircle className="w-5 h-5 md:w-6 md:h-6 text-[#8B1538]" />
                                ) : (
                                  <Star className="w-5 h-5 md:w-6 md:h-6 text-[#D4AF37]" />
                                )}
                              </div>
                            </div>

                            {/* Progress Bar */}
                            {status === 'in-progress' && unlocked && (
                              <div className="mt-2 md:mt-3">
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                  <span>Progress</span>
                                  <span>{completion}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                                  <div
                                    className="bg-gradient-to-r from-[#8B1538] to-[#660C21] h-1.5 md:h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${completion}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </button>
                      </div>

                      {/* Center Node */}
                      <div className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4 relative z-10">
                        <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 md:border-4 ${
                          !unlocked
                            ? 'bg-gray-300 border-gray-200'
                            : status === 'completed'
                            ? 'bg-gradient-to-br from-[#D4AF37] to-yellow-600 border-yellow-300 shadow-md'
                            : status === 'in-progress'
                            ? 'bg-[#8B1538] border-rose-300'
                            : 'bg-white border-gray-300'
                        }`}></div>
                      </div>

                      {/* Empty Space */}
                      <div className="flex-1"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* End Point */}
          <div className="flex justify-center mt-8">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg flex items-center gap-2 relative z-10">
              <Trophy className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-bold text-sm md:text-base">More lessons coming soon!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#8B1538]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Unlock This Lesson</h3>
              <p className="text-gray-600">Sign up free to access all 21 lessons and save your progress!</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Unlock all 21 interactive lessons</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Save your progress automatically</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Earn XP and build daily streaks</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">Compete on the leaderboard</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/register"
                className="bg-gradient-to-r from-[#8B1538] to-[#660C21] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-center"
              >
                Sign Up Free
              </Link>
              <button
                onClick={() => setShowSignupModal(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Maybe Later
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              100% free forever • No credit card required
            </p>
          </div>
        </div>
      )}
    </div>
  );
}