'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  PlayCircle,
  CheckCircle,
  Star,
  Trophy,
} from 'lucide-react';

export default function LessonsClient({ profile, lessonProgress }) {
  const router = useRouter();
  const [currentView, setCurrentView] = useState({ section: 1, unit: 1, unitTitle: 'Greetings & Introductions' });
  const unitRefs = useRef({});

  // Structured lesson data: 1 Section → 7 Units → 3 Lessons each = 21 lessons
  const lessonStructure = {
    section: 1,
    title: "Pashto Fundamentals",
    units: [
      {
        id: 1,
        title: "Greetings & Introductions",
        icon: "👋",
        color: "from-blue-500 to-indigo-600",
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
          { id: 5, slug: 'numbers-11-50', title: 'Numbers 11-50', difficulty: 'Beginner' },
          { id: 6, slug: 'numbers-50-100', title: 'Numbers 50-100', difficulty: 'Beginner' },
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
        color: "from-cyan-500 to-blue-600",
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
          { id: 21, slug: 'prices-money', title: 'Prices & Money', difficulty: 'Intermediate' },
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

  const isLessonUnlocked = () => {
    return true;
  };

  const handleLessonClick = (lesson) => {
    router.push(`/dashboard/lessons/${lesson.slug}`);
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Beginner') return 'text-green-600 bg-green-100';
    if (difficulty === 'Intermediate') return 'text-yellow-600 bg-yellow-100';
    if (difficulty === 'Advanced') return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="relative min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">{lessonStructure.units.find(u => u.id === currentView.unit)?.icon || '📚'}</span>
              </div>
              <div>
                <div className="text-xs text-white/80 font-medium">Section {currentView.section} • Unit {currentView.unit}</div>
                <div className="text-lg font-bold">{currentView.unitTitle}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-white/80">Your Progress</div>
              <div className="text-lg font-bold">{profile?.lessons_completed || 0}/{lessonStructure.units.reduce((acc, u) => acc + u.lessons.length, 0)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Path */}
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 transform -translate-x-1/2 rounded-full"></div>

          {/* Units */}
          {lessonStructure.units.map((unit) => (
            <div 
              key={unit.id} 
              ref={(el) => (unitRefs.current[unit.id] = el)}
              data-unit-id={unit.id}
              className="mb-16 scroll-mt-20"
            >
              {/* Unit Header */}
              <div className="flex justify-center mb-8">
                <div className={`bg-gradient-to-r ${unit.color} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 relative z-10`}>
                  <span className="text-2xl">{unit.icon}</span>
                  <div>
                    <div className="text-xs opacity-90">Unit {unit.id}</div>
                    <div className="font-bold">{unit.title}</div>
                  </div>
                </div>
              </div>

              {/* Lessons in Unit */}
              <div className="space-y-8">
                {unit.lessons.map((lesson, index) => {
                  const status = getLessonStatus(lesson.id);
                  const unlocked = isLessonUnlocked();
                  const completion = getCompletionPercentage(lesson.id);
                  const isOdd = index % 2 === 1;

                  return (
                    <div
                      key={lesson.id}
                      className={`flex items-center gap-8 ${isOdd ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Lesson Card */}
                      <div className="flex-1">
                        <button
                          onClick={() => handleLessonClick(lesson)}
                          className="w-full text-left transition-all duration-300 hover:scale-105"
                        >
                          <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${
                            status === 'completed' 
                              ? 'border-green-400 bg-green-50' 
                              : status === 'in-progress'
                              ? 'border-blue-400 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-400 hover:shadow-xl'
                          }`}>
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{lesson.title}</h3>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                                  {lesson.difficulty}
                                </span>
                              </div>

                              {/* Status Icon */}
                              <div className="flex-shrink-0">
                                {status === 'completed' ? (
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
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg flex items-center gap-2 relative z-10">
              <Trophy className="w-6 h-6" />
              <span className="font-bold">More lessons coming soon!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}