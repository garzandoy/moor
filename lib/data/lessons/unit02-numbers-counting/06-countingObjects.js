// Unit 2 - Lesson 6: Counting Objects

export default {
  id: 6,
  slug: 'counting-objects',
  title: 'Counting Objects',
  unit: 2,
  unitTitle: 'Numbers & Counting',
  difficulty: 'Beginner',
  estimatedTime: 12,
  xpReward: 50,
  description: 'Practice counting everyday objects in Pashto',
  
  exercises: [
    {
      type: 'select-word',
      instruction: 'How do you say "one apple"?',
      prompt: 'One apple',
      options: ['یوه مڼه', 'دوې مڼې', 'درې مڼې'],
      correct: 0,
      correctWord: 'یوه مڼه',
      pronunciation: 'yawa mana',
      explanation: 'یوه مڼه means "one apple" (feminine)'
    },

    {
      type: 'select-word',
      instruction: 'How do you say "two apples"?',
      prompt: 'Two apples',
      options: ['یوه مڼه', 'دوې مڼې', 'درې مڼې'],
      correct: 1,
      correctWord: 'دوې مڼې',
      pronunciation: 'dwe mane',
      explanation: 'دوې مڼې means "two apples"'
    },

    {
      type: 'select-word',
      instruction: 'How do you say "three apples"?',
      prompt: 'Three apples',
      options: ['دوې مڼې', 'درې مڼې', 'څلور مڼې'],
      correct: 1,
      correctWord: 'درې مڼې',
      pronunciation: 'dre mane',
      explanation: 'درې مڼې means "three apples"'
    },

    {
      type: 'multiple-choice',
      question: 'What does "یو کتاب" mean?',
      options: ['One book', 'Two books', 'Three books', 'One apple'],
      correct: 0,
      explanation: 'یو کتاب (yaw kitab) means "one book" (masculine)'
    },

    {
      type: 'select-word',
      instruction: 'How do you say "one book"?',
      prompt: 'One book',
      options: ['یو کتاب', 'دوه کتابونه', 'درې کتابونه'],
      correct: 0,
      correctWord: 'یو کتاب',
      pronunciation: 'yaw kitab',
      explanation: 'یو کتاب means "one book"'
    },

    {
      type: 'select-word',
      instruction: 'How do you say "two books"?',
      prompt: 'Two books',
      options: ['یو کتاب', 'دوه کتابونه', 'درې کتابونه'],
      correct: 1,
      correctWord: 'دوه کتابونه',
      pronunciation: 'dwa kitabuna',
      explanation: 'دوه کتابونه means "two books"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I have three books',
      availableWords: ['زه', 'یو', 'دوه', 'درې', 'کتابونه', 'لرم', 'مڼې'],
      correctWords: ['زه', 'درې', 'کتابونه', 'لرم'],
      correctOrder: true,
      explanation: 'زه درې کتابونه لرم = I have three books'
    },

    {
      type: 'select-word',
      instruction: 'How do you say "five books"?',
      prompt: 'Five books',
      options: ['څلور کتابونه', 'پنځه کتابونه', 'شپږ کتابونه'],
      correct: 1,
      correctWord: 'پنځه کتابونه',
      pronunciation: 'pinza kitabuna',
      explanation: 'پنځه کتابونه means "five books"'
    },

    {
      type: 'multiple-choice',
      question: 'What does "زه څلور مڼې لرم" mean?',
      options: ['I have three apples', 'I have four apples', 'I have five apples', 'I have four books'],
      correct: 1,
      explanation: 'زه څلور مڼې لرم means "I have four apples"'
    },

    {
      type: 'select-word',
      instruction: 'How do you say "I have" in Pashto?',
      prompt: 'I have',
      options: ['زه لرم', 'ته لری', 'هغه لری'],
      correct: 0,
      correctWord: 'زه لرم',
      pronunciation: 'za laram',
      explanation: 'زه لرم means "I have"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I have two apples',
      availableWords: ['زه', 'یوه', 'دوې', 'مڼه', 'مڼې', 'لرم', 'کتابونه'],
      correctWords: ['زه', 'دوې', 'مڼې', 'لرم'],
      correctOrder: true,
      explanation: 'زه دوې مڼې لرم = I have two apples'
    },

    {
      type: 'multiple-choice',
      question: 'How do you count "one, two, three" objects?',
      options: ['یو، دوه، درې (masculine)', 'یوه، دوې، درې (feminine)', 'Both are correct', 'Neither is correct'],
      correct: 2,
      explanation: 'Both are correct! Use masculine for masculine nouns, feminine for feminine nouns'
    },

    {
      type: 'select-word',
      instruction: 'How do you say "ten books"?',
      prompt: 'Ten books',
      options: ['نهه کتابونه', 'لس کتابونه', 'یوولس کتابونه'],
      correct: 1,
      correctWord: 'لس کتابونه',
      pronunciation: 'las kitabuna',
      explanation: 'لس کتابونه means "ten books"'
    },

    {
      type: 'translate-sentence',
      instruction: 'Write this in Pashto',
      sentence: 'I have one book',
      availableWords: ['زه', 'یو', 'یوه', 'کتاب', 'مڼه', 'لرم', 'دوه'],
      correctWords: ['زه', 'یو', 'کتاب', 'لرم'],
      correctOrder: true,
      explanation: 'زه یو کتاب لرم = I have one book'
    },

    {
      type: 'multiple-choice',
      question: 'What is the word for "apples" (plural)?',
      options: ['مڼه', 'مڼې', 'کتاب', 'کتابونه'],
      correct: 1,
      explanation: 'مڼې (mane) means "apples" (plural)'
    },
  ]
};