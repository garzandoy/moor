// app/dashboard/lessons/[slug]/page.js
import { notFound } from "next/navigation";
import Lesson1 from "./lesson1";
import Lesson2 from "./lesson2";
import Lesson3 from "./lesson3";

export default function LessonPage({ params }) {
  const { slug } = params;

  switch (slug) {
    case "lesson1":
      return <Lesson1 />;
    case "lesson2":
      return <Lesson2 />;
    case "lesson3":
      return <Lesson3 />;
    default:
      return notFound();
  }
}