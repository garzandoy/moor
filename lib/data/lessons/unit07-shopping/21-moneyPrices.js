// Lesson 21: Money & Prices

export default {
  id: 21,
  slug: 'money-prices',
  title: 'Money & Prices',
  unit: 7,
  unitTitle: 'Shopping & Market',
  difficulty: 'Intermediate',
  estimatedTime: 15,
  xpReward: 100,
  description: 'Learn vocabulary for money, prices, and payment - FINAL LESSON!',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Money',
      image: '/images/money.svg',
      options: ['پیسې', 'بیه', 'ګران'],
      correct: 0,
      correctWord: 'پیسې',
      pronunciation: 'peyse',
      explanation: 'پیسې means "Money"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'How much does this cost?',
      options: ['دا څومره دی؟', 'دا څه دی؟', 'دا چیرته دی؟'],
      correct: 0,
      correctWord: 'دا څومره دی؟',
      pronunciation: 'daa tsomra dai?',
      explanation: 'دا څومره دی؟ means "How much does this cost?" or "How much is this?"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I have money',
      availableWords: ['زه', 'پیسې', 'لرم', 'غواړم', 'نه', 'ډیرې'],
      correctWords: ['زه', 'پیسې', 'لرم'],
      explanation: 'I have money = زه پیسې لرم (za peyse larum)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Afghani (currency)',
      options: ['افغانۍ', 'ډالر', 'روپۍ'],
      correct: 0,
      correctWord: 'افغانۍ',
      pronunciation: 'afghanai',
      explanation: 'افغانۍ means "Afghani" - the currency of Afghanistan'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To pay',
      options: ['ورکول', 'اخیستل', 'ګڼل'],
      correct: 0,
      correctWord: 'ورکول',
      pronunciation: 'warkawul',
      explanation: 'ورکول means "To give" or "To pay"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete: زه پیسې ___ (I pay the money)',
      options: ['ورکوم', 'اخلم', 'ګڼم', 'لرم'],
      correct: 0,
      explanation: 'ورکوم (warkawum) means "I give/pay"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Change (money back)',
      options: ['پاتې', 'بیه', 'تخفیف'],
      correct: 0,
      correctWord: 'پاتې',
      pronunciation: 'paate',
      explanation: 'پاتې means "Remaining" or "Change" (money returned)'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'زما پاتې راکړئ',
      availableWords: ['Give', 'me', 'my', 'change', 'money', 'price', 'back'],
      correctWords: ['Give', 'me', 'my', 'change'],
      explanation: 'زما پاتې راکړئ = Give me my change'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Free (no cost)',
      options: ['وړیا', 'ګران', 'ارزانه'],
      correct: 0,
      correctWord: 'وړیا',
      pronunciation: 'wareya',
      explanation: 'وړیا means "Free" (no cost)'
    },

    {
      type: 'multiple-choice',
      question: 'If something costs 100 افغانۍ and you give 150, how much پاتې do you get?',
      options: ['50 افغانۍ', '100 افغانۍ', '150 افغانۍ', '250 افغانۍ'],
      correct: 0,
      explanation: '150 - 100 = 50 افغانۍ change'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Receipt',
      options: ['رسید', 'پیسې', 'بل'],
      correct: 0,
      correctWord: 'رسید',
      pronunciation: 'raseed',
      explanation: 'رسید means "Receipt"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'Thank you',
      availableWords: ['مننه', 'په', 'مخه', 'دې', 'ښه', 'سلام'],
      correctWords: ['مننه'],
      explanation: 'Thank you = مننه (manana) - Always thank the seller! 🎉 CONGRATULATIONS! You completed all 21 lessons!'
    }
  ]
};