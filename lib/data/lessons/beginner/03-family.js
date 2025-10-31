export const familyLesson = {
  id: 3,
  slug: 'family-members',
  title: 'Family Members',
  description: 'Learn words for family relationships',
  icon: '👨‍👩‍👧‍👦',
  difficulty: 'Beginner',
  category: 'vocabulary',
  estimatedTime: 10,
  prerequisites: [],
  exercises: [
    {
      id: 1,
      type: 'vocabulary',
      question: 'Match the Pashto word with its English meaning',
      word: 'مور',
      pronunciation: 'Mor',
      options: ['Father', 'Mother', 'Brother', 'Sister'],
      correct: 'Mother',
      explanation: 'مور (Mor) means mother in Pashto.'
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: 'How do you say "Father" in Pashto?',
      options: ['پلار', 'مور', 'ورور', 'خور'],
      pronunciations: ['Plar', 'Mor', 'Wror', 'Khor'],
      correct: 'پلار',
      explanation: 'پلار (Plar) means father.'
    },
    {
      id: 3,
      type: 'translation',
      question: 'What does "ورور" mean?',
      pronunciation: 'Wror',
      options: ['Sister', 'Brother', 'Son', 'Daughter'],
      correct: 'Brother',
      explanation: 'ورور (Wror) means brother.'
    },
    {
      id: 4,
      type: 'vocabulary',
      question: 'Match the Pashto word with its English meaning',
      word: 'خور',
      pronunciation: 'Khor',
      options: ['Mother', 'Brother', 'Sister', 'Daughter'],
      correct: 'Sister',
      explanation: 'خور (Khor) means sister in Pashto.'
    },
    {
      id: 5,
      type: 'multiple-choice',
      question: 'How do you say "Son" in Pashto?',
      options: ['زوی', 'لور', 'ورور', 'پلار'],
      pronunciations: ['Zoay', 'Loor', 'Wror', 'Plar'],
      correct: 'زوی',
      explanation: 'زوی (Zoay) means son.'
    },
    {
      id: 6,
      type: 'translation',
      question: 'What does "لور" mean?',
      pronunciation: 'Loor',
      options: ['Son', 'Daughter', 'Sister', 'Mother'],
      correct: 'Daughter',
      explanation: 'لور (Loor) means daughter in Pashto.'
    },
    {
      id: 7,
      type: 'vocabulary',
      question: 'Match the Pashto word with its English meaning',
      word: 'نیکه',
      pronunciation: 'Neeka',
      options: ['Uncle', 'Grandfather', 'Father', 'Brother'],
      correct: 'Grandfather',
      explanation: 'نیکه (Neeka) means grandfather (paternal).'
    }
  ]
};