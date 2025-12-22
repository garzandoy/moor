// Lesson 14: Work & Activities

export default {
  id: 14,
  slug: 'work-activities',
  title: 'Work & Activities',
  unit: 5,
  unitTitle: 'Daily Activities',
  difficulty: 'Intermediate',
  estimatedTime: 15,
  xpReward: 75,
  description: 'Learn vocabulary for work and daily activities',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Work',
      image: '/images/work.svg',
      options: ['کار', 'کور', 'لوبه'],
      correct: 0,
      correctWord: 'کار',
      pronunciation: 'kaar',
      explanation: 'کار means "Work" or "Job"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'I work',
      options: ['زه کار کوم', 'زه ځم', 'زه خورم'],
      correct: 0,
      correctWord: 'زه کار کوم',
      pronunciation: 'za kaar kawum',
      explanation: 'زه کار کوم means "I work" or "I do work"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I go to work',
      availableWords: ['زه', 'کار', 'ته', 'ځم', 'کوم', 'یم'],
      correctWords: ['زه', 'کار', 'ته', 'ځم'],
      explanation: 'I go to work = زه کار ته ځم (za kaar ta dzam)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To study',
      options: ['لوستل', 'لیکل', 'خوب کول'],
      correct: 0,
      correctWord: 'لوستل',
      pronunciation: 'lwastal',
      explanation: 'لوستل means "To study" or "To read"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To write',
      options: ['لیکل', 'لوستل', 'ویل'],
      correct: 0,
      correctWord: 'لیکل',
      pronunciation: 'leekul',
      explanation: 'لیکل means "To write"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the sentence:\nزه کتاب ___ (I read a book)',
      options: ['لولم', 'لیکم', 'وایم', 'خورم'],
      correct: 0,
      explanation: 'لولم (lwalam) means "I read" - from لوستل (to read)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To speak',
      options: ['خبرې کول', 'لوستل', 'لیکل'],
      correct: 0,
      correctWord: 'خبرې کول',
      pronunciation: 'khabare kawul',
      explanation: 'خبرې کول means "To speak" or "To talk"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To play',
      options: ['لوبه کول', 'کار کول', 'خوب کول'],
      correct: 0,
      correctWord: 'لوبه کول',
      pronunciation: 'loba kawul',
      explanation: 'لوبه کول means "To play" (a game)'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'زه پښتو خبرې کوم',
      availableWords: ['I', 'speak', 'Pashto', 'work', 'study', 'English'],
      correctWords: ['I', 'speak', 'Pashto'],
      explanation: 'زه پښتو خبرې کوم = I speak Pashto'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To help',
      options: ['مرسته کول', 'کار کول', 'لوبه کول'],
      correct: 0,
      correctWord: 'مرسته کول',
      pronunciation: 'marasta kawul',
      explanation: 'مرسته کول means "To help" or "To assist"'
    },

    {
      type: 'multiple-choice',
      question: 'What activity uses a pen or pencil?',
      options: ['لیکل (Writing)', 'لوستل (Reading)', 'خبرې کول (Speaking)', 'لوبه کول (Playing)'],
      correct: 0,
      explanation: 'لیکل (leekul) means "to write" - requires a pen or pencil'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I help my father',
      availableWords: ['زه', 'خپل', 'پلار', 'مرسته', 'کوم', 'ته'],
      correctWords: ['زه', 'خپل', 'پلار', 'مرسته', 'کوم'],
      explanation: 'I help my father = زه خپل پلار مرسته کوم (za khpal plaar marasta kawum)'
    }
  ]
};