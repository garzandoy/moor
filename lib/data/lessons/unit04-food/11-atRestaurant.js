// Lesson 11: At the Restaurant

export default {
  id: 11,
  slug: 'at-restaurant',
  title: 'At the Restaurant',
  unit: 4,
  unitTitle: 'Food & Dining',
  difficulty: 'Intermediate',
  estimatedTime: 15,
  xpReward: 75,
  description: 'Learn useful phrases for ordering food at restaurants',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Menu',
      options: ['مینو', 'خوراک', 'ریستورانت'],
      correct: 0,
      correctWord: 'مینو',
      pronunciation: 'menu',
      explanation: 'مینو means "Menu" (borrowed from English)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'I want',
      options: ['زه غواړم', 'تاسو غواړئ', 'هغه غواړي'],
      correct: 0,
      correctWord: 'زه غواړم',
      pronunciation: 'za ghwaram',
      explanation: 'زه غواړم means "I want"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I want the menu',
      availableWords: ['زه', 'مینو', 'غواړم', 'ډوډۍ', 'راکړئ', 'مننه'],
      correctWords: ['زه', 'مینو', 'غواړم'],
      explanation: 'I want the menu = زه مینو غواړم (za menu ghwaram)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Please give me',
      options: ['راکړئ', 'غواړم', 'مننه'],
      correct: 0,
      correctWord: 'راکړئ',
      pronunciation: 'raakrai',
      explanation: 'راکړئ means "Please give me" (polite request)'
    },

    {
      type: 'multiple-choice',
      question: 'How do you politely ask for food?\n"___ ډوډۍ راکړئ"',
      options: ['مهرباني وکړئ (Please)', 'زه (I)', 'هغه (He/She)', 'موږ (We)'],
      correct: 0,
      explanation: 'مهرباني وکړئ (meherbaani wakrai) means "please" - used for polite requests'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'How much?',
      options: ['څومره؟', 'کله؟', 'چیرته؟'],
      correct: 0,
      correctWord: 'څومره؟',
      pronunciation: 'tsomra?',
      explanation: 'څومره؟ means "How much?" - important for asking prices!'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'دا څومره دی؟',
      availableWords: ['How', 'much', 'is', 'this', 'that', 'food'],
      correctWords: ['How', 'much', 'is', 'this'],
      explanation: 'دا څومره دی؟ = How much is this?'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Delicious',
      options: ['خوندور', 'ترخه', 'خوږ'],
      correct: 0,
      correctWord: 'خوندور',
      pronunciation: 'khwandor',
      explanation: 'خوندور means "Delicious" or "Tasty"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the phrase:\n"خوراک ډیر ___ دی" (The food is very delicious)',
      options: ['خوندور', 'ترخه', 'سوړ', 'ګرم'],
      correct: 0,
      explanation: 'خوندور (khwandor) means "delicious"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Bill/Check',
      options: ['بل', 'مینو', 'پیسې'],
      correct: 0,
      correctWord: 'بل',
      pronunciation: 'bil',
      explanation: 'بل means "Bill" - when you\'re ready to pay'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'The food is delicious',
      availableWords: ['خوراک', 'ډیر', 'خوندور', 'دی', 'ده', 'مننه'],
      correctWords: ['خوراک', 'خوندور', 'دی'],
      explanation: 'The food is delicious = خوراک خوندور دی (khoraak khwandor dai)'
    },

    {
      type: 'multiple-choice',
      question: 'What should you say when the food arrives?',
      options: ['مننه (Thank you)', 'سلام (Hello)', 'په مخه دې ښه (Goodbye)', 'نه (No)'],
      correct: 0,
      explanation: 'مننه (manana) means "thank you" - always polite to thank the server!'
    }
  ]
};