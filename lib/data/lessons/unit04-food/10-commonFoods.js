// Lesson 10: Common Foods

export default {
  id: 10,
  slug: 'common-foods',
  title: 'Common Foods',
  unit: 4,
  unitTitle: 'Food & Dining',
  difficulty: 'Beginner',
  estimatedTime: 12,
  xpReward: 50,
  description: 'Learn the names of common foods in Pashto',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Bread',
      image: '/images/bread.svg',
      options: ['ډوډۍ', 'اوبه', 'غوښه'],
      correct: 0,
      correctWord: 'ډوډۍ',
      pronunciation: 'dodai',
      explanation: 'ډوډۍ means "Bread" - a staple food in Afghanistan'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Water',
      image: '/images/water.svg',
      options: ['اوبه', 'ډوډۍ', 'شیدې'],
      correct: 0,
      correctWord: 'اوبه',
      pronunciation: 'ooba',
      explanation: 'اوبه means "Water"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I want water',
      availableWords: ['زه', 'اوبه', 'غواړم', 'ډوډۍ', 'چای', 'یم'],
      correctWords: ['زه', 'اوبه', 'غواړم'],
      explanation: 'I want water = زه اوبه غواړم (za ooba ghwaram)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Meat',
      image: '/images/meat.svg',
      options: ['غوښه', 'ډوډۍ', 'شیدې'],
      correct: 0,
      correctWord: 'غوښه',
      pronunciation: 'ghwakha',
      explanation: 'غوښه means "Meat"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Rice',
      options: ['وریژې', 'ډوډۍ', 'غوښه'],
      correct: 0,
      correctWord: 'وریژې',
      pronunciation: 'wreeje',
      explanation: 'وریژې means "Rice"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the sentence:\nزه ___ غواړم (I want bread)',
      options: ['ډوډۍ', 'اوبه', 'چای', 'غوښه'],
      correct: 0,
      explanation: 'ډوډۍ (dodai) means "bread"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Tea',
      options: ['چای', 'اوبه', 'شیدې'],
      correct: 0,
      correctWord: 'چای',
      pronunciation: 'chai',
      explanation: 'چای means "Tea" - very popular in Afghanistan!'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Milk',
      options: ['شیدې', 'اوبه', 'چای'],
      correct: 0,
      correctWord: 'شیدې',
      pronunciation: 'sheede',
      explanation: 'شیدې means "Milk"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'زه غوښه غواړم',
      availableWords: ['I', 'want', 'meat', 'bread', 'water', 'rice'],
      correctWords: ['I', 'want', 'meat'],
      explanation: 'زه غوښه غواړم = I want meat'
    },

    {
      type: 'multiple-choice',
      question: 'What is the most popular drink in Afghanistan?',
      options: ['چای (Tea)', 'اوبه (Water)', 'شیدې (Milk)', 'قهوه (Coffee)'],
      correct: 0,
      explanation: 'چای (chai/tea) is the most popular drink, often served with every meal'
    }
  ]
};