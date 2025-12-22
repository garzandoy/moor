// Lesson 12: Cooking Terms

export default {
  id: 12,
  slug: 'cooking-terms',
  title: 'Cooking Terms',
  unit: 4,
  unitTitle: 'Food & Dining',
  difficulty: 'Intermediate',
  estimatedTime: 15,
  xpReward: 75,
  description: 'Learn cooking vocabulary and food preparation terms',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Hot',
      options: ['ګرم', 'سوړ', 'خوږ'],
      correct: 0,
      correctWord: 'ګرم',
      pronunciation: 'garm',
      explanation: 'ګرم means "Hot" (temperature)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Cold',
      options: ['سوړ', 'ګرم', 'تازه'],
      correct: 0,
      correctWord: 'سوړ',
      pronunciation: 'soar',
      explanation: 'سوړ means "Cold"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'The tea is hot',
      availableWords: ['چای', 'ګرم', 'دی', 'سوړ', 'اوبه', 'ده'],
      correctWords: ['چای', 'ګرم', 'دی'],
      explanation: 'The tea is hot = چای ګرم دی (chai garm dai)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Sweet',
      options: ['خوږ', 'ترخه', 'خوندور'],
      correct: 0,
      correctWord: 'خوږ',
      pronunciation: 'khog',
      explanation: 'خوږ means "Sweet"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Sour',
      options: ['ترخه', 'خوږ', 'مالګه'],
      correct: 0,
      correctWord: 'ترخه',
      pronunciation: 'tarkha',
      explanation: 'ترخه means "Sour"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete: لیمو ډیر ___ دی (Lemon is very sour)',
      options: ['ترخه', 'خوږ', 'ګرم', 'سوړ'],
      correct: 0,
      explanation: 'ترخه (tarkha) means "sour"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Salt',
      options: ['مالګه', 'خوږ', 'ترخه'],
      correct: 0,
      correctWord: 'مالګه',
      pronunciation: 'maalga',
      explanation: 'مالګه means "Salt"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Spicy',
      options: ['تند', 'خوږ', 'سوړ'],
      correct: 0,
      correctWord: 'تند',
      pronunciation: 'tund',
      explanation: 'تند means "Spicy" or "Sharp/Pungent"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'دا خوراک ډیر تند دی',
      availableWords: ['This', 'food', 'is', 'very', 'spicy', 'hot', 'cold'],
      correctWords: ['This', 'food', 'is', 'very', 'spicy'],
      explanation: 'دا خوراک ډیر تند دی = This food is very spicy'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Fresh',
      options: ['تازه', 'زوړ', 'ګرم'],
      correct: 0,
      correctWord: 'تازه',
      pronunciation: 'taaza',
      explanation: 'تازه means "Fresh" or "New"'
    },

    {
      type: 'multiple-choice',
      question: 'What word describes food that is no longer fresh?',
      options: ['زوړ (Old)', 'تازه (Fresh)', 'ګرم (Hot)', 'خوږ (Sweet)'],
      correct: 0,
      explanation: 'زوړ (zor) means "old" - opposite of fresh'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I want fresh bread',
      availableWords: ['زه', 'تازه', 'ډوډۍ', 'غواړم', 'ګرم', 'خوږ'],
      correctWords: ['زه', 'تازه', 'ډوډۍ', 'غواړم'],
      explanation: 'I want fresh bread = زه تازه ډوډۍ غواړم (za taaza dodai ghwaram)'
    }
  ]
};