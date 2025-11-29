// Unit 1 - Lesson 3: Asking Names

export default {
  id: 3,
  slug: 'asking-names',
  title: 'Asking Names',
  unit: 1,
  unitTitle: 'Greetings & Introductions',
  difficulty: 'Beginner',
  estimatedTime: 10,
  xpReward: 50,
  description: 'Practice asking and answering about names',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'You (formal)',
      context: 'Used with elders and strangers',
      options: ['تاسو', 'ته', 'زه'],
      correct: 0,
      correctWord: 'تاسو',
      pronunciation: 'taaso',
      explanation: 'تاسو means "You" (formal/respectful)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'You (informal)',
      context: 'Used with friends',
      options: ['ته', 'تاسو', 'زه'],
      correct: 0,
      correctWord: 'ته',
      pronunciation: 'ta',
      explanation: 'ته means "You" (informal, with friends)'
    },

    {
      type: 'multiple-choice',
      question: 'You meet your teacher. Which word for "you"?',
      options: ['تاسو (formal)', 'ته (informal)'],
      correct: 0,
      explanation: 'Use تاسو (formal) with teachers and elders'
    },

    {
      type: 'multiple-choice',
      question: 'You meet your classmate. Which word for "you"?',
      options: ['ته (informal)', 'تاسو (formal)'],
      correct: 0,
      explanation: 'Use ته (informal) with friends and classmates'
    },

    {
      type: 'translate-sentence',
      instruction: 'Ask "What is your name?" (formal)',
      sentence: 'What is your name? (to a teacher)',
      availableWords: ['ستاسو', 'نوم', 'څه', 'دی', 'ستا', 'زما'],
      correctWords: ['ستاسو', 'نوم', 'څه', 'دی'],
      correctOrder: true,
      explanation: 'ستاسو نوم څه دی؟ = What is your name? (formal)'
    },

    {
      type: 'translate-sentence',
      instruction: 'Ask "What is your name?" (informal)',
      sentence: 'What is your name? (to a friend)',
      availableWords: ['ستا', 'نوم', 'څه', 'دی', 'ستاسو', 'زما'],
      correctWords: ['ستا', 'نوم', 'څه', 'دی'],
      correctOrder: true,
      explanation: 'ستا نوم څه دی؟ = What is your name? (informal)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'What is his/her name?',
      image: '/images/person.svg',
      options: ['د هغه نوم څه دی؟', 'ستا نوم څه دی؟', 'زما نوم څه دی؟'],
      correct: 0,
      correctWord: 'د هغه نوم څه دی؟',
      pronunciation: 'da hagha nom tse day?',
      explanation: 'د هغه نوم څه دی؟ = What is his/her name?'
    },

    {
      type: 'multiple-choice',
      question: 'You meet your friend\'s grandmother. How do you ask her name?',
      options: ['ستاسو نوم څه دی؟', 'ستا نوم څه دی؟', 'زما نوم څه دی؟'],
      correct: 0,
      explanation: 'Use ستاسو نوم څه دی؟ (formal) with elders'
    },

    {
      type: 'multiple-choice',
      question: 'You meet a new classmate. How do you ask their name?',
      options: ['ستا نوم څه دی؟', 'ستاسو نوم څه دی؟', 'د هغه نوم څه دی؟'],
      correct: 0,
      explanation: 'Use ستا نوم څه دی؟ (informal) with classmates'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'What is his name?',
      availableWords: ['د', 'هغه', 'نوم', 'څه', 'دی', 'ستا', 'زما'],
      correctWords: ['د', 'هغه', 'نوم', 'څه', 'دی'],
      correctOrder: true,
      explanation: 'د هغه نوم څه دی؟ = What is his/her name?'
    },

    {
      type: 'multiple-choice',
      question: 'How do you formally ask "What is your name?"',
      options: ['ستاسو نوم څه دی؟', 'ستا نوم څه دی؟', 'د هغه نوم څه دی؟', 'زما نوم څه دی؟'],
      correct: 0,
      explanation: 'ستاسو نوم څه دی؟ is the formal way to ask someone\'s name'
    },
  ]
};