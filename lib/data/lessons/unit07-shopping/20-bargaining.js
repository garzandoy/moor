// Lesson 20: Bargaining

export default {
  id: 20,
  slug: 'bargaining',
  title: 'Bargaining',
  unit: 7,
  unitTitle: 'Shopping & Market',
  difficulty: 'Advanced',
  estimatedTime: 15,
  xpReward: 100,
  description: 'Learn how to negotiate prices and bargain at the market',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Price',
      options: ['بیه', 'پیسې', 'څومره'],
      correct: 0,
      correctWord: 'بیه',
      pronunciation: 'beya',
      explanation: 'بیه means "Price"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Expensive',
      options: ['ګران', 'ارزانه', 'خراب'],
      correct: 0,
      correctWord: 'ګران',
      pronunciation: 'graan',
      explanation: 'ګران means "Expensive"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'This is expensive',
      availableWords: ['دا', 'ډیر', 'ګران', 'دی', 'ده', 'ارزانه'],
      correctWords: ['دا', 'ډیر', 'ګران', 'دی'],
      explanation: 'This is expensive = دا ډیر ګران دی (daa der graan dai)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Too much/Very',
      options: ['ډیر', 'لږ', 'یو څه'],
      correct: 0,
      correctWord: 'ډیر',
      pronunciation: 'der',
      explanation: 'ډیر means "Too much" or "Very"'
    },

    {
      type: 'multiple-choice',
      question: 'How do you say "Too expensive"?',
      options: ['ډیر ګران', 'ډیر ارزانه', 'ډیر ښه', 'ډیر خراب'],
      correct: 0,
      explanation: 'ډیر ګران (der graan) means "too expensive"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Less/Little',
      options: ['لږ', 'ډیر', 'څومره'],
      correct: 0,
      correctWord: 'لږ',
      pronunciation: 'lag',
      explanation: 'لږ means "Less" or "Little"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Give discount',
      options: ['تخفیف راکړئ', 'بیه ووایئ', 'پیسې راکړئ'],
      correct: 0,
      correctWord: 'تخفیف راکړئ',
      pronunciation: 'takhfeef raakrai',
      explanation: 'تخفیف راکړئ means "Give (me a) discount"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'بیه لږه کړئ',
      availableWords: ['Lower', 'the', 'price', 'give', 'discount', 'buy', 'sell'],
      correctWords: ['Lower', 'the', 'price'],
      explanation: 'بیه لږه کړئ = Lower the price'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Final price',
      options: ['وروستۍ بیه', 'لومړۍ بیه', 'ښه بیه'],
      correct: 0,
      correctWord: 'وروستۍ بیه',
      pronunciation: 'wroosti beya',
      explanation: 'وروستۍ بیه means "Final price" or "Last price"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete: ستاسو ___ بیه څه ده؟ (What is your final price?)',
      options: ['وروستۍ', 'لومړۍ', 'منځنۍ', 'ښه'],
      correct: 0,
      explanation: 'وروستۍ (wroosti) means "final" or "last"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'I will take it',
      options: ['زه یې اخلم', 'زه یې نه اخلم', 'دا څومره دی'],
      correct: 0,
      correctWord: 'زه یې اخلم',
      pronunciation: 'za ye akhlam',
      explanation: 'زه یې اخلم means "I will take it"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'OK, I will take it',
      availableWords: ['ښه', 'زه', 'یې', 'اخلم', 'نه', 'ورکوم'],
      correctWords: ['ښه', 'زه', 'یې', 'اخلم'],
      explanation: 'OK, I will take it = ښه، زه یې اخلم (kha, za ye akhlam)'
    }
  ]
};