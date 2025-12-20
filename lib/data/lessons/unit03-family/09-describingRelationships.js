// Lesson 9: Describing Relationships

export default {
  id: 9,
  slug: 'describing-relationships',
  title: 'Describing Relationships',
  unit: 3,
  unitTitle: 'Family & Relationships',
  difficulty: 'Intermediate',
  estimatedTime: 15,
  xpReward: 75,
  description: 'Learn how to describe family relationships and connections',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'My',
      options: ['زما', 'ستا', 'د هغه'],
      correct: 0,
      correctWord: 'زما',
      pronunciation: 'zama',
      explanation: 'زما means "My" or "Mine"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Your',
      options: ['ستا', 'زما', 'د هغه'],
      correct: 0,
      correctWord: 'ستا',
      pronunciation: 'staa',
      explanation: 'ستا means "Your" or "Yours"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'Your father',
      availableWords: ['ستا', 'زما', 'پلار', 'مور', 'دی', 'ده'],
      correctWords: ['ستا', 'پلار'],
      explanation: 'Your father = ستا پلار (staa plaar)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'His/Her',
      options: ['د هغه', 'زما', 'ستا'],
      correct: 0,
      correctWord: 'د هغه',
      pronunciation: 'da hagha',
      explanation: 'د هغه means "His" or "Her"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete: دا ___ ورور دی (This is my brother)',
      options: ['زما', 'ستا', 'د هغه', 'زموږ'],
      correct: 0,
      explanation: 'زما (zama) means "my"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Older',
      options: ['لوی', 'کوچنی', 'منځنی'],
      correct: 0,
      correctWord: 'لوی',
      pronunciation: 'looy',
      explanation: 'لوی means "Older" or "Big"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Younger',
      options: ['کوچنی', 'لوی', 'منځنی'],
      correct: 0,
      correctWord: 'کوچنی',
      pronunciation: 'koochnai',
      explanation: 'کوچنی means "Younger" or "Small"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'زما لوی ورور',
      availableWords: ['My', 'older', 'younger', 'brother', 'sister', 'big'],
      correctWords: ['My', 'older', 'brother'],
      explanation: 'زما لوی ورور = My older brother'
    },

    {
      type: 'multiple-choice',
      question: 'How do you say "She is my younger sister"?',
      options: ['دا زما کوچنۍ خور ده', 'دا زما لویه خور ده', 'دا زما ورور دی', 'دا ستا خور ده'],
      correct: 0,
      explanation: 'کوچنۍ (koochnai) means younger (feminine form)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Our',
      options: ['زموږ', 'زما', 'ستا'],
      correct: 0,
      correctWord: 'زموږ',
      pronunciation: 'zmung',
      explanation: 'زموږ means "Our" or "Ours"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'Our family',
      availableWords: ['زموږ', 'کورنۍ', 'زما', 'پلار', 'مور', 'خور'],
      correctWords: ['زموږ', 'کورنۍ'],
      explanation: 'Our family = زموږ کورنۍ (zmung koranai)'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the conversation:\nA: "دا چا دی؟" (Who is this?)\nB: "___ پلار دی"',
      options: ['زما', 'ستا', 'هغه', 'دا'],
      correct: 0,
      explanation: 'زما پلار دی means "It\'s my father"'
    }
  ]
};