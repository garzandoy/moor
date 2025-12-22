// Lesson 13: Morning Routine

export default {
  id: 13,
  slug: 'morning-routine',
  title: 'Morning Routine',
  unit: 5,
  unitTitle: 'Daily Activities',
  difficulty: 'Beginner',
  estimatedTime: 12,
  xpReward: 50,
  description: 'Learn vocabulary for common morning activities',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Wake up',
      image: '/images/wake-up.svg',
      options: ['پاڅیدل', 'خوب', 'کار'],
      correct: 0,
      correctWord: 'پاڅیدل',
      pronunciation: 'paatsedal',
      explanation: 'پاڅیدل means "To wake up"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Sleep',
      image: '/images/sleep.svg',
      options: ['خوب', 'پاڅیدل', 'کار'],
      correct: 0,
      correctWord: 'خوب',
      pronunciation: 'khob',
      explanation: 'خوب means "Sleep"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I wake up',
      availableWords: ['زه', 'پاڅیږم', 'خوب', 'کوم', 'یم', 'ده'],
      correctWords: ['زه', 'پاڅیږم'],
      explanation: 'I wake up = زه پاڅیږم (za paatsegam)'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Morning',
      options: ['سهار', 'ماښام', 'شپه'],
      correct: 0,
      correctWord: 'سهار',
      pronunciation: 'sahaar',
      explanation: 'سهار means "Morning"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Breakfast',
      options: ['ناشتا', 'غرمه', 'ماښام'],
      correct: 0,
      correctWord: 'ناشتا',
      pronunciation: 'naashta',
      explanation: 'ناشتا means "Breakfast"'
    },

    {
      type: 'multiple-choice',
      question: 'Complete the sentence:\nزه سهار ___ خورم (I eat breakfast in the morning)',
      options: ['ناشتا', 'غرمه', 'شپه', 'خوب'],
      correct: 0,
      explanation: 'ناشتا (naashta) means "breakfast"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To wash',
      options: ['مینځل', 'خوړل', 'کار کول'],
      correct: 0,
      correctWord: 'مینځل',
      pronunciation: 'meentsul',
      explanation: 'مینځل means "To wash"'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'Face',
      options: ['مخ', 'لاس', 'سر'],
      correct: 0,
      correctWord: 'مخ',
      pronunciation: 'mukh',
      explanation: 'مخ means "Face"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in English',
      sentence: 'زه خپل مخ مینځم',
      availableWords: ['I', 'wash', 'my', 'face', 'hands', 'eat'],
      correctWords: ['I', 'wash', 'my', 'face'],
      explanation: 'زه خپل مخ مینځم = I wash my face'
    },

    {
      type: 'select-word',
      instruction: 'Select the correct translation',
      prompt: 'To get dressed',
      options: ['جامې اغوستل', 'مینځل', 'خوړل'],
      correct: 0,
      correctWord: 'جامې اغوستل',
      pronunciation: 'jaame aghostal',
      explanation: 'جامې اغوستل means "To get dressed" (literally: to wear clothes)'
    }
  ]
};