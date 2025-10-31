'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Check, Clock, ArrowRight } from 'lucide-react';
import { allLessons, categories } from '@/lib/data/lessons';

export default function LessonsPage() {
  // You can track completed lessons from localStorage or a database
  const completedLessons = []; // Replace with actual data later

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pashto Lessons</h1>
          <p className="text-gray-600">Choose a lesson to begin your learning journey</p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">In Progress</span>
            </div>
          </div>
        </div>

        {/* Beginner Lessons */}
        {categories.beginner.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Beginner</h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {categories.beginner.length} lessons
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.beginner.map((lesson) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={isLessonCompleted(lesson.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Intermediate Lessons */}
        {categories.intermediate.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Intermediate</h2>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                {categories.intermediate.length} lessons
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.intermediate.map((lesson) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={isLessonCompleted(lesson.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Advanced Lessons */}
        {categories.advanced.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Advanced</h2>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                {categories.advanced.length} lessons
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.advanced.map((lesson) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isCompleted={isLessonCompleted(lesson.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function LessonCard({ lesson, isCompleted }) {
  return (
    <Link href={`/dashboard/lessons/${lesson.slug}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer group h-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="text-5xl">{lesson.icon}</div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                lesson.difficulty === 'Beginner' 
                  ? 'bg-green-100 text-green-700'
                  : lesson.difficulty === 'Intermediate'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {lesson.difficulty}
              </span>
              {isCompleted && (
                <div className="flex items-center gap-1 text-green-600">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
          
          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {lesson.title}
          </h3>
          <p className="text-gray-600 mb-4 text-sm line-clamp-2">
            {lesson.description}
          </p>
          
          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{lesson.exercises.length} exercises</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{lesson.estimatedTime} min</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 flex items-center justify-between text-white group-hover:from-blue-600 group-hover:to-blue-700 transition-all">
          <span className="font-medium">Start Learning</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}