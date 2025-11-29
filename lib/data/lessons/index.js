// Central export for all lessons organized by units
// Import unit exports

import unit01 from './unit01-greetings-introductions';  // ✅ Matches your folders
import unit02 from './unit02-numbers-counting';         // ✅ Matches your folders

// Flatten all lessons into single object with slug as key
export const lessonsData = {
  // Unit 1: Greetings & Introductions
  'basic-greetings': unit01.lesson01BasicGreetings,
  'introducing-yourself': unit01.lesson02IntroducingYourself,
  'asking-names': unit01.lesson03AskingNames,
  
  // Unit 2: Numbers & Counting
  'numbers-1-10': unit02.lesson04Numbers1to10,
  'numbers-11-20': unit02.lesson05Numbers11to20,
  'counting-objects': unit02.lesson06CountingObjects,
};

// Export units for direct access if needed
export const units = {
  unit01,
  unit02,
};

// Helper function to get lesson by slug
export function getLessonBySlug(slug) {
  return lessonsData[slug] || null;
}

// Helper to get all lesson slugs (for static generation)
export function getAllLessonSlugs() {
  return Object.keys(lessonsData);
}

// Helper to get lessons by unit number
export function getLessonsByUnit(unitNumber) {
  return Object.values(lessonsData).filter(lesson => lesson.unit === unitNumber);
}

// Helper to get all lessons as array
export function getAllLessons() {
  return Object.values(lessonsData);
}

// Helper to get unit by number
export function getUnitByNumber(unitNumber) {
  const unitKey = `unit${String(unitNumber).padStart(2, '0')}`;
  return units[unitKey] || null;
}