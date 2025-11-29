// Unit 1 - Lesson 1: Basic Greetings

export default {
  id: 1,
  slug: 'basic-greetings',
  title: 'Basic Greetings',
  unit: 1,
  unitTitle: 'Greetings & Introductions',
  difficulty: 'Beginner',
  estimatedTime: 10,
  xpReward: 50,
  description: 'Learn how to greet people in Pashto',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Hello',
      image: '/images/hello-wave.svg',
      options: ['سلام', 'مننه', 'په مخه دې ښه'],
      correct: 0,
      correctWord: 'سلام',
      pronunciation: 'salaam',
      explanation: 'سلام means "Hello"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'How are you?',
      image: '/images/how-are-you.svg',
      options: ['څنګه یاست؟', 'سلام', 'مننه'],
      correct: 0,
      correctWord: 'څنګه یاست؟',
      pronunciation: 'tsanga yast?',
      explanation: 'څنګه یاست؟ means "How are you?"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'Hello',
      availableWords: ['سلام', 'څنګه', 'یاست', 'مننه', 'په', 'ښه'],
      correctWords: ['سلام'],
      explanation: 'Hello = سلام'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'I am fine',
      image: '/images/thumbs-up.svg',
      options: ['ښه یم', 'سلام', 'څنګه یاست'],
      correct: 0,
      correctWord: 'ښه یم',
      pronunciation: 'kha yam',
      explanation: 'ښه یم means "I am fine"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the conversation:\nA: "سلام!"\nB: "سلام! څنګه یاست؟"\nA: "___"',
      options: ['ښه یم', 'مننه', 'په مخه دې ښه', 'سلام'],
      correct: 0,
      explanation: 'Respond with ښه یم (I am fine) when someone asks how you are'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'سلام',
      availableWords: ['Hello', 'Goodbye', 'Thank', 'you', 'How', 'are'],
      correctWords: ['Hello'],
      explanation: 'سلام = Hello'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Thank you',
      options: ['مننه', 'سلام', 'ښه یم'],
      correct: 0,
      correctWord: 'مننه',
      pronunciation: 'manana',
      explanation: 'مننه means "Thank you"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Goodbye',
      options: ['په مخه دې ښه', 'سلام', 'مننه'],
      correct: 0,
      correctWord: 'په مخه دې ښه',
      pronunciation: 'pa makha de kha',
      explanation: 'په مخه دې ښه means "Goodbye"'
    },
  ]
};