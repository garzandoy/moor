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
    <div className="max-w-7xl mx-auto space-y-6 pb-6">
      {/* Header */}
      <div className="text-center px-4" dir="rtl">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">الفبای پښتو</h1>
          <BookOpen className="w-6 h-6 md:w-10 md:h-10 text-green-600" />
        </div>
        <p className="text-base md:text-xl text-gray-600 mb-1">
          Pashto Alphabet - د پښتو الفبا
        </p>
        <p className="text-sm md:text-base text-gray-500">
          د پښتو ژبې الفبا زده کړئ او د هرې توری تلفظ واورئ
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm mx-4" dir="rtl">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 md:w-6 md:h-6 text-green-700 flex-shrink-0 mt-1" />
          <div className="text-right">
            <h3 className="font-bold text-green-900 mb-1 md:mb-2 text-base md:text-lg">د پښتو الفبا په اړه</h3>
            <p className="text-green-800 leading-relaxed text-sm md:text-base">
              پښتو الفبا ۴۴ توري لري چې له ښي خوا نه کیڼ خوا ته لیکل کیږي. ځینې توري یوازې په پښتو کې شته او په عربي یا اردو کې نه شته.
            </p>
            <p className="text-green-700 mt-1 md:mt-2 text-xs md:text-sm" dir="ltr">
              The Pashto alphabet has 44+ letters written from right to left.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-4 md:p-6 mx-4">
        <div className="relative">
          <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search letters..."
            className="w-full border-2 border-gray-300 rounded-lg md:rounded-xl px-10 md:px-12 py-2 md:py-3 text-base md:text-lg focus:border-green-500 focus:outline-none transition-colors"
          />
        </div>
        <p className="text-xs md:text-sm text-gray-500 mt-2">
          {filtered.length} letter{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Letter Grid */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border-2 border-gray-200 p-4 md:p-8 mx-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="text-xs md:text-sm text-gray-500" dir="ltr">
            Tap to hear
          </div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900" dir="rtl">ټولې توري</h2>
        </div>

        <div style={{ direction: "rtl" }}>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 text-center">
            {filtered.map((l) => (
              <button
                key={l.ch + l.key}
                onClick={() => play(l.key, l)}
                title={`${l.ipa || ''} - Click to hear`}
                className="letter-box flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg md:rounded-xl h-20 md:h-24 w-full hover:bg-green-50 hover:border-green-400 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900">
                  {l.ch}
                </div>
                <div className="text-xs text-gray-600 mt-1" dir="ltr">
                  {l.latin}
                </div>
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm md:text-base">No letters found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* Practice CTA */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-12 text-white text-center mx-4">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3" dir="rtl">د مشق لپاره تیار یاست؟</h2>
        <p className="text-blue-100 text-sm md:text-lg mb-4 md:mb-6" dir="rtl">
          په درسونو کې دا توري په متن کې ولولئ او ولیکئ
        </p>
        <p className="text-blue-100 mb-6 md:mb-8 text-sm md:text-base" dir="ltr">
          Ready to Practice? Start with lessons
        </p>
        <a
          href="/dashboard/lessons"
          className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 rounded-lg md:rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl font-bold text-base md:text-lg"
        >
          <span dir="rtl">درسونو ته لاړ شئ</span>
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
        </a>
      </div>
    </div>
  );
}