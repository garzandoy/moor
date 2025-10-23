// app/alphabets/page.js
"use client";
import { useMemo, useState } from "react";

// Each item maps to your old <div data-sound="..."> box
// audio path assumed at /audio/letters/<key>.mp3 — adjust if needed
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

  function play(key) {
    const src = `/audio/letters/${key}.m4a`;
    const a = new Audio(src);
    a.play().catch(() => {
      // Soft feedback if the file is missing
      alert(`Audio not found: ${src}`);
    });
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold">Let&apos;s Learn Pashto!</h1>
        <h2 className="text-lg mt-2 mb-4">Get to know the Pashto writing system</h2>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-400 text-white rounded-xl p-2 w-44 h-12">
            LEARN THE LETTERS
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search letters (e.g., zh, aa, ʈ)…"
        className="w-full border rounded px-3 py-2"
      />

      {/* RTL letter grid */}
      <div style={{ direction: "rtl" }}>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 text-center">
          {filtered.map((l) => (
            <button
              key={l.ch + l.key}
              onClick={() => play(l.key)}
              title={l.ipa || ""}
              className="letter-box flex flex-col items-center justify-center border-2 border-gray-300 rounded-xl h-20 w-full hover:bg-blue-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <div className="text-3xl font-bold">{l.ch}</div>
              <div className="text-xs text-gray-600 mt-1">{l.latin}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
