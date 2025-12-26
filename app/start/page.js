'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, X, ArrowRight, Sparkles, Flame, Trophy } from 'lucide-react';

export default function GuestLessonPage() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // Lesson 1: Basic Greetings - Full lesson from your data
  const exercises = [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Hello',
      options: ['سلام', 'په مخه دې ښه', 'مننه'],
      correct: 0,
      explanation: 'سلام (salaam) means "Hello" - the most common greeting in Pashto'
    },
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Goodbye',
      options: ['سلام', 'په مخه دې ښه', 'ښه'],
      correct: 1,
      explanation: 'په مخه دې ښه (pa makha de kha) means "Goodbye" in Pashto'
    },
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Thank you',
      options: ['مننه', 'سلام', 'ښه'],
      correct: 0,
      explanation: 'مننه (manana) means "Thank you"'
    },
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Good',
      options: ['ښه', 'سلام', 'مننه'],
      correct: 0,
      explanation: 'ښه (kha) means "Good"'
    },
    {
      type: 'translate-sentence',
      instruction: 'Translate this to English',
      sentence: 'سلام',
      options: ['Hello', 'Goodbye', 'Thank you', 'Good'],
      correct: 0,
      explanation: 'سلام = Hello'
    },
    {
      type: 'translate-sentence',
      instruction: 'Translate this to English',
      sentence: 'مننه',
      options: ['Hello', 'Goodbye', 'Thank you', 'Good'],
      correct: 2,
      explanation: 'مننه = Thank you'
    },
    {
      type: 'multiple-choice',
      question: 'How do you greet someone in Pashto?',
      options: ['سلام', 'مننه', 'په مخه دې ښه', 'ښه'],
      correct: 0,
      explanation: 'سلام (salaam) is how you say hello/hi in Pashto'
    },
    {
      type: 'multiple-choice',
      question: 'What does "مننه" mean?',
      options: ['Hello', 'Goodbye', 'Thank you', 'Good'],
      correct: 2,
      explanation: 'مننه (manana) means "Thank you"'
    }
  ];

  const handleSelectAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    const exercise = exercises[currentExercise];
    const correct = selectedAnswer === exercise.correct;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowResult(false);
    } else {
      setCompleted(true);
      // Save completion in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('guest_lesson1_completed', 'true');
        localStorage.setItem('guest_lesson1_score', correctCount.toString());
      }
    }
  };

  const exercise = exercises[currentExercise];
  const progress = ((currentExercise + 1) / exercises.length) * 100;
  const xpEarned = correctCount * 10;

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50/20 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8">
          
          {/* Success Animation */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#8B1538] to-[#660C21] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Trophy className="w-14 h-14 text-[#D4AF37]" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Lesson Complete! 🎉</h2>
            <p className="text-gray-600">You just learned your first Pashto words!</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{correctCount}/{exercises.length}</div>
              <div className="text-xs text-gray-600">Correct</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center">
              <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{xpEarned}</div>
              <div className="text-xs text-gray-600">XP Earned</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
              <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-xs text-gray-600">Day Streak</div>
            </div>
          </div>

          {/* Sign Up CTA */}
          <div className="bg-gradient-to-r from-rose-50 to-amber-50 border-2 border-[#8B1538] rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Sign up FREE to unlock:</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>20 more lessons</strong> - from family to shopping</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Save your progress</strong> - pick up where you left off</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Earn XP & badges</strong> - level up as you learn</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Build daily streaks</strong> - stay motivated</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Compete on leaderboard</strong> - challenge others</span>
              </li>
            </ul>

            <div className="bg-amber-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-center font-semibold text-amber-900">
                🎁 Sign up now and we'll save your {xpEarned} XP!
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/register"
              className="bg-gradient-to-r from-[#8B1538] to-[#660C21] text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Sign Up Free - Keep My Progress
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/"
              className="text-center text-gray-600 hover:text-gray-900 transition-colors text-sm py-2"
            >
              Maybe Later
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            100% free forever • No credit card required • 2 minute signup
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50/20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              <X className="w-6 h-6" />
            </Link>
            <div className="flex-1 max-w-md">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-[#8B1538] to-[#660C21] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="ml-4 text-right">
            <div className="text-sm font-medium text-gray-900">Lesson 1: Basic Greetings</div>
            <div className="text-xs text-gray-500">{currentExercise + 1} of {exercises.length}</div>
          </div>
        </div>
      </div>

      {/* Guest Banner */}
      <div className="bg-amber-50 border-b border-amber-100 py-3">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-sm text-amber-900 flex items-center justify-center gap-2 flex-wrap">
            <Sparkles className="w-4 h-4" />
            <span>You're trying Lesson 1 as a guest.</span>
            <Link href="/register" className="font-semibold underline hover:text-[#8B1538]">
              Sign up free
            </Link>
            <span>to save progress & unlock 20 more lessons!</span>
          </p>
        </div>
      </div>

      {/* Exercise */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-2">{exercise.instruction}</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {exercise.prompt || exercise.question || exercise.sentence}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
            {exercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 text-left text-lg transition-all ${
                  selectedAnswer === index
                    ? showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-[#8B1538] bg-rose-50'
                    : showResult && index === exercise.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && (
                    <>
                      {index === exercise.correct && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {selectedAnswer === index && !isCorrect && (
                        <X className="w-6 h-6 text-red-600" />
                      )}
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`p-4 rounded-xl mb-6 ${
              isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-200'
            }`}>
              <p className={`font-bold mb-2 text-lg ${isCorrect ? 'text-green-800' : 'text-blue-800'}`}>
                {isCorrect ? '✓ Perfect!' : '📚 Good try!'}
              </p>
              <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-blue-700'}`}>
                {exercise.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {showResult && isCorrect && (
                <span className="text-green-600 font-semibold">+10 XP</span>
              )}
            </div>
            
            {!showResult ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
                className="bg-gradient-to-r from-[#8B1538] to-[#660C21] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-[#8B1538] to-[#660C21] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                {currentExercise < exercises.length - 1 ? 'Continue' : 'Finish Lesson'}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}