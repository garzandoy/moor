// Lesson 19: At the Market

export default {
  id: 19,
  slug: 'at-market',
  title: 'At the Market',
  unit: 7,
  unitTitle: 'Shopping & Market',
  difficulty: 'Intermediate',
  estimatedTime: 15,
  xpReward: 75,
  description: 'Learn vocabulary for shopping at the market',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To buy',
      image: '/images/shopping.svg',
      options: ['اخیستل', 'خرڅول', 'ورکول'],
      correct: 0,
      correctWord: 'اخیستل',
      pronunciation: 'akhestal',
      explanation: 'اخیستل means "To buy" or "To purchase"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To sell',
      options: ['خرڅول', 'اخیستل', 'ورکول'],
      correct: 0,
      correctWord: 'خرڅول',
      pronunciation: 'khartswul',
      explanation: 'خرڅول means "To sell"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I want to buy',
      availableWords: ['زه', 'اخلم', 'غواړم', 'خرڅوم', 'ورکوم', 'یم'],
      correctWords: ['زه', 'اخلم', 'غواړم'],
      explanation: 'I want to buy = زه اخلم غواړم (za akhlam ghwaram)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Fruit',
      image: '/images/fruit.svg',
      options: ['میوه', 'سابه', 'غوښه'],
      correct: 0,
      correctWord: 'میوه',
      pronunciation: 'mewa',
      explanation: 'میوه means "Fruit"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Vegetables',
      image: '/images/vegetables.svg',
      options: ['سابه', 'میوه', 'ډوډۍ'],
      correct: 0,
      correctWord: 'سابه',
      pronunciation: 'saaba',
      explanation: 'سابه means "Vegetables"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the sentence:\nزه ___ اخلم غواړم (I want to buy vegetables)',
      options: ['سابه', 'میوه', 'غوښه', 'ډوډۍ'],
      correct: 0,
      explanation: 'سابه (saaba) means "vegetables"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Apple',
      options: ['مڼه', 'کیله', 'انګور'],
      correct: 0,
      correctWord: 'مڼه',
      pronunciation: 'mana',
      explanation: 'مڼه means "Apple"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Banana',
      options: ['کیله', 'مڼه', 'انګور'],
      correct: 0,
      correctWord: 'کیله',
      pronunciation: 'kela',
      explanation: 'کیله means "Banana"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'مڼه ښه ده',
      availableWords: ['The', 'apple', 'banana', 'is', 'good', 'fresh', 'bad'],
      correctWords: ['The', 'apple', 'is', 'good'],
      explanation: 'مڼه ښه ده = The apple is good'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Fresh',
      options: ['تازه', 'زوړ', 'خراب'],
      correct: 0,
      correctWord: 'تازه',
      pronunciation: 'taaza',
      explanation: 'تازه means "Fresh"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Cheap',
      options: ['ارزانه', 'ګران', 'ښه'],
      correct: 0,
      correctWord: 'ارزانه',
      pronunciation: 'arzaana',
      explanation: 'ارزانه means "Cheap" or "Inexpensive"'
    },

    {
      type: 'multiple-choice',
      question: 'What is the opposite of ارزانه (cheap)?',
      options: ['ګران (Expensive)', 'تازه (Fresh)', 'ښه (Good)', 'زوړ (Old)'],
      correct: 0,
      explanation: 'ګران (graan) means "expensive" - opposite of cheap'
    }
  ]
};