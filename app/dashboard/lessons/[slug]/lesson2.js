"use client";

import Link from "next/link";

const NUMBERS = [
  { n: 0, ps: "صفر", tr: "Sifr", audio: "/audio/numbers/0.mp3" },
  { n: 1, ps: "یو", tr: "Yo", audio: "/audio/numbers/1.mp3" },
  { n: 2, ps: "دوه", tr: "Dwa", audio: "/audio/numbers/2.mp3" },
  { n: 3, ps: "درې", tr: "Dre", audio: "/audio/numbers/3.mp3" },
  { n: 4, ps: "څلور", tr: "Tsalór", audio: "/audio/numbers/4.mp3" },
  { n: 5, ps: "پنځه", tr: "Panjza", audio: "/audio/numbers/5.mp3" },
  { n: 6, ps: "شپږ", tr: "Shpəg", audio: "/audio/numbers/6.mp3" },
  { n: 7, ps: "اووه", tr: "Ówa", audio: "/audio/numbers/7.mp3" },
  { n: 8, ps: "اته", tr: "Áta", audio: "/audio/numbers/8.mp3" },
  { n: 9, ps: "نهه", tr: "Nəha", audio: "/audio/numbers/9.mp3" },
  { n: 10, ps: "لس", tr: "Las", audio: "/audio/numbers/10.mp3" },
];

export default function Lesson2() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lesson 2: Numbers (0–10)</h1>
        <Link href="/lessons" className="text-sm underline hover:opacity-80">← Back to Lessons</Link>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Practice counting in Pashto. Click ▶ to hear each number.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {NUMBERS.map((x) => (
          <div key={x.n} className="border rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-base font-medium">#{x.n}</div>
              <div className="text-sm text-gray-800">{x.ps}</div>
              <div className="text-xs text-gray-500">{x.tr}</div>
            </div>
            <button
              onClick={() => new Audio(x.audio).play()}
              className="border rounded-md px-3 py-2 text-sm hover:bg-gray-50 w-full sm:w-auto"
              aria-label={`Play number ${x.n}`}
            >
              ▶ Play
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}