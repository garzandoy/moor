"use client";

import Link from "next/link";

const PHRASES = [
  { en: "Hello", ps: "سلام", tr: "Salām", audio: "/audio/greetings/salaam.mp3" },
  { en: "How are you?", ps: "څنګه يې؟", tr: "Tsenga ye?", audio: "/audio/greetings/tsenga-ye.mp3" },
  { en: "I am fine", ps: "زه ښه يم", tr: "Za kha yem", audio: "/audio/greetings/za-kha-yem.mp3" },
  { en: "Thank you", ps: "مننه", tr: "Manana", audio: "/audio/greetings/manana.mp3" },
  { en: "Good morning", ps: "سهار پخير", tr: "Sahar pa-khair", audio: "/audio/greetings/sahar-pa-khair.mp3" },
];

export default function Lesson1() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      {/* Header */}
      <header className="mb-10 border-b pb-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Lesson 1: Greetings 👋</h1>
          <p className="text-sm text-gray-500 mt-1">
            Learn how to greet others in Pashto.
          </p>
        </div>
        <Link
          href="/dashboard/lessons"
          className="text-sm text-gray-600 hover:text-green-600 transition"
        >
          ← Back to Lessons
        </Link>
      </header>

      {/* Phrase list */}
      <section className="space-y-4">
        {PHRASES.map((p) => (
          <div
            key={p.en}
            className="group border border-gray-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:border-green-300 hover:shadow-sm transition"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{p.en}</h2>
              <p className="text-2xl font-medium text-green-700 mt-1">{p.ps}</p>
              <p className="text-sm text-gray-500 italic mt-0.5">{p.tr}</p>
            </div>

            <button
              onClick={() => new Audio(p.audio).play()}
              className="mt-4 sm:mt-0 sm:ml-4 flex items-center gap-2 px-4 py-2 border border-green-400 text-green-700 font-medium rounded-md hover:bg-green-50 transition"
            >
              ▶ <span className="text-sm">Play</span>
            </button>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-500">
        <p>Practice these daily! Next: <Link href="/dashboard/lessons/lesson2" className="text-green-700 font-medium hover:underline">Lesson 2: Numbers →</Link></p>
      </footer>
    </main>
  );
}