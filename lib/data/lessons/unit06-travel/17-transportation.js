// Lesson 17: Transportation

export default {
  id: 17,
  slug: 'transportation',
  title: 'Transportation',
  unit: 6,
  unitTitle: 'Travel & Directions',
  difficulty: 'Intermediate',
  estimatedTime: 15,
  xpReward: 75,
  description: 'Learn vocabulary for different types of transportation',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Car',
      image: '/images/car.svg',
      options: ['موټر', 'بس', 'الوتکه'],
      correct: 0,
      correctWord: 'موټر',
      pronunciation: 'motor',
      explanation: 'موټر means "Car"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Bus',
      image: '/images/bus.svg',
      options: ['بس', 'موټر', 'ټکسي'],
      correct: 0,
      correctWord: 'بس',
      pronunciation: 'bas',
      explanation: 'بس means "Bus"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I go by bus',
      availableWords: ['زه', 'په', 'بس', 'ځم', 'موټر', 'کې'],
      correctWords: ['زه', 'په', 'بس', 'ځم'],
      explanation: 'I go by bus = زه په بس ځم (za pa bas dzam)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Taxi',
      options: ['ټکسي', 'بس', 'موټر'],
      correct: 0,
      correctWord: 'ټکسي',
      pronunciation: 'taksi',
      explanation: 'ټکسي means "Taxi"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Airplane',
      image: '/images/airplane.svg',
      options: ['الوتکه', 'موټر', 'بس'],
      correct: 0,
      correctWord: 'الوتکه',
      pronunciation: 'alootaka',
      explanation: 'الوتکه means "Airplane"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the sentence:\nزه په ___ سفر کوم (I travel by airplane)',
      options: ['الوتکه', 'موټر', 'بس', 'ټکسي'],
      correct: 0,
      explanation: 'الوتکه (alootaka) means "airplane"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To go',
      options: ['تلل', 'راتلل', 'ودریدل'],
      correct: 0,
      correctWord: 'تلل',
      pronunciation: 'talul',
      explanation: 'تلل means "To go"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To come',
      options: ['راتلل', 'تلل', 'پاتې کیدل'],
      correct: 0,
      correctWord: 'راتلل',
      pronunciation: 'raatlul',
      explanation: 'راتلل means "To come"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'زه موټر لرم',
      availableWords: ['I', 'have', 'car', 'bus', 'taxi', 'want'],
      correctWords: ['I', 'have', 'car'],
      explanation: 'زه موټر لرم = I have a car'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Station',
      options: ['سټیشن', 'هوتل', 'روغتون'],
      correct: 0,
      correctWord: 'سټیشن',
      pronunciation: 'station',
      explanation: 'سټیشن means "Station" (bus/train station)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Airport',
      options: ['هوایي ډګر', 'سټیشن', 'هوتل'],
      correct: 0,
      correctWord: 'هوایي ډګر',
      pronunciation: 'hawai dagar',
      explanation: 'هوایي ډګر means "Airport" (literally: air field)'
    },

    {
      type: 'multiple-choice',
      question: 'Which is fastest for long distances?',
      options: ['الوتکه (Airplane)', 'موټر (Car)', 'بس (Bus)', 'ټکسي (Taxi)'],
      correct: 0,
      explanation: 'الوتکه (airplane) is the fastest for long-distance travel'
    }
  ]
};