// Unit 2 - Lesson 4: Numbers 1-10

export default {
  id: 4,
  slug: 'numbers-1-10',
  title: 'Numbers 1-10',
  unit: 2,
  unitTitle: 'Numbers & Counting',
  difficulty: 'Beginner',
  estimatedTime: 10,
  xpReward: 50,
  description: 'Learn to count from 1 to 10 in Pashto',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '1',
      options: ['یو', 'دوه', 'درې'],
      correct: 0,
      correctWord: 'یو',
      pronunciation: 'yaw',
      explanation: 'یو means "one"'
    },

    {
      type: 'multiple-choice',
      question: 'What number is "دوه"?',
      options: ['1', '2', '3', '4'],
      correct: 1,
      explanation: 'دوه (dwa) means "two"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '3',
      options: ['یو', 'دوه', 'درې'],
      correct: 2,
      correctWord: 'درې',
      pronunciation: 'dre',
      explanation: 'درې means "three"'
    },

    // TODO: Add more exercises for numbers 4-10
  ]
};