'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BookOpen, Check, X, Volume2, Award, ArrowRight, ArrowLeft, Home } from 'lucide-react';
import { getLessonBySlug, getNextLesson } from '@/lib/data/lessons';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lesson = getLessonBySlug(params.slug);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <button
            onClick={() => router.push('/dashboard/lessons')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  const exercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

  const playPronunciation = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ps-AF';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    
    setUserAnswers({
      ...userAnswers,
      [currentExerciseIndex]: answer
    });
    setShowFeedback(true);
  };

  const isCorrectAnswer = () => {
    return userAnswers[currentExerciseIndex] === exercise.correct;
  };

  const handleNext = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setShowFeedback(false);
    } else {
      setShowCompletion(true);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setShowFeedback(false);
    }
  };

  const calculateScore = () => {
    const correctAnswers = Object.values(userAnswers).filter(
      (answer, index) => answer === lesson.exercises[index].correct
    ).length;
    return Math.round((correctAnswers / lesson.exercises.length) * 100);
  };

  const handleContinue = () => {
    const nextLesson = getNextLesson(lesson.id);
    if (nextLesson) {
      router.push(`/dashboard/lessons/${nextLesson.slug}`);
    } else {
      router.push('/dashboard/lessons');
    }
  };

  if (showCompletion) {
    const score = calculateScore();
    const correctAnswers = Object.values(userAnswers).filter(
      (answer, index) => answer === lesson.exercises[index].correct
    ).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Lesson Complete!</h2>
          <p className="text-gray-600 mb-6">Great work on completing {lesson.title}</p>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
            <div className="text-5xl font-bold text-blue-600 mb-2">{score}%</div>
            <p className="text-gray-700">
              You got {correctAnswers} out of {lesson.exercises.length} correct
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setCurrentExerciseIndex(0);
                setUserAnswers({});
                setShowFeedback(false);
                setShowCompletion(false);
              }}
              className="flex-1 px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              Practice Again
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
            >
              {getNextLesson(lesson.id) ? 'Next Lesson' : 'Back to Lessons'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard/lessons')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Lessons</span>
          </button>
          
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
            <span className="text-sm text-gray-600">
              {currentExerciseIndex + 1} / {lesson.exercises.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Exercise Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-blue-600 uppercase">
                {exercise.type.replace('-', ' ')}
              </span>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {exercise.question}
            </h3>
            
            {exercise.word && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border-2 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-gray-900 mb-2" style={{ direction: 'rtl' }}>
                      {exercise.word}
                    </div>
                    <div className="text-lg text-gray-600 italic">
                      {exercise.pronunciation}
                    </div>
                  </div>
                  <button
                    onClick={() => playPronunciation(exercise.pronunciation)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-colors"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid gap-3">
            {exercise.options.map((option, index) => {
              const isSelected = userAnswers[currentExerciseIndex] === option;
              const isCorrect = option === exercise.correct;
              const showResult = showFeedback && isSelected;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showFeedback}
                  className={`p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between group ${
                    showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {exercise.pronunciations && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playPronunciation(exercise.pronunciations[index]);
                        }}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                      >
                        <Volume2 className="w-4 h-4 text-blue-600" />
                      </button>
                    )}
                    <span className="text-lg font-medium" style={{ direction: exercise.type === 'multiple-choice' ? 'rtl' : 'ltr' }}>
                      {option}
                    </span>
                  </div>
                  
                  {showResult && (
                    <div>
                      {isCorrect ? (
                        <Check className="w-6 h-6 text-green-600" />
                      ) : (
                        <X className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`mt-6 p-4 rounded-lg ${isCorrectAnswer() ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-medium mb-2 ${isCorrectAnswer() ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrectAnswer() ? '🎉 Correct! Well done!' : '❌ Not quite right.'}
              </p>
              <p className="text-gray-700 text-sm">{exercise.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentExerciseIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!showFeedback}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {currentExerciseIndex === lesson.exercises.length - 1 ? 'Complete Lesson' : 'Next Exercise'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}