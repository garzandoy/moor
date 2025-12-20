// Lesson 8: Extended Family

export default {
  id: 8,
  slug: 'extended-family',
  title: 'Extended Family',
  unit: 3,
  unitTitle: 'Family & Relationships',
  difficulty: 'Beginner',
  estimatedTime: 12,
  xpReward: 50,
  description: 'Learn words for extended family members in Pashto',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Grandfather',
      image: '/images/grandfather.svg',
      options: ['نیکه', 'انا', 'تره'],
      correct: 0,
      correctWord: 'نیکه',
      pronunciation: 'neeka',
      explanation: 'نیکه means "Grandfather"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Grandmother',
      image: '/images/grandmother.svg',
      options: ['انا', 'نیکه', 'پلار'],
      correct: 0,
      correctWord: 'انا',
      pronunciation: 'aana',
      explanation: 'انا means "Grandmother"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'My grandfather',
      availableWords: ['زما', 'نیکه', 'انا', 'تره', 'دی', 'ده'],
      correctWords: ['زما', 'نیکه'],
      explanation: 'My grandfather = زما نیکه (zama neeka)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Uncle (paternal)',
      options: ['تره', 'ماما', 'نیکه'],
      correct: 0,
      correctWord: 'تره',
      pronunciation: 'traa',
      explanation: 'تره means "Uncle" (father\'s brother)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Uncle (maternal)',
      options: ['ماما', 'تره', 'نیکه'],
      correct: 0,
      correctWord: 'ماما',
      pronunciation: 'maama',
      explanation: 'ماما means "Uncle" (mother\'s brother)'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the sentence:\nزما ___ کابل کې اوسیږي (My grandfather lives in Kabul)',
      options: ['نیکه', 'انا', 'تره', 'ماما'],
      correct: 0,
      explanation: 'نیکه (neeka) means "grandfather"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Aunt (paternal)',
      options: ['ترور', 'ماما', 'انا'],
      correct: 0,
      correctWord: 'ترور',
      pronunciation: 'tror',
      explanation: 'ترور means "Aunt" (father\'s sister)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Cousin',
      options: ['تربور', 'ورور', 'خور'],
      correct: 0,
      correctWord: 'تربور',
      pronunciation: 'tarboor',
      explanation: 'تربور means "Cousin" (male, paternal)'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'زما انا',
      availableWords: ['My', 'grandmother', 'grandfather', 'uncle', 'aunt', 'cousin'],
      correctWords: ['My', 'grandmother'],
      explanation: 'زما انا = My grandmother'
    },

    {
      type: 'multiple-choice',
      question: 'Which is the correct word for maternal uncle?',
      options: ['ماما', 'تره', 'نیکه', 'تربور'],
      correct: 0,
      explanation: 'ماما (maama) is mother\'s brother, تره (traa) is father\'s brother'
    }
  ]
};