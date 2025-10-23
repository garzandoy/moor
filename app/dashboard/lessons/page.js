"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const BASE = "/dashboard/lessons";

const LESSONS = [
  { slug: "lesson1", title: "Lesson 1: Greetings", minutes: 8, level: "Beginner" },
  { slug: "lesson2", title: "Lesson 2: Numbers", minutes: 10, level: "Beginner" },
  { slug: "lesson3", title: "Lesson 3: Alphabet Basics", minutes: 12, level: "Beginner" },
  { slug: "lesson4", title: "Lesson 4: Short & Long Vowels", minutes: 14, level: "Intermediate" },
];

export default function LessonsPage() {
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    if (!q.trim()) return LESSONS;
    const s = q.toLowerCase();
    return LESSONS.filter((l) => l.title.toLowerCase().includes(s));
  }, [q]);

  return (
    <main className="mx-auto max-w-5xl px-5 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Lessons</h1>
        <p className="mt-1 text-sm text-gray-600">
          Start with greetings, then move on to numbers and the alphabet.
        </p>
      </header>

      <div className="mb-6">
        <input
          type="search"
          placeholder="Search lessons…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full md:w-96 border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((l) => (
          <article
            key={l.slug}
            className="border rounded-md p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base font-semibold leading-snug">
                <Link
                  href={`${BASE}/${l.slug}`}
                  className="rounded-[3px] outline-none focus:ring-2 focus:ring-gray-300"
                >
                  {l.title}
                </Link>
              </h2>

              <span
                className={[
                  "text-[11px] font-medium border rounded-md px-2 py-0.5 whitespace-nowrap",
                  l.level === "Beginner"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-blue-50 border-blue-200 text-blue-700",
                ].join(" ")}
                title={`Level: ${l.level}`}
              >
                {l.level}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="h-4 w-4" /> {l.minutes} min
              </span>
              <Link
                href={`${BASE}/${l.slug}`}
                className="inline-flex w-full items-center justify-center gap-1 rounded-md border px-3 py-2 text-sm hover:bg-gray-50 md:w-auto"
              >
                Start <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}

        {items.length === 0 && (
          <div className="col-span-full rounded-md border p-6 text-center text-sm text-gray-600">
            No lessons found.
          </div>
        )}
      </section>
    </main>
  );
}

/* tiny inline icons */
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