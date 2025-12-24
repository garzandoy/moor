// Lesson 16: Asking Directions

export default {
  id: 16,
  slug: 'asking-directions',
  title: 'Asking Directions',
  unit: 6,
  unitTitle: 'Travel & Directions',
  difficulty: 'Intermediate',
  estimatedTime: 15,
  xpReward: 75,
  description: 'Learn how to ask for and understand directions in Pashto',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Where?',
      options: ['چیرته؟', 'کله؟', 'څنګه؟'],
      correct: 0,
      correctWord: 'چیرته؟',
      pronunciation: 'cheerta?',
      explanation: 'چیرته؟ means "Where?"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Where is...?',
      options: ['چیرته دی؟', 'دا څه دی؟', 'څومره دی؟'],
      correct: 0,
      correctWord: 'چیرته دی؟',
      pronunciation: 'cheerta dai?',
      explanation: 'چیرته دی؟ means "Where is...?"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'Where is the hospital?',
      availableWords: ['روغتون', 'چیرته', 'دی', 'دا', 'کله', 'څومره'],
      correctWords: ['روغتون', 'چیرته', 'دی'],
      explanation: 'Where is the hospital? = روغتون چیرته دی؟ (roghton cheerta dai?)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Right',
      options: ['ښي', 'کیڼ', 'مخکې'],
      correct: 0,
      correctWord: 'ښي',
      pronunciation: 'khe',
      explanation: 'ښي means "Right" (direction)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Left',
      options: ['کیڼ', 'ښي', 'شاته'],
      correct: 0,
      correctWord: 'کیڼ',
      pronunciation: 'keen',
      explanation: 'کیڼ means "Left" (direction)'
    },

    {
      type: 'multiple-choice',
      question: 'Complete: ښي خوا ته ___ (Turn right)',
      options: ['وګرځئ', 'لاړ شئ', 'راشئ', 'ودریږئ'],
      correct: 0,
      explanation: 'وګرځئ (wagarzai) means "turn" - ښي خوا ته وګرځئ = Turn right'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Straight',
      options: ['مخکې', 'ښي', 'کیڼ'],
      correct: 0,
      correctWord: 'مخکې',
      pronunciation: 'mukhe',
      explanation: 'مخکې means "Straight" or "Forward"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Near',
      options: ['نږدې', 'لرې', 'دلته'],
      correct: 0,
      correctWord: 'نږدې',
      pronunciation: 'naghde',
      explanation: 'نږدې means "Near" or "Close"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Far',
      options: ['لرې', 'نږدې', 'دلته'],
      correct: 0,
      correctWord: 'لرې',
      pronunciation: 'lare',
      explanation: 'لرې means "Far"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'مخکې لاړ شئ',
      availableWords: ['Go', 'straight', 'turn', 'left', 'right', 'stop'],
      correctWords: ['Go', 'straight'],
      explanation: 'مخکې لاړ شئ = Go straight'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Here',
      options: ['دلته', 'هلته', 'چیرته'],
      correct: 0,
      correctWord: 'دلته',
      pronunciation: 'delta',
      explanation: 'دلته means "Here"'
    },

    {
      type: 'multiple-choice',
      question: 'How do you politely ask "Where is the mosque?"',
      options: ['جومات چیرته دی؟', 'دا څه دی؟', 'تاسو څوک یاست؟', 'کله ځئ؟'],
      correct: 0,
      explanation: 'جومات چیرته دی؟ (jomaat cheerta dai?) means "Where is the mosque?"'
    }
  ]
};