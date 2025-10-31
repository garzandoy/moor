// Import beginner lessons
import { greetingsLesson } from './beginner/01-greetings';
import { numbersLesson } from './beginner/02-numbers';
import { familyLesson } from './beginner/03-family';
import { colorsLesson } from './beginner/04-colors';
import { daysOfWeekLesson } from './beginner/05-days-of-week';

// Import intermediate lessons (add as you create them)
// import { commonVerbsLesson } from './intermediate/21-common-verbs';

// Import advanced lessons (add as you create them)
// import { complexGrammarLesson } from './advanced/36-complex-grammar';

// All lessons in order
export const allLessons = [
  greetingsLesson,
  numbersLesson,
  familyLesson,
  colorsLesson,
  daysOfWeekLesson,
  // Add more lessons here as you create them
];

// Helper functions
export const getLessonBySlug = (slug) => {
  return allLessons.find(lesson => lesson.slug === slug);
};

export const getLessonById = (id) => {
  return allLessons.find(lesson => lesson.id === id);
};

export const getLessonsByDifficulty = (difficulty) => {
  return allLessons.filter(lesson => lesson.difficulty === difficulty);
};

export const getNextLesson = (currentId) => {
  const currentIndex = allLessons.findIndex(l => l.id === currentId);
  return allLessons[currentIndex + 1] || null;
};

export const getPreviousLesson = (currentId) => {
  const currentIndex = allLessons.findIndex(l => l.id === currentId);
  return allLessons[currentIndex - 1] || null;
};

export const getLessonProgress = (completedLessonIds) => {
  const total = allLessons.length;
  const completed = completedLessonIds.length;
  return {
    total,
    completed,
    percentage: Math.round((completed / total) * 100)
  };
};

// Categories
export const categories = {
  beginner: allLessons.filter(l => l.difficulty === 'Beginner'),
  intermediate: allLessons.filter(l => l.difficulty === 'Intermediate'),
  advanced: allLessons.filter(l => l.difficulty === 'Advanced'),
};