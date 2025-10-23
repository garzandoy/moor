// data/lessons.js
// You can add/edit lessons here without touching the UI.
// Audio files should live in /public/audio/...

export const lessons = [
    {
      id: 1,
      slug: "greetings",
      title: "Lesson One: Greetings",
      summary: "Basic greetings and farewells.",
      audio: "/audio/lesson1.mp3", // optional global audio for the lesson
      items: [
        { ps: "سلام", en: "Hello", audio: "/audio/greetings_salaam.mp3" },
        { ps: "ښه ورځ", en: "Good day", audio: "/audio/greetings_goodday.mp3" },
        { ps: "خدای پامان", en: "Goodbye", audio: "/audio/greetings_bye.mp3" },
      ],
    },
    {
      id: 2,
      slug: "numbers",
      title: "Lesson Two: Numbers",
      summary: "Numbers one through five.",
      audio: "/audio/lesson2.mp3",
      items: [
        { ps: "یو", en: "One", audio: "/audio/numbers_1.mp3" },
        { ps: "دوه", en: "Two", audio: "/audio/numbers_2.mp3" },
        { ps: "درې", en: "Three", audio: "/audio/numbers_3.mp3" },
        { ps: "څلور", en: "Four", audio: "/audio/numbers_4.mp3" },
        { ps: "پنځه", en: "Five", audio: "/audio/numbers_5.mp3" },
      ],
    },
    {
      id: 3,
      slug: "colors",
      title: "Lesson Three: Colors",
      summary: "Common colors.",
      audio: "/audio/lesson3.mp3",
      items: [
        { ps: "سور", en: "Red", audio: "/audio/colors_red.mp3" },
        { ps: "شنه", en: "Green", audio: "/audio/colors_green.mp3" },
        { ps: "آبي", en: "Blue", audio: "/audio/colors_blue.mp3" },
      ],
    },
    {
      id: 4,
      slug: "phrases",
      title: "Lesson Four: Common Phrases",
      summary: "Handy phrases for everyday use.",
      audio: "/audio/lesson4.mp3",
      items: [
        { ps: "مهرباني وکړئ", en: "Please", audio: "/audio/phrases_please.mp3" },
        { ps: "مننه", en: "Thank you", audio: "/audio/phrases_thanks.mp3" },
        { ps: "بخښنه غواړم", en: "Sorry", audio: "/audio/phrases_sorry.mp3" },
      ],
    },
  ];
  