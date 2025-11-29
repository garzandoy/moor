// Duolingo-style lessons - learn by doing, no vocabulary lists upfront

export const lessonsData = {
  
  // ==================== LESSON 1: Basic Greetings ====================
  'basic-greetings': {
    id: 1,
    title: 'Basic Greetings',
    unit: 1,
    unitTitle: 'Greetings & Introductions',
    difficulty: 'Beginner',
    estimatedTime: 10,
    xpReward: 50,
    description: 'Learn how to greet people in Pashto',
    
    exercises: [
      // Start with images and words
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

      // Learn "How are you?"
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

      // Translate sentence
      {
        type: 'translate-sentence',
        instruction: 'Write this in Pashto',
        sentence: 'Hello',
        availableWords: ['سلام', 'څنګه', 'یاست', 'مننه', 'په', 'ښه'],
        correctWords: ['سلام'],
        explanation: 'Hello = سلام'
      },

      // Learn "I am fine"
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

      // Full conversation - multiple choice
      {
        type: 'multiple-choice',
        question: 'Complete the conversation:\nA: "سلام!"\nB: "سلام! څنګه یاست؟"\nA: "___"',
        options: ['ښه یم', 'مننه', 'په مخه دې ښه', 'سلام'],
        correct: 0,
        explanation: 'Respond with ښه یم (I am fine) when someone asks how you are'
      },

      // Final review - match
      {
        type: 'translate-sentence',
        instruction: 'Write this in English',
        sentence: 'سلام',
        availableWords: ['Hello', 'Goodbye', 'Thank', 'you', 'How', 'are'],
        correctWords: ['Hello'],
        explanation: 'سلام = Hello'
      },
    ]
  },

  // ==================== LESSON 2: Introducing Yourself ====================
  'introducing-yourself': {
    id: 2,
    title: 'Introducing Yourself',
    unit: 1,
    unitTitle: 'Greetings & Introductions',
    difficulty: 'Beginner',
    estimatedTime: 12,
    xpReward: 50,
    description: 'Learn to introduce yourself and ask for names',
    
    exercises: [
      // Start with name pattern
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

      // Build sentence
      {
        type: 'translate-sentence',
        instruction: 'Write this in Pashto',
        sentence: 'My name is Ahmad',
        availableWords: ['زما', 'نوم', 'احمد', 'دی', 'ستا', 'څه'],
        correctWords: ['زما', 'نوم', 'احمد', 'دی'],
        correctOrder: true,
        explanation: 'زما نوم احمد دی = My name is Ahmad'
      },

      // Build full introduction
      {
        type: 'translate-sentence',
        instruction: 'Write this in Pashto',
        sentence: 'Hello! My name is Sara.',
        availableWords: ['سلام', 'زما', 'نوم', 'سارا', 'دی', 'ستا', 'څه'],
        correctWords: ['سلام', 'زما', 'نوم', 'سارا', 'دی'],
        correctOrder: true,
        explanation: 'سلام! زما نوم سارا دی = Hello! My name is Sara.'
      },

      // Full conversation - multiple choice style
      {
        type: 'multiple-choice',
        question: 'Complete the conversation:\nPerson: "سلام! زما نوم کریم دی. ستا نوم څه دی؟"\nYou: "سلام! زما نوم علی دی."\nPerson: "___"',
        options: ['خوشحاله شوم', 'څنګه یاست', 'په مخه دې ښه', 'مننه'],
        correct: 0,
        explanation: 'Say خوشحاله شوم (Nice to meet you) after introductions'
      },

      // Translate back
      {
        type: 'translate-sentence',
        instruction: 'Write this in English',
        sentence: 'ستا نوم څه دی؟',
        availableWords: ['What', 'is', 'your', 'name', 'my', 'Hello'],
        correctWords: ['What', 'is', 'your', 'name'],
        correctOrder: true,
        explanation: 'ستا نوم څه دی؟ = What is your name?'
      },
    ]
  },

  // ==================== LESSON 3: Asking Names ====================
  'asking-names': {
    id: 3,
    title: 'Asking Names',
    unit: 1,
    unitTitle: 'Greetings & Introductions',
    difficulty: 'Beginner',
    estimatedTime: 10,
    xpReward: 50,
    description: 'Practice asking and answering about names',
    
    exercises: [
      // Introduce formal "you"
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

      // Introduce informal "you"
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

      // Choose appropriate form
      {
        type: 'multiple-choice',
        question: 'You meet your teacher. Which word for "you"?',
        options: ['تاسو (formal)', 'ته (informal)'],
        correct: 0,
        explanation: 'Use تاسو (formal) with teachers and elders'
      },

      // Choose appropriate form 2
      {
        type: 'multiple-choice',
        question: 'You meet your classmate. Which word for "you"?',
        options: ['ته (informal)', 'تاسو (formal)'],
        correct: 0,
        explanation: 'Use ته (informal) with friends and classmates'
      },

      // Build formal question
      {
        type: 'translate-sentence',
        instruction: 'Ask "What is your name?" (formal)',
        sentence: 'What is your name? (to a teacher)',
        availableWords: ['ستاسو', 'نوم', 'څه', 'دی', 'ستا', 'زما'],
        correctWords: ['ستاسو', 'نوم', 'څه', 'دی'],
        correctOrder: true,
        explanation: 'ستاسو نوم څه دی؟ = What is your name? (formal)'
      },

      // Build informal question
      {
        type: 'translate-sentence',
        instruction: 'Ask "What is your name?" (informal)',
        sentence: 'What is your name? (to a friend)',
        availableWords: ['ستا', 'نوم', 'څه', 'دی', 'ستاسو', 'زما'],
        correctWords: ['ستا', 'نوم', 'څه', 'دی'],
        correctOrder: true,
        explanation: 'ستا نوم څه دی؟ = What is your name? (informal)'
      },

      // Learn "his/her name"
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

      // Practice scenario
      {
        type: 'multiple-choice',
        question: 'You meet your friend\'s grandmother. How do you ask her name?',
        options: ['ستاسو نوم څه دی؟', 'ستا نوم څه دی؟', 'زما نوم څه دی؟'],
        correct: 0,
        explanation: 'Use ستاسو نوم څه دی؟ (formal) with elders'
      },

      // Practice scenario 2
      {
        type: 'multiple-choice',
        question: 'You meet a new classmate. How do you ask their name?',
        options: ['ستا نوم څه دی؟', 'ستاسو نوم څه دی؟', 'د هغه نوم څه دی؟'],
        correct: 0,
        explanation: 'Use ستا نوم څه دی؟ (informal) with classmates'
      },

      // Ask about third person
      {
        type: 'translate-sentence',
        instruction: 'Write this in Pashto',
        sentence: 'What is his name?',
        availableWords: ['د', 'هغه', 'نوم', 'څه', 'دی', 'ستا', 'زما'],
        correctWords: ['د', 'هغه', 'نوم', 'څه', 'دی'],
        correctOrder: true,
        explanation: 'د هغه نوم څه دی؟ = What is his/her name?'
      },

      // Final review - multiple choice
      {
        type: 'multiple-choice',
        question: 'How do you formally ask "What is your name?"',
        options: ['ستاسو نوم څه دی؟', 'ستا نوم څه دی؟', 'د هغه نوم څه دی؟', 'زما نوم څه دی؟'],
        correct: 0,
        explanation: 'ستاسو نوم څه دی؟ is the formal way to ask someone\'s name'
      },
    ]
  },

};

export function getLessonBySlug(slug) {
  return lessonsData[slug] || null;
}

export function getAllLessonSlugs() {
  return Object.keys(lessonsData);
}