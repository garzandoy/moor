// Lesson 18: Locations & Places

export default {
  id: 18,
  slug: 'locations-places',
  title: 'Locations & Places',
  unit: 6,
  unitTitle: 'Travel & Directions',
  difficulty: 'Beginner',
  estimatedTime: 12,
  xpReward: 50,
  description: 'Learn the names of common places and locations',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Home/House',
      image: '/images/house.svg',
      options: ['کور', 'دوکان', 'روغتون'],
      correct: 0,
      correctWord: 'کور',
      pronunciation: 'kor',
      explanation: 'کور means "Home" or "House"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Shop/Store',
      image: '/images/shop.svg',
      options: ['دوکان', 'کور', 'ښوونځی'],
      correct: 0,
      correctWord: 'دوکان',
      pronunciation: 'dokaan',
      explanation: 'دوکان means "Shop" or "Store"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I go home',
      availableWords: ['زه', 'کور', 'ته', 'ځم', 'دوکان', 'لرم'],
      correctWords: ['زه', 'کور', 'ته', 'ځم'],
      explanation: 'I go home = زه کور ته ځم (za kor ta dzam)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'School',
      image: '/images/school.svg',
      options: ['ښوونځی', 'روغتون', 'جومات'],
      correct: 0,
      correctWord: 'ښوونځی',
      pronunciation: 'khoondzi',
      explanation: 'ښوونځی means "School"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Hospital',
      image: '/images/hospital.svg',
      options: ['روغتون', 'دوکان', 'هوتل'],
      correct: 0,
      correctWord: 'روغتون',
      pronunciation: 'roghton',
      explanation: 'روغتون means "Hospital"'
    },

    {
      type: 'multiple-choice',
      question: 'Where do you go when you are sick?',
      options: ['روغتون (Hospital)', 'دوکان (Shop)', 'جومات (Mosque)', 'ښوونځی (School)'],
      correct: 0,
      explanation: 'روغتون (roghton/hospital) is where you go when sick'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Mosque',
      options: ['جومات', 'کلیسا', 'ښوونځی'],
      correct: 0,
      correctWord: 'جومات',
      pronunciation: 'jomaat',
      explanation: 'جومات means "Mosque"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Hotel',
      options: ['هوتل', 'کور', 'دوکان'],
      correct: 0,
      correctWord: 'هوتل',
      pronunciation: 'hotel',
      explanation: 'هوتل means "Hotel"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'دوکان چیرته دی؟',
      availableWords: ['Where', 'is', 'the', 'shop', 'home', 'school'],
      correctWords: ['Where', 'is', 'the', 'shop'],
      explanation: 'دوکان چیرته دی؟ = Where is the shop?'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Restaurant',
      options: ['خوراک کوټه', 'کور', 'دوکان'],
      correct: 0,
      correctWord: 'خوراک کوټه',
      pronunciation: 'khoraak kota',
      explanation: 'خوراک کوټه means "Restaurant" (literally: food house)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Market',
      options: ['بازار', 'دوکان', 'کور'],
      correct: 0,
      correctWord: 'بازار',
      pronunciation: 'baazaar',
      explanation: 'بازار means "Market" or "Bazaar"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'The market is near',
      availableWords: ['بازار', 'نږدې', 'دی', 'لرې', 'چیرته', 'کور'],
      correctWords: ['بازار', 'نږدې', 'دی'],
      explanation: 'The market is near = بازار نږدې دی (baazaar naghde dai)'
    }
  ]
};