// app/dashboard/lessons/[slug]/page.jsx
import { notFound } from "next/navigation";

const lessons = {
  lesson1: {
    title: "Lesson 1: Greetings",
    content: "In this lesson, you’ll learn how to greet in Pashto...",
  },
  lesson2: {
    title: "Lesson 2: Numbers",
    content: "In this lesson, you’ll learn how to count from 1 to 10...",
  },
  lesson3: {
    title: "Lesson 3: Family",
    content: "In this lesson, you’ll learn family-related vocabulary...",
  },
  lesson4: {
    title: "Lesson 4: Food",
    content: "In this lesson, you’ll learn how to talk about food...",
  },
};

export default function LessonPage({ params }) {
  const lesson = lessons[params.slug];

  if (!lesson) {
    notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">{lesson.title}</h1>
      <p className="text-gray-700">{lesson.content}</p>
    </div>
  );
}