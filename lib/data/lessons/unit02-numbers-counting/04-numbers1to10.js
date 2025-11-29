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
      prompt: '1 (one)',
      options: ['یو', 'دوه', 'درې'],
      correct: 0,
      correctWord: 'یو',
      pronunciation: 'yaw',
      explanation: 'یو means "one"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '2 (two)',
      options: ['یو', 'دوه', 'درې'],
      correct: 1,
      correctWord: 'دوه',
      pronunciation: 'dwa',
      explanation: 'دوه means "two"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '3 (three)',
      options: ['درې', 'څلور', 'پنځه'],
      correct: 0,
      correctWord: 'درې',
      pronunciation: 'dre',
      explanation: 'درې means "three"'
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
      prompt: '4 (four)',
      options: ['درې', 'څلور', 'پنځه'],
      correct: 1,
      correctWord: 'څلور',
      pronunciation: 'tsalor',
      explanation: 'څلور means "four"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '5 (five)',
      options: ['څلور', 'پنځه', 'شپږ'],
      correct: 1,
      correctWord: 'پنځه',
      pronunciation: 'pinza',
      explanation: 'پنځه means "five"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Count from 1 to 3 in Pashto',
      sentence: 'One, two, three',
      availableWords: ['یو', 'دوه', 'درې', 'څلور', 'پنځه'],
      correctWords: ['یو', 'دوه', 'درې'],
      correctOrder: true,
      explanation: 'یو، دوه، درې = One, two, three'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '6 (six)',
      options: ['پنځه', 'شپږ', 'اووه'],
      correct: 1,
      correctWord: 'شپږ',
      pronunciation: 'shpag',
      explanation: 'شپږ means "six"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '7 (seven)',
      options: ['شپږ', 'اووه', 'اته'],
      correct: 1,
      correctWord: 'اووه',
      pronunciation: 'owa',
      explanation: 'اووه means "seven"'
    },

    {
      type: 'multiple-choice',
      question: 'What number is "پنځه"?',
      options: ['3', '4', '5', '6'],
      correct: 2,
      explanation: 'پنځه (pinza) means "five"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '8 (eight)',
      options: ['اووه', 'اته', 'نهه'],
      correct: 1,
      correctWord: 'اته',
      pronunciation: 'ata',
      explanation: 'اته means "eight"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '9 (nine)',
      options: ['اته', 'نهه', 'لس'],
      correct: 1,
      correctWord: 'نهه',
      pronunciation: 'naha',
      explanation: 'نهه means "nine"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: '10 (ten)',
      options: ['نهه', 'لس', 'یو'],
      correct: 1,
      correctWord: 'لس',
      pronunciation: 'las',
      explanation: 'لس means "ten"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Count from 1 to 5 in Pashto',
      sentence: 'One, two, three, four, five',
      availableWords: ['یو', 'دوه', 'درې', 'څلور', 'پنځه', 'شپږ', 'اووه'],
      correctWords: ['یو', 'دوه', 'درې', 'څلور', 'پنځه'],
      correctOrder: true,
      explanation: 'یو، دوه، درې، څلور، پنځه = 1, 2, 3, 4, 5'
    },

    {
      type: 'multiple-choice',
      question: 'What is the Pashto word for "ten"?',
      options: ['نهه', 'لس', 'اته', 'اووه'],
      correct: 1,
      explanation: 'لس (las) means "ten"'
    },
  ]
};