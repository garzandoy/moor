"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const BASE = "/dashboard/lessons";

const LESSONS = [
  { slug: "lesson1", title: "Lesson 1: Greetings",  },
  { slug: "lesson2", title: "Lesson 2: Numbers",  },
  { slug: "lesson3", title: "Lesson 3: Alphabet Basics",  },
  { slug: "lesson4", title: "Lesson 4: Short & Long Vowels", },
  { slug: "lesson5", title: "Lesson 5: Short & Long Vowels", },
  { slug: "lesson6", title: "Lesson 6: Short & Long Vowels", },
  { slug: "lesson7", title: "Lesson 7: Short & Long Vowels", },
];

export default function LessonsPage() {
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    if (!q.trim()) return LESSONS;
    const s = q.toLowerCase();
    return LESSONS.filter((l) => l.title.toLowerCase().includes(s));
  }, [q]);

  return (
    <main className="mx-auto max-w-4xl px-1 py-5">

      {/* Lesson List */}
      <div className="space-y-3">
        {items.map((l, i) => (
          <div
            key={l.slug}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition p-5"
          >
            {/* Left section */}
            <div className="flex flex-col">
              <Link
                href={`${BASE}/${l.slug}`}
                className="text-lg font-semibold text-gray-800 hover:text-green-700 transition"
              >
                {l.title}
              </Link>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span
                  className={`px-2 py-0.5 rounded-full border ${
                    l.level === "Beginner"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-blue-50 border-blue-200 text-blue-700"
                  }`}
                >
                  {l.level}
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" /> {l.minutes} min
                </span>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4 sm:ml-auto">
              <div className="hidden sm:block h-1 w-20 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-1 bg-gradient-to-r ${
                    l.level === "Beginner"
                      ? "from-green-400 to-green-600"
                      : "from-blue-400 to-blue-600"
                  } w-${i * 4 + 8}/12`}
                ></div>
              </div>
              <Link
                href={`${BASE}/${l.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
              >
                Start
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="p-8 text-center text-gray-600 border rounded-lg">
            No lessons found 😔
          </div>
        )}
      </div>
    </main>
  );
}

/* Icons */
function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={props.className}>
      <path d="M5 12h14" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}