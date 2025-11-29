// Unit 1 - Lesson 2: Introducing Yourself

export default {
  id: 2,
  slug: 'introducing-yourself',
  title: 'Introducing Yourself',
  unit: 1,
  unitTitle: 'Greetings & Introductions',
  difficulty: 'Beginner',
  estimatedTime: 12,
  xpReward: 50,
  description: 'Learn to introduce yourself and ask for names',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'My name',
      image: '/images/name-tag.svg',
      options: ['زما نوم', 'ستا نوم', 'سلام'],
      correct: 0,
      correctWord: 'زما نوم',
      pronunciation: 'zma nom',
      explanation: 'زما نوم means "My name"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'My name is Ahmad',
      availableWords: ['زما', 'نوم', 'احمد', 'دی', 'ستا', 'څه'],
      correctWords: ['زما', 'نوم', 'احمد', 'دی'],
      correctOrder: true,
      explanation: 'زما نوم احمد دی = My name is Ahmad'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'Hello! My name is Sara.',
      availableWords: ['سلام', 'زما', 'نوم', 'سارا', 'دی', 'ستا', 'څه'],
      correctWords: ['سلام', 'زما', 'نوم', 'سارا', 'دی'],
      correctOrder: true,
      explanation: 'سلام! زما نوم سارا دی = Hello! My name is Sara.'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the conversation:\nPerson: "سلام! زما نوم کریم دی. ستا نوم څه دی؟"\nYou: "سلام! زما نوم علی دی."\nPerson: "___"',
      options: ['خوشحاله شوم', 'څنګه یاست', 'په مخه دې ښه', 'مننه'],
      correct: 0,
      explanation: 'Say خوشحاله شوم (Nice to meet you) after introductions'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'ستا نوم څه دی؟',
      availableWords: ['What', 'is', 'your', 'name', 'my', 'Hello'],
      correctWords: ['What', 'is', 'your', 'name'],
      correctOrder: true,
      explanation: 'ستا نوم څه دی؟ = What is your name?'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'What is your name?',
      options: ['ستا نوم څه دی؟', 'زما نوم دی', 'سلام'],
      correct: 0,
      correctWord: 'ستا نوم څه دی؟',
      pronunciation: 'sta nom tse day?',
      explanation: 'ستا نوم څه دی؟ means "What is your name?"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Nice to meet you',
      options: ['خوشحاله شوم', 'سلام', 'مننه'],
      correct: 0,
      correctWord: 'خوشحاله شوم',
      pronunciation: 'khoshhala shwam',
      explanation: 'خوشحاله شوم means "Nice to meet you"'
    },

    {
      type: 'multiple-choice',
      question: 'Someone asks "ستا نوم څه دی؟" - How do you respond?',
      options: ['زما نوم ___ دی', 'سلام', 'خوشحاله شوم', 'څنګه یاست'],
      correct: 0,
      explanation: 'Respond with زما نوم ___ دی (My name is ___) and say your name'
    },
  ]
};