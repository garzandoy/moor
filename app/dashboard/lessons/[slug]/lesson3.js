"use client";

import Link from "next/link";

const LETTERS = [
  { letter: "ا", name: "Alif", sound: "a / ā", example: { ps: "اوبه", en: "water", tr: "oba" }, audio: "/audio/alphabet/alif.mp3" },
  { letter: "ب", name: "Be",   sound: "b",     example: { ps: "بابا", en: "grandpa", tr: "bābā" }, audio: "/audio/alphabet/be.mp3" },
  { letter: "پ", name: "Pe",   sound: "p",     example: { ps: "پښتو", en: "Pashto", tr: "paxto" }, audio: "/audio/alphabet/pe.mp3" },
  { letter: "ت", name: "Te",   sound: "t",     example: { ps: "ته",   en: "you",    tr: "ta" }, audio: "/audio/alphabet/te.mp3" },
  { letter: "ج", name: "Jeem", sound: "j",     example: { ps: "جلدی", en: "quick",  tr: "jaldi" }, audio: "/audio/alphabet/jeem.mp3" },
];

export default function Lesson3() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lesson 3: Alphabet Basics</h1>
        <Link href="/lessons" className="text-sm underline hover:opacity-80">← Back to Lessons</Link>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Meet a few core letters. Focus on the sound and an example word.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {LETTERS.map((l) => (
          <div key={l.name} className="border rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-xl font-semibold">
                {l.letter} <span className="text-base text-gray-500">({l.name})</span>
              </div>
              <div className="text-sm text-gray-700">Sound: {l.sound}</div>
              <div className="text-sm text-gray-800">
                Example: {l.example.ps} — <span className="text-gray-600">{l.example.en}</span> <span className="text-xs text-gray-500">({l.example.tr})</span>
              </div>
            </div>
            <button
              onClick={() => new Audio(l.audio).play()}
              className="border rounded-md px-3 py-2 text-sm hover:bg-gray-50 w-full sm:w-auto"
              aria-label={`Play ${l.name}`}
            >
              ▶ Play
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}