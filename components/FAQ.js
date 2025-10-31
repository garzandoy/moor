"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-gray-900">{q}</span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Smooth expand/collapse */}
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-gray-600">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      q: "Do I need any prior knowledge of Pashto to start?",
      a: "Not at all! Puhana is designed for complete beginners. We start with the basics of the Pashto alphabet and gradually build your skills from there. Our structured approach ensures you learn step-by-step at your own pace.",
    },
    {
      q: "How is Puhana different from other language learning apps?",
      a: "We combine native audio, guided practice, and cultural context. Lessons are bite-sized but cumulative, and your progress is tracked so you always know what to do next.",
    },
    {
      q: "Can I learn Pashto script and writing?",
      a: "Yes. We teach reading and writing alongside listening and speaking, including stroke order tips and handwriting practice.",
    },
    {
      q: "Is there offline access to lessons?",
      a: "You can download practice packs and audio for offline use. A fuller offline mode is on our roadmap.",
    },
    {
      q: "What regional dialects do you cover?",
      a: "We focus on widely understood variants and clearly call out major differences so you’re comfortable across regions.",
    },
    {
      q: "Is there support for heritage speakers?",
      a: "Yes—placement checks and accelerated tracks help you skip what you know and focus on fluency.",
    },
    {
      q: "How long does it typically take to become conversational?",
      a: "With ~30 minutes a day, most learners reach basic conversational ability in 8–12 weeks.",
    },
    {
      q: "Do you offer certificates or credentials?",
      a: "Yes—after completing core modules, you’ll get a shareable certificate of completion.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16">
      {/* Title + subtitle (no container/card) */}
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-gray-500">
          Everything you need to know about learning Pashto with Puhana
        </p>
      </div>

      {/* List with only inner dividers */}
      <div className="mt-10">
        {/* top divider to match the reference rhythm */}
        <div className="border-t border-gray-200" />

        {faqs.map((item, idx) => (
          <FAQItem
            key={idx}
            q={item.q}
            a={item.a}
            open={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        Have more questions?{" "}
        <a href="/contact" className="text-green-600 hover:underline">
          We’re here to help.
        </a>
      </p>
    </section>
  );
}
