// Lesson 7: Immediate Family

export default {
  id: 7,
  slug: 'immediate-family',
  title: 'Immediate Family',
  unit: 3,
  unitTitle: 'Family & Relationships',
  difficulty: 'Beginner',
  estimatedTime: 12,
  xpReward: 50,
  description: 'Learn the words for immediate family members in Pashto',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Father',
      image: '/images/father.svg',
      options: ['پلار', 'مور', 'ورور'],
      correct: 0,
      correctWord: 'پلار',
      pronunciation: 'plaar',
      explanation: 'پلار means "Father"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Mother',
      image: '/images/mother.svg',
      options: ['مور', 'پلار', 'خور'],
      correct: 0,
      correctWord: 'مور',
      pronunciation: 'mor',
      explanation: 'مور means "Mother"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'My father',
      availableWords: ['زما', 'پلار', 'مور', 'ورور', 'دی', 'ده'],
      correctWords: ['زما', 'پلار'],
      explanation: 'My father = زما پلار (zama plaar)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Brother',
      image: '/images/brother.svg',
      options: ['ورور', 'خور', 'پلار'],
      correct: 0,
      correctWord: 'ورور',
      pronunciation: 'wror',
      explanation: 'ورور means "Brother"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Sister',
      image: '/images/sister.svg',
      options: ['خور', 'ورور', 'مور'],
      correct: 0,
      correctWord: 'خور',
      pronunciation: 'khor',
      explanation: 'خور means "Sister"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the sentence:\nزما ___ ډاکټر دی (My father is a doctor)',
      options: ['پلار', 'مور', 'ورور', 'خور'],
      correct: 0,
      explanation: 'پلار (plaar) means "father"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'زما مور',
      availableWords: ['My', 'mother', 'father', 'brother', 'sister', 'family'],
      correctWords: ['My', 'mother'],
      explanation: 'زما مور = My mother'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Son',
      options: ['زوی', 'لور', 'ورور'],
      correct: 0,
      correctWord: 'زوی',
      pronunciation: 'zooy',
      explanation: 'زوی means "Son"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Daughter',
      options: ['لور', 'زوی', 'خور'],
      correct: 0,
      correctWord: 'لور',
      pronunciation: 'loor',
      explanation: 'لور means "Daughter"'
    },

    {
      type: 'multiple-choice',
      question: 'Which word means "family"?',
      options: ['کورنۍ', 'ورور', 'پلار', 'زوی'],
      correct: 0,
      explanation: 'کورنۍ (koranai) means "family"'
    }
  ]
};