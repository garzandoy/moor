// Central export for all lessons organized by units
// Import unit exports

import unit01 from './unit01-greetings-introductions';
import unit02 from './unit02-numbers-counting';
// import unit03 from './unit03-family-relationships';
// import unit04 from './unit04-food-dining';
// import unit05 from './unit05-daily-activities';
// import unit06 from './unit06-travel-directions';
// import unit07 from './unit07-shopping-market';

// Flatten all lessons into single object with slug as key
export const lessonsData = {
  // Unit 1: Greetings & Introductions
  'basic-greetings': unit01.lesson01BasicGreetings,
  'introducing-yourself': unit01.lesson02IntroducingYourself,
  'asking-names': unit01.lesson03AskingNames,
  
  // Unit 2: Numbers & Counting
  'numbers-1-10': unit02.lesson04Numbers1to10,
  // 'numbers-11-50': unit02.lesson05Numbers11to50,
  // 'numbers-50-100': unit02.lesson06Numbers50to100,
  
  // Unit 3: Family & Relationships
  // 'immediate-family': unit03.lesson07ImmediateFamily,
  // 'extended-family': unit03.lesson08ExtendedFamily,
  // 'describing-relationships': unit03.lesson09DescribingRelationships,
  
  // Unit 4: Food & Dining
  // 'common-foods': unit04.lesson10CommonFoods,
  // 'at-restaurant': unit04.lesson11AtRestaurant,
  // 'cooking-terms': unit04.lesson12CookingTerms,
  
  // Unit 5: Daily Activities
  // 'morning-routine': unit05.lesson13MorningRoutine,
  // 'work-activities': unit05.lesson14WorkActivities,
  // 'evening-routine': unit05.lesson15EveningRoutine,
  
  // Unit 6: Travel & Directions
  // 'asking-directions': unit06.lesson16AskingDirections,
  // 'transportation': unit06.lesson17Transportation,
  // 'locations-places': unit06.lesson18LocationsPlaces,
  
  // Unit 7: Shopping & Market
  // 'at-market': unit07.lesson19AtMarket,
  // 'bargaining': unit07.lesson20Bargaining,
  // 'prices-money': unit07.lesson21PricesMoney,
};

// Export units for direct access if needed
export const units = {
  unit01,
  unit02,
  // unit03,
  // unit04,
  // unit05,
  // unit06,
  // unit07,
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