"use client";

import { useMemo, useState } from "react";
import { Volume2, BookOpen, ArrowRight, Info, Search } from 'lucide-react';

// Each item maps to your letter data
const LETTERS = [
  { ch: "آ", latin: "aa",      key: "a",      ipa: "ɑː" },
  { ch: "ا", latin: "a",       key: "alif",   ipa: "a" },
  { ch: "ب", latin: "b",       key: "bi",     ipa: "b" },
  { ch: "پ", latin: "p",       key: "pi",     ipa: "p" },
  { ch: "ت", latin: "t",       key: "ti",     ipa: "t" },
  { ch: "ټ", latin: "ṭ",       key: "tti",    ipa: "ʈ" },
  { ch: "ث", latin: "s",       key: "thi",    ipa: "s" },
  { ch: "ج", latin: "j",       key: "jeem",   ipa: "d͡ʒ" },
  { ch: "چ", latin: "ch",      key: "chi",    ipa: "t͡ʃ" },
  { ch: "ح", latin: "h",       key: "hi",     ipa: "ħ" },
  { ch: "خ", latin: "kh",      key: "khi",    ipa: "x" },
  { ch: "ځ", latin: "dz",      key: "dzi",    ipa: "d͡z" },
  { ch: "څ", latin: "ts",      key: "tsi",    ipa: "t͡s" },
  { ch: "د", latin: "d",       key: "daal",   ipa: "d" },
  { ch: "ډ", latin: "ḍ",       key: "ddaal",  ipa: "ɖ" },
  { ch: "ذ", latin: "z",       key: "zsaal",  ipa: "z" },
  { ch: "ر", latin: "r",       key: "ri",     ipa: "r" },
  { ch: "ړ", latin: "ṛ",       key: "rri",    ipa: "ɽ" },
  { ch: "ز", latin: "z",       key: "zi",     ipa: "z" },
  { ch: "ږ", latin: "gh",      key: "gi",     ipa: "ʁ" },
  { ch: "ژ", latin: "zh",      key: "zhi",    ipa: "ʒ" },
  { ch: "س", latin: "s",       key: "seen",   ipa: "s" },
  { ch: "ش", latin: "sh",      key: "sheen",  ipa: "ʃ" },
  { ch: "ښ", latin: "j",       key: "szhi",   ipa: "ʂ" },
  { ch: "ص", latin: "s",       key: "swat",   ipa: "sˤ" },
  { ch: "ض", latin: "d",       key: "dwat",   ipa: "zˤ" },
  { ch: "ط", latin: "t",       key: "toy",    ipa: "tˤ" },
  { ch: "ظ", latin: "z",       key: "zoy",    ipa: "zˤ" },
  { ch: "ع", latin: "a",       key: "ayn",    ipa: "ʕ" },
  { ch: "غ", latin: "gh",      key: "ghain",  ipa: "ɣ" },
  { ch: "ف", latin: "f",       key: "fy",     ipa: "f" },
  { ch: "ق", latin: "q",       key: "qaaf",   ipa: "q" },
  { ch: "ک", latin: "k",       key: "kaaf",   ipa: "k" },
  { ch: "ګ", latin: "g",       key: "gaaf",   ipa: "ɡ" },
  { ch: "ل", latin: "l",       key: "laam",   ipa: "l" },
  { ch: "م", latin: "m",       key: "meem",   ipa: "m" },
  { ch: "ن", latin: "n",       key: "noon",   ipa: "n" },
  { ch: "ڼ", latin: "ṇ",       key: "nnoon",  ipa: "ɳ" },
  { ch: "و", latin: "w",       key: "wow",    ipa: "w" },
  { ch: "ه", latin: "h",       key: "hii",    ipa: "h" },
  { ch: "ی", latin: "y",       key: "yi",     ipa: "j" },
  { ch: "ي", latin: "y",       key: "yi_ar",  ipa: "j" },
  { ch: "ې", latin: "e",       key: "ye_bar", ipa: "eː" },
  { ch: "ۍ", latin: "ai",      key: "ye_ai",  ipa: "əi" },
  { ch: "ئ", latin: "y (hamza)", key: "ye_hamza", ipa: "ʔj" },
];

export default function AlphabetsPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return LETTERS;
    return LETTERS.filter(
      (l) =>
        l.ch.includes(q) ||
        l.latin.toLowerCase().includes(s) ||
        (l.ipa && l.ipa.toLowerCase().includes(s))
    );
  }, [q]);

  function play(key, letter) {
    const src = `/audio/letters/${key}.m4a`;
    const a = new Audio(src);
    a.play().catch(() => {
      // If audio file not found, use text-to-speech as fallback
      console.log(`Audio not found: ${src}, using text-to-speech`);
      playTextToSpeech(letter);
    });
  }

  function playTextToSpeech(letter) {
    const utterance = new SpeechSynthesisUtterance(letter.latin);
    utterance.lang = 'ps-AF'; // Pashto language
    utterance.rate = 0.7; // Slower for clarity
    utterance.pitch = 1.0;
    speechSynthesis.speak(utterance);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center px-4" dir="rtl">
        <div className="flex items-center justify-center gap-3 mb-3">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">الفبای پښتو</h1>
          <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
        </div>
        <p className="text-lg sm:text-xl text-gray-600 mb-2">
          Pashto Alphabet - د پښتو الفبا
        </p>
        <p className="text-sm sm:text-base text-gray-500">
          د پښتو ژبې الفبا زده کړئ او د هرې توری تلفظ واورئ
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-sm" dir="rtl">
        <div className="flex items-start gap-4">
          <Info className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
          <div className="text-right">
            <h3 className="font-bold text-green-900 mb-2 text-lg">د پښتو الفبا په اړه</h3>
            <p className="text-green-800 leading-relaxed text-sm sm:text-base">
              پښتو الفبا ۴۴ توري لري چې له ښي خوا نه کیڼ خوا ته لیکل کیږي. ځینې توري یوازې په پښتو کې شته او په عربي یا اردو کې نه شته.
            </p>
            <p className="text-green-700 mt-2 text-xs sm:text-sm" dir="ltr">
              The Pashto alphabet has 44+ letters written from right to left. Some letters are unique to Pashto.
            </p>
          </div>
        </div>
      </div>

      {/* Letter Grid - Your Design */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500" dir="ltr">
            Click to hear pronunciation
          </div>
          <h2 className="text-2xl font-bold text-gray-900" dir="rtl">ټولې توري</h2>
        </div>

        <div style={{ direction: "rtl" }}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 text-center">
            {LETTERS.map((l) => (
              <button
                key={l.ch + l.key}
                onClick={() => play(l.key, l)}
                title={`${l.ipa || ''} - Click to hear pronunciation`}
                className="letter-box flex flex-col items-center justify-center border-2 border-gray-300 rounded-xl h-24 w-full hover:bg-green-50 hover:border-green-400 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 group"
              >
                <div className="text-4xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {l.ch}
                </div>
                <div className="text-xs text-gray-600 mt-1 group-hover:text-green-700 transition-colors" dir="ltr">
                  {l.latin}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Practice CTA */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl shadow-xl p-8 md:p-12 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3" dir="rtl">د مشق لپاره تیار یاست؟</h2>
        <p className="text-blue-100 text-base sm:text-lg mb-6" dir="rtl">
          په درسونو کې دا توري په متن کې ولولئ او ولیکئ
        </p>
        <p className="text-blue-100 mb-8 text-sm sm:text-base" dir="ltr">
          Ready to Practice? Start with beginner lessons to practice these letters in context
        </p>
        <a
          href="/dashboard/lessons"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl font-bold text-lg"
        >
          <span dir="rtl">درسونو ته لاړ شئ</span>
          <ArrowRight className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}