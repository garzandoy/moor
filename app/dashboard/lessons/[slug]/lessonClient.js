'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { getLessonBySlug } from '@/lib/data/lessons';
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Volume2,
  Trophy,
  Star,
  Sparkles,
} from 'lucide-react';

export default function LessonClient({ slug, profile, lessonProgress, userId, isGuest = false }) {
  const router = useRouter();
  const supabase = createClient();
  const lesson = getLessonBySlug(slug);

  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [showComplete, setShowComplete] = useState(false);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Lesson not found</h1>
          <button
            onClick={() => router.push('/dashboard/lessons')}
            className="text-[#8B1538] hover:underline"
          >
            Back to lessons
          </button>
        </div>
      </div>
    );
  }

  const exercise = lesson.exercises[currentExercise];
  const progress = ((completedExercises.size / lesson.exercises.length) * 100).toFixed(0);

  const handleMultipleChoice = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === exercise.correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setCompletedExercises(new Set([...completedExercises, currentExercise]));
    }
  };

  const handleWordSelect = (word) => {
    const newSelected = [...selectedWords, word];
    setSelectedWords(newSelected);
    
    if (exercise.type === 'tap-words' && newSelected.length === exercise.correctWords.length) {
      const isCorrectAnswer = newSelected.join(' ') === exercise.correctWords.join(' ');
      setIsCorrect(isCorrectAnswer);
      setShowFeedback(true);
      if (isCorrectAnswer) {
        setCompletedExercises(new Set([...completedExercises, currentExercise]));
      }
    }
  };

  const handleRemoveWord = (index) => {
    const newSelected = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(newSelected);
    setShowFeedback(false);
  };

  const handleCheck = () => {
    let correct = false;
    
    if (exercise.type === 'select-word') {
      correct = selectedAnswer === exercise.correct;
    } else if (exercise.type === 'translate-sentence') {
      correct = selectedWords.join(' ') === exercise.correctWords.join(' ');
    } else if (exercise.type === 'match-pairs') {
      correct = true;
    }
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setCompletedExercises(new Set([...completedExercises, currentExercise]));
    }
  };

  const handleNext = async () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setSelectedWords([]);

    if (currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      if (isGuest) {
        await saveGuestProgress();
      } else {
        await saveLessonProgress();
      }
      setShowComplete(true);
    }
  };

  const saveGuestProgress = async () => {
    if (typeof window !== 'undefined') {
      const progress = JSON.parse(localStorage.getItem('guest_progress') || '[]');
      if (!progress.includes(lesson.id)) {
        progress.push(lesson.id);
        localStorage.setItem('guest_progress', JSON.stringify(progress));
      }
    }
  };

  const saveLessonProgress = async () => {
    try {
      await supabase
        .from('lesson_progress')
        .upsert({
          user_id: userId,
          lesson_id: lesson.id,
          lesson_slug: slug,
          completed: true,
          completion_percentage: 100,
          started: true,
          last_accessed: new Date().toISOString(),
        });

      const newXP = (profile?.total_xp || 0) + lesson.xpReward;
      const newLessonsCompleted = (profile?.lessons_completed || 0) + 1;

      await supabase
        .from('profiles')
        .update({
          total_xp: newXP,
          lessons_completed: newLessonsCompleted,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      const today = new Date().toISOString().split('T')[0];
      const { data: todayActivity } = await supabase
        .from('daily_activity')
        .select('*')
        .eq('user_id', userId)
        .eq('activity_date', today)
        .single();

      if (todayActivity) {
        await supabase
          .from('daily_activity')
          .update({
            exercises_completed: todayActivity.exercises_completed + lesson.exercises.length,
            xp_earned: todayActivity.xp_earned + lesson.xpReward,
            time_spent_minutes: todayActivity.time_spent_minutes + lesson.estimatedTime,
          })
          .eq('id', todayActivity.id);
      } else {
        await supabase
          .from('daily_activity')
          .insert({
            user_id: userId,
            activity_date: today,
            exercises_completed: lesson.exercises.length,
            xp_earned: lesson.xpReward,
            time_spent_minutes: lesson.estimatedTime,
          });
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const isLesson3 = lesson.id === 3;

  if (showComplete) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
        <div className="text-center max-w-lg mx-auto px-6 py-12">
          <div className="mb-6">
            <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Lesson Complete!</h1>
            <p className="text-gray-600 mb-6">{isGuest ? `Great job! You earned ${lesson.xpReward} XP` : `Great job! You earned ${lesson.xpReward} XP`}</p>
          </div>

          {isGuest && isLesson3 ? (
            // Special signup prompt after lesson 3
            <div className="bg-gradient-to-r from-rose-50 to-amber-50 border-2 border-[#8B1538] rounded-xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">🎊 You completed all 3 free lessons!</h3>
              <p className="text-gray-700 mb-4">Sign up FREE to unlock 18 more lessons!</p>
              
              <ul className="space-y-2 mb-4 text-left">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Units 2-7: Numbers, Family, Food, Travel & More</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Save all your progress automatically</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Earn XP, build streaks, compete on leaderboard</span>
                </li>
              </ul>

              <Link
                href="/register"
                className="block w-full bg-gradient-to-r from-[#8B1538] to-[#660C21] text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all mb-3"
              >
                Sign Up Free - Unlock 18 More Lessons →
              </Link>

              <button
                onClick={() => router.push('/dashboard/lessons')}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Back to Lessons
              </button>
            </div>
          ) : isGuest ? (
            // After lessons 1-2
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>💡 Tip:</strong> Sign up free to save progress and unlock 18 more lessons!
                </p>
              </div>

              <button
                onClick={() => router.push('/dashboard/lessons')}
                className="w-full bg-gradient-to-r from-[#8B1538] to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-[#660C21] hover:to-indigo-700 transition-all shadow-lg mb-3"
              >
                Continue to Next Lesson
              </button>

              <Link
                href="/register"
                className="block text-center text-[#8B1538] hover:text-[#660C21] transition-colors text-sm font-medium"
              >
                Sign Up to Save Progress
              </Link>
            </div>
          ) : (
            // Logged-in users
            <div>
              <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Exercises</span>
                  <span className="font-bold text-gray-900">{lesson.exercises.length}/{lesson.exercises.length}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">XP Earned</span>
                  <span className="font-bold text-yellow-600">+{lesson.xpReward}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total XP</span>
                  <span className="font-bold text-[#8B1538]">{(profile?.total_xp || 0) + lesson.xpReward}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  router.push('/dashboard/lessons');
                  router.refresh();
                  // Force a hard refresh of the page data
                  window.location.href = '/dashboard/lessons';
                }}
                className="w-full bg-gradient-to-r from-[#8B1538] to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-[#660C21] hover:to-indigo-700 transition-all shadow-lg"
              >
                Continue Learning
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-rose-50 to-indigo-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => router.push('/dashboard/lessons')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Exit</span>
            </button>
            <div className="text-sm text-gray-600">
              {currentExercise + 1} / {lesson.exercises.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentExercise + 1) / lesson.exercises.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Guest Banner */}
      {isGuest && (
        <div className="bg-amber-50 border-b border-amber-100 py-2">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-center text-sm text-amber-900 flex items-center justify-center gap-2 flex-wrap">
              <Sparkles className="w-4 h-4" />
              <span>Guest mode - </span>
              <Link href="/register" className="font-semibold underline hover:text-[#8B1538]">
                Sign up free
              </Link>
              <span>to save progress!</span>
            </p>
          </div>
        </div>
      )}

      {/* Exercise Content */}
      <div className="w-full px-6 py-6 md:py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 min-h-[400px] flex flex-col">
          
          {/* Instruction */}
          {exercise.instruction && (
            <div className="mb-4">
              <p className="text-base font-semibold text-gray-700">{exercise.instruction}</p>
            </div>
          )}

          {/* SELECT WORD EXERCISE */}
          {exercise.type === 'select-word' && (
            <div className="flex-1 flex flex-col">
              {exercise.image && (
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                    <span className="text-5xl">{exercise.prompt === 'Hello' ? '👋' : '❓'}</span>
                  </div>
                </div>
              )}
              
              <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
                {exercise.prompt}
              </h2>

              <div className="space-y-2.5">
                {exercise.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedAnswer(index);
                      handleMultipleChoice(index);
                    }}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all text-lg ${
                      showFeedback && index === exercise.correct
                        ? 'border-green-500 bg-green-50'
                        : showFeedback && selectedAnswer === index
                        ? 'border-red-500 bg-red-50'
                        : selectedAnswer === index
                        ? 'border-[#8B1538] bg-rose-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-rose-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAP WORDS EXERCISE */}
          {exercise.type === 'tap-words' && (
            <div className="flex-1 flex flex-col">
              {exercise.audio && (
                <button className="mb-4 self-center flex items-center gap-2 px-5 py-3 bg-rose-100 rounded-xl hover:bg-rose-200 transition-colors">
                  <Volume2 className="w-5 h-5 text-[#8B1538]" />
                  <span className="font-medium text-[#8B1538] text-sm">Play Audio</span>
                </button>
              )}

              {exercise.pashtoText && (
                <div className="mb-5 text-center">
                  <p className="text-2xl font-bold text-gray-900">{exercise.pashtoText}</p>
                </div>
              )}

              {/* Selected Words */}
              <div className="mb-4 min-h-[60px] p-3 border-2 border-gray-300 rounded-xl bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {selectedWords.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => handleRemoveWord(index)}
                      className="px-3 py-1.5 bg-white border-2 border-gray-300 rounded-lg hover:border-red-400 transition-colors text-sm"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Words */}
              <div className="flex flex-wrap gap-2 justify-center">
                {exercise.availableWords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleWordSelect(word)}
                    disabled={selectedWords.includes(word)}
                    className={`px-3 py-1.5 border-2 rounded-lg transition-colors text-sm ${
                      selectedWords.includes(word)
                        ? 'border-gray-200 bg-gray-100 text-gray-400'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-rose-50'
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>

              {selectedWords.length === exercise.correctWords.length && !showFeedback && (
                <button
                  onClick={handleCheck}
                  className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all"
                >
                  CHECK
                </button>
              )}
            </div>
          )}

          {/* MULTIPLE CHOICE EXERCISE */}
          {exercise.type === 'multiple-choice' && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-5 whitespace-pre-line">
                {exercise.question}
              </h2>

              <div className="space-y-2.5">
                {exercise.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleMultipleChoice(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all ${
                      showFeedback && index === exercise.correct
                        ? 'border-green-500 bg-green-50'
                        : showFeedback && selectedAnswer === index
                        ? 'border-red-500 bg-red-50'
                        : selectedAnswer === index
                        ? 'border-[#8B1538] bg-rose-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-rose-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium">{option}</span>
                      {showFeedback && index === exercise.correct && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {showFeedback && selectedAnswer === index && index !== exercise.correct && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TRANSLATE SENTENCE EXERCISE */}
          {exercise.type === 'translate-sentence' && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
                {exercise.sentence}
              </h2>

              {/* Answer Area */}
              <div className="mb-4 min-h-[60px] p-3 border-2 border-gray-300 rounded-xl bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {selectedWords.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => handleRemoveWord(index)}
                      className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-red-400 transition-colors text-base"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Words */}
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {exercise.availableWords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleWordSelect(word)}
                    disabled={selectedWords.includes(word) || showFeedback}
                    className={`px-3 py-2 border-2 rounded-lg transition-colors text-base ${
                      selectedWords.includes(word)
                        ? 'border-gray-200 bg-gray-100 text-gray-400'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-rose-50'
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>

              {selectedWords.length > 0 && !showFeedback && (
                <button
                  onClick={() => {
                    const correct = selectedWords.join(' ') === exercise.correctWords.join(' ');
                    setIsCorrect(correct);
                    setShowFeedback(true);
                    if (correct) {
                      setCompletedExercises(new Set([...completedExercises, currentExercise]));
                    }
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all"
                >
                  CHECK
                </button>
              )}
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={`mt-4 p-3 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start gap-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`font-bold text-sm mb-1 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                    {isCorrect ? 'Excellent!' : 'Not quite'}
                  </p>
                  <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {exercise.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showFeedback && (
            <button
              onClick={handleNext}
              className="mt-4 w-full bg-gradient-to-r from-[#8B1538] to-indigo-600 text-white py-3 rounded-xl font-bold hover:from-[#660C21] hover:to-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {currentExercise < lesson.exercises.length - 1 ? (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Complete Lesson
                  <Star className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}