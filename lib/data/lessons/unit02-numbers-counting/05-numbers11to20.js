// Unit 2 - Lesson 5: Numbers 11-20

export default {
  id: 5,
  slug: 'numbers-11-20',
  title: 'Numbers 11-20',
  unit: 2,
  unitTitle: 'Numbers & Counting',
  difficulty: 'Beginner',
  estimatedTime: 10,
  xpReward: 50,
  description: 'Learn to count from 11 to 20 in Pashto',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '11 (eleven)',
      options: ['لس', 'یوولس', 'دولس'],
      correct: 1,
      correctWord: 'یوولس',
      pronunciation: 'yawolas',
      explanation: 'یوولس means "eleven"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '12 (twelve)',
      options: ['یوولس', 'دولس', 'دیارلس'],
      correct: 1,
      correctWord: 'دولس',
      pronunciation: 'dwolas',
      explanation: 'دولس means "twelve"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '13 (thirteen)',
      options: ['دولس', 'دیارلس', 'څوارلس'],
      correct: 1,
      correctWord: 'دیارلس',
      pronunciation: 'diyarlas',
      explanation: 'دیارلس means "thirteen"'
    },

    {
      type: 'multiple-choice',
      question: 'What number is "دولس"?',
      options: ['10', '11', '12', '13'],
      correct: 2,
      explanation: 'دولس (dwolas) means "twelve"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '14 (fourteen)',
      options: ['دیارلس', 'څوارلس', 'پنځلس'],
      correct: 1,
      correctWord: 'څوارلس',
      pronunciation: 'tsawarlas',
      explanation: 'څوارلس means "fourteen"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '15 (fifteen)',
      options: ['څوارلس', 'پنځلس', 'شپاړس'],
      correct: 1,
      correctWord: 'پنځلس',
      pronunciation: 'pinzalas',
      explanation: 'پنځلس means "fifteen"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Count from 11 to 13 in Pashto',
      sentence: 'Eleven, twelve, thirteen',
      availableWords: ['یوولس', 'دولس', 'دیارلس', 'څوارلس', 'لس'],
      correctWords: ['یوولس', 'دولس', 'دیارلس'],
      correctOrder: true,
      explanation: 'یوولس، دولس، دیارلس = 11, 12, 13'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '16 (sixteen)',
      options: ['پنځلس', 'شپاړس', 'اوولس'],
      correct: 1,
      correctWord: 'شپاړس',
      pronunciation: 'shparas',
      explanation: 'شپاړس means "sixteen"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '17 (seventeen)',
      options: ['شپاړس', 'اوولس', 'اتلس'],
      correct: 1,
      correctWord: 'اوولس',
      pronunciation: 'awolas',
      explanation: 'اوولس means "seventeen"'
    },

    {
      type: 'multiple-choice',
      question: 'What number is "پنځلس"?',
      options: ['13', '14', '15', '16'],
      correct: 2,
      explanation: 'پنځلس (pinzalas) means "fifteen"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '18 (eighteen)',
      options: ['اوولس', 'اتلس', 'نولس'],
      correct: 1,
      correctWord: 'اتلس',
      pronunciation: 'atals',
      explanation: 'اتلس means "eighteen"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '19 (nineteen)',
      options: ['اتلس', 'نولس', 'شل'],
      correct: 1,
      correctWord: 'نولس',
      pronunciation: 'nawolas',
      explanation: 'نولس means "nineteen"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '20 (twenty)',
      options: ['نولس', 'شل', 'لس'],
      correct: 1,
      correctWord: 'شل',
      pronunciation: 'shel',
      explanation: 'شل means "twenty"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Count from 16 to 18 in Pashto',
      sentence: 'Sixteen, seventeen, eighteen',
      availableWords: ['شپاړس', 'اوولس', 'اتلس', 'نولس', 'شل'],
      correctWords: ['شپاړس', 'اوولس', 'اتلس'],
      correctOrder: true,
      explanation: 'شپاړس، اوولس، اتلس = 16, 17, 18'
    },

    {
      type: 'multiple-choice',
      question: 'What is the Pashto word for "twenty"?',
      options: ['نولس', 'شل', 'لس', 'دولس'],
      correct: 1,
      explanation: 'شل (shel) means "twenty"'
    },
  ]
};