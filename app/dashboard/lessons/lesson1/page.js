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
    <main className="mx-auto max-w-3xl px-5 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lesson 1: Greetings</h1>
        <Link href="/lessons" className="text-sm underline hover:opacity-80">← Back to Lessons</Link>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Learn basic greetings in Pashto. Click ▶ to hear each phrase (add your audio files under <code>/public/audio/greetings</code>).
      </p>

      <ul className="space-y-3">
        {PHRASES.map((p) => (
          <li key={p.en} className="border rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-base font-medium">{p.en}</div>
              <div className="text-sm text-gray-800">{p.ps}</div>
              <div className="text-xs text-gray-500">{p.tr}</div>
            </div>
            <button
              onClick={() => new Audio(p.audio).play()}
              className="border rounded-md px-3 py-2 text-sm hover:bg-gray-50 w-full sm:w-auto"
              aria-label={`Play ${p.en}`}
            >
              ▶ Play
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}