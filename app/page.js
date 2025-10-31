// app/page.js -- This is the landing page. 
import Link from "next/link";
import { Users, Star, Award } from "lucide-react";
// import FAQ from "./components/FAQ";


export const metadata = {
  title: "Puhana — Learn Pashto at Home",
  description:
    "Master Pashto with bite-sized lessons, native audio pronunciation, and guided practice.",
};
 
export default function Home() {
  return (
    <main className="bg-gradient-to-b from-green-50/60 to-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 text-center">
        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          Most comprehensive Pashto learning platform
        </span>

        <h1 className="mt-6 mx-auto max-w-4xl text-5xl font-black tracking-tight leading-[1.05] sm:text-6xl">
          A <span className="text-green-600">clear, structured path</span> to learning Pashto — at home
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
          Master Pashto with bite-sized lessons, native audio pronunciation, and guided practice.
          Build reading, writing, and speaking skills in just 30 minutes a day.
        </p>
 
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/dashboard/lessons"
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-base font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600/40"
          >
            <span className="mr-2">▶</span> Start Learning Free 
          </Link>
        </div>

        {/* Trust / proof row */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span>Join 15,000+ learners</span>
          </li>
          <li className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
            <span>4.9/5 rating (1,200+ reviews)</span>
          </li>
          <li className="flex items-center gap-2">
            <Award className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span>7-day free trial</span>
          </li>
        </ul>
      </section>

      {/* Trusted by learners worldwide — Testimonials + Stats */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Trusted by learners worldwide
          </h2>
        <p className="mt-4 text-gray-600">
            From heritage speakers reconnecting with their roots to professionals working in Pashto-speaking regions
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-1 text-yellow-500" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-yellow-500" viewBox="0 0 20 20">
                  <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.62L10 0 7.19 6.62 0 7.24l5.46 4.73L3.82 19z" />
                </svg>
              ))}
            </div>
            <p className="mt-4 text-gray-700">
              “Puhana helped me connect with local communities. The cultural context lessons were invaluable for my work.”
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-green-600 text-sm font-bold text-white">SJ</div>
              <div>
                <p className="font-semibold text-gray-900">Sarah Johnson</p>
                <p className="text-sm text-gray-500">NGO Worker in Afghanistan</p>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-1 text-yellow-500" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-yellow-500" viewBox="0 0 20 20">
                  <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.62L10 0 7.19 6.62 0 7.24l5.46 4.73L3.82 19z" />
                </svg>
              ))}
            </div>
            <p className="mt-4 text-gray-700">
              “Finally learning my father’s language! The pronunciation guides are amazing—I can actually speak to my grandparents now.”
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-green-600 text-sm font-bold text-white">AR</div>
              <div>
                <p className="font-semibold text-gray-900">Ahmad Rahman</p>
                <p className="text-sm text-gray-500">Second-generation Afghan American</p>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-1 text-yellow-500" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-yellow-500" viewBox="0 0 20 20">
                  <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.62L10 0 7.19 6.62 0 7.24l5.46 4.73L3.82 19z" />
                </svg>
              ))}
            </div>
            <p className="mt-4 text-gray-700">
              “The most comprehensive Pashto curriculum I’ve seen. Perfect blend of academic rigor and practical application.”
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-green-600 text-sm font-bold text-white">MT</div>
              <div>
                <p className="font-semibold text-gray-900">Dr. Michael Thompson</p>
                <p className="text-sm text-gray-500">Linguistics Professor</p>
              </div>
            </div>
          </article>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          <div>
            <div className="text-3xl font-extrabold text-green-600">15,000+</div>
            <div className="mt-1 text-sm text-gray-500">Active learners</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-green-600">500+</div>
            <div className="mt-1 text-sm text-gray-500">Lessons available</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-green-600">95%</div>
            <div className="mt-1 text-sm text-gray-500">Completion rate</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-green-600">4.9/5</div>
            <div className="mt-1 text-sm text-gray-500">Average rating</div>
          </div>
        </div>
      </section>

    </main>
  );
}
