// Lesson 15: Evening Routine

export default {
  id: 15,
  slug: 'evening-routine',
  title: 'Evening Routine',
  unit: 5,
  unitTitle: 'Daily Activities',
  difficulty: 'Intermediate',
  estimatedTime: 15,
  xpReward: 75,
  description: 'Learn vocabulary for evening activities and time expressions',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Evening',
      image: '/images/evening.svg',
      options: ['ماښام', 'سهار', 'غرمه'],
      correct: 0,
      correctWord: 'ماښام',
      pronunciation: 'maakhaam',
      explanation: 'ماښام means "Evening"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Night',
      options: ['شپه', 'سهار', 'ماښام'],
      correct: 0,
      correctWord: 'شپه',
      pronunciation: 'shpa',
      explanation: 'شپه means "Night"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'Good evening',
      availableWords: ['ماښام', 'مو', 'په', 'خیر', 'سهار', 'شپه'],
      correctWords: ['ماښام', 'مو', 'په', 'خیر'],
      explanation: 'Good evening = ماښام مو په خیر (maakhaam mo pa khair)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Dinner',
      options: ['ماښامنۍ خواړه', 'ناشتا', 'غرمه'],
      correct: 0,
      correctWord: 'ماښامنۍ خواړه',
      pronunciation: 'maakhamanai khwaare',
      explanation: 'ماښامنۍ خواړه means "Dinner" (evening food)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To return/come back',
      options: ['راستنیدل', 'تلل', 'راتلل'],
      correct: 0,
      correctWord: 'راستنیدل',
      pronunciation: 'raastanedal',
      explanation: 'راستنیدل means "To return" or "To come back"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the sentence:\nزه کور ته ___ (I return home)',
      options: ['راستنیږم', 'ځم', 'پاڅیږم', 'خورم'],
      correct: 0,
      explanation: 'راستنیږم (raastanegam) means "I return"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To rest',
      options: ['آرام کول', 'کار کول', 'لوبه کول'],
      correct: 0,
      correctWord: 'آرام کول',
      pronunciation: 'aaraam kawul',
      explanation: 'آرام کول means "To rest" or "To relax"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Tired',
      options: ['ستړی', 'خوشحاله', 'ناروغ'],
      correct: 0,
      correctWord: 'ستړی',
      pronunciation: 'sturray',
      explanation: 'ستړی means "Tired"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'زه ډیر ستړی یم',
      availableWords: ['I', 'am', 'very', 'tired', 'happy', 'sick', 'work'],
      correctWords: ['I', 'am', 'very', 'tired'],
      explanation: 'زه ډیر ستړی یم = I am very tired'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To watch/see',
      options: ['کتل', 'اوریدل', 'لوستل'],
      correct: 0,
      correctWord: 'کتل',
      pronunciation: 'katul',
      explanation: 'کتل means "To watch" or "To see"'
    },

    {
      type: 'multiple-choice',
      question: 'What do you say before going to sleep?',
      options: ['شپه مو په خیر (Good night)', 'سهار مو په خیر (Good morning)', 'ماښام مو په خیر (Good evening)', 'په مخه دې ښه (Goodbye)'],
      correct: 0,
      explanation: 'شپه مو په خیر (shpa mo pa khair) means "Good night"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I watch TV',
      availableWords: ['زه', 'تلویزیون', 'ګورم', 'اورم', 'لولم', 'کوم'],
      correctWords: ['زه', 'تلویزیون', 'ګورم'],
      explanation: 'I watch TV = زه تلویزیون ګورم (za television goram)'
    }
  ]
};