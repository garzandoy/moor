'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { getLessonBySlug } from '@/lib/data/lessonsData';
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Volume2,
  Trophy,
  Star,
} from 'lucide-react';

export default function LessonClient({ slug, profile, lessonProgress, userId }) {
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
            className="text-blue-600 hover:underline"
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
    
    // Check if answer is complete
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
      // For match pairs, we'll use selectedAnswer to track matched pairs
      correct = true; // Simplified for now
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
      setShowComplete(true);
      await saveLessonProgress();
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

  if (showComplete) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-6">
            <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Lesson Complete!</h1>
            <p className="text-gray-600 mb-6">Great job! You earned {lesson.xpReward} XP</p>
          </div>

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
              <span className="font-bold text-blue-600">{(profile?.total_xp || 0) + lesson.xpReward}</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/dashboard/lessons')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            Continue Learning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
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

      {/* Exercise Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col">
          
          {/* Instruction */}
          {exercise.instruction && (
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-700">{exercise.instruction}</p>
            </div>
          )}

          {/* SELECT WORD EXERCISE */}
          {exercise.type === 'select-word' && (
            <div className="flex-1 flex flex-col">
              {exercise.image && (
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <span className="text-6xl">{exercise.prompt === 'Hello' ? '👋' : '❓'}</span>
                  </div>
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {exercise.prompt}
              </h2>

              <div className="space-y-3">
                {exercise.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedAnswer(index);
                      handleMultipleChoice(index);
                    }}
                    disabled={showFeedback}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all text-xl ${
                      showFeedback && index === exercise.correct
                        ? 'border-green-500 bg-green-50'
                        : showFeedback && selectedAnswer === index
                        ? 'border-red-500 bg-red-50'
                        : selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
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
                <button className="mb-6 self-center flex items-center gap-3 px-6 py-4 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors">
                  <Volume2 className="w-6 h-6 text-blue-600" />
                  <span className="font-medium text-blue-600">Play Audio</span>
                </button>
              )}

              {exercise.pashtoText && (
                <div className="mb-6 text-center">
                  <p className="text-3xl font-bold text-gray-900">{exercise.pashtoText}</p>
                </div>
              )}

              {/* Selected Words */}
              <div className="mb-6 min-h-[80px] p-4 border-2 border-gray-300 rounded-xl bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {selectedWords.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => handleRemoveWord(index)}
                      className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-red-400 transition-colors"
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
                    className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                      selectedWords.includes(word)
                        ? 'border-gray-200 bg-gray-100 text-gray-400'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>

              {selectedWords.length === exercise.correctWords.length && !showFeedback && (
                <button
                  onClick={handleCheck}
                  className="mt-6 w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all"
                >
                  CHECK
                </button>
              )}
            </div>
          )}

          {/* MULTIPLE CHOICE EXERCISE */}
          {exercise.type === 'multiple-choice' && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {exercise.question}
              </h2>

              <div className="space-y-3">
                {exercise.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleMultipleChoice(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      showFeedback && index === exercise.correct
                        ? 'border-green-500 bg-green-50'
                        : showFeedback && selectedAnswer === index
                        ? 'border-red-500 bg-red-50'
                        : selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">{option}</span>
                      {showFeedback && index === exercise.correct && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {showFeedback && selectedAnswer === index && index !== exercise.correct && (
                        <XCircle className="w-6 h-6 text-red-500" />
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
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {exercise.sentence}
              </h2>

              {/* Answer Area */}
              <div className="mb-6 min-h-[80px] p-4 border-2 border-gray-300 rounded-xl bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {selectedWords.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => handleRemoveWord(index)}
                      className="px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:border-red-400 transition-colors text-lg"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Words */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {exercise.availableWords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleWordSelect(word)}
                    disabled={selectedWords.includes(word) || showFeedback}
                    className={`px-4 py-3 border-2 rounded-lg transition-colors text-lg ${
                      selectedWords.includes(word)
                        ? 'border-gray-200 bg-gray-100 text-gray-400'
                        : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
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
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all"
                >
                  CHECK
                </button>
              )}
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                )}
                <div>
                  <p className={`font-bold mb-1 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
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
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2"
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