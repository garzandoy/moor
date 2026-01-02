'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Sparkles, BookOpen, Trophy, Flame, Zap, CheckCircle, Users, Globe } from 'lucide-react';

export default function DarkMode() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="Puhanah Logo" 
                width={36} 
                height={36}
                className="rounded-lg"
              />
              <span className="font-bold text-xl text-white">Puhanah</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-slate-300 hover:text-white transition-colors">How It Works</a>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link 
                href="/register"
                className="text-sm bg-gradient-to-r from-[#8B1538] to-[#660C21] text-white px-5 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-[#8B1538]/50 transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE2YzAtNC40MTggMy41ODItOCA4LThzOCAzLjU4MiA4IDgtMy41ODIgOC04IDgtOC0zLjU4Mi04LTh6TTAgMTZjMC00LjQxOCAzLjU4Mi04IDgtOHM4IDMuNTgyIDggOC0zLjU4MiA4LTggOC04LTMuNTgyLTgtOHptMCAzNmMwLTQuNDE4IDMuNTgyLTggOC04czggMy41ODIgOCA4LTMuNTgyIDgtOCA4LTgtMy41ODItOC04em0zNiAwYzAtNC40MTggMy41ODItOCA4LThzOCAzLjU4MiA4IDgtMy41ODIgOC04IDgtOC0zLjU4Mi04LTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-900/30 text-rose-200 px-3 py-1.5 rounded-full mb-6 border border-rose-800/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Try 3 lessons free - no signup required!</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Master Pashto,
                <br />
                <span className="bg-gradient-to-r from-[#D4AF37] to-amber-400 bg-clip-text text-transparent">
                  One Lesson
                </span>{' '}
                at a Time
              </h1>

              <p className="text-lg text-slate-300 mb-3 leading-relaxed">
                Interactive lessons from alphabet to conversations. See results in your first 10-minute lesson.
              </p>

              <p className="text-sm text-[#D4AF37] font-semibold mb-8 flex items-center gap-2">
                <Star className="w-4 h-4" />
                پوهنه · Knowledge is Light
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dashboard/lessons"
                  className="bg-gradient-to-r from-[#8B1538] to-[#660C21] text-white px-7 py-3 rounded-lg font-medium text-base hover:shadow-2xl hover:shadow-[#8B1538]/50 transition-all text-center"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/login"
                  className="border-2 border-white/20 text-white px-7 py-3 rounded-lg font-medium text-base hover:bg-white/10 transition-all text-center"
                >
                  I Already Have an Account
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm text-slate-400">3 free lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm text-slate-400">No signup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm text-slate-400">21 total lessons</span>
                </div>
              </div>
            </div>

            {/* Right Side - Demo Card */}
            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                {/* Progress Card */}
                <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-6 mb-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#660C21] rounded-full flex items-center justify-center text-white font-bold text-xl">
                      👋
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Lesson 1</div>
                      <div className="font-semibold text-white">Basic Greetings</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
                    <div className="bg-gradient-to-r from-[#8B1538] to-[#D4AF37] h-2.5 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <div className="text-xs text-slate-400">70% complete</div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-700/30 rounded-xl p-4 border border-white/5 text-center">
                    <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">7</div>
                    <div className="text-xs text-slate-400">Day Streak</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-4 border border-white/5 text-center">
                    <Zap className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">450</div>
                    <div className="text-xs text-slate-400">Total XP</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-4 border border-white/5 text-center">
                    <Trophy className="w-8 h-8 text-[#8B1538] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-xs text-slate-400">Completed</div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-full p-4 shadow-xl">
                <Star className="w-6 h-6 text-amber-900" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-4 bg-slate-800/30 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-medium text-slate-300">60+ learners already started</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-medium text-slate-300">No credit card needed</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-medium text-slate-300">Try demo in 30 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-amber-400 bg-clip-text text-transparent mb-2">21</div>
              <div className="text-sm text-slate-400">Interactive Lessons</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-amber-400 bg-clip-text text-transparent mb-2">7</div>
              <div className="text-sm text-slate-400">Learning Units</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-amber-400 bg-clip-text text-transparent mb-2">140+</div>
              <div className="text-sm text-slate-400">Words & Phrases</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-amber-400 bg-clip-text text-transparent mb-2">Free</div>
              <div className="text-sm text-slate-400">Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-3">Everything You Need to Learn Pashto</h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto">
              Puhanah combines the best language learning methods with gamification to keep you motivated
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#8B1538]/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#660C21] rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Interactive Lessons</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Learn through multiple choice, sentence building, and real conversation practice. Every lesson is designed to be engaging and effective.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Daily Streaks</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Build consistent learning habits with daily streaks. The longer your streak, the more motivated you'll be to keep going.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-amber-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Earn XP & Level Up</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Complete lessons to earn XP, level up, and unlock achievements. Learning feels like playing a game.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Leaderboards</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Compete with other learners on the leaderboard. See how you rank and stay motivated to climb higher.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Track Progress</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Monitor your learning journey with detailed progress tracking. See which lessons you've completed and what's next.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-slate-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Real Conversations</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Practice real-world conversations from greetings to shopping at the market. Learn Pashto you'll actually use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-3">How Puhanah Works</h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto">
              Start speaking Pashto in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B1538] to-[#660C21] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Try a Demo Lesson</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Click "Get Started Free" and start learning immediately. No signup required for your first 3 lessons!
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B1538] to-[#660C21] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Create Free Account</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Like it? Sign up for free to save your progress and unlock all 21 lessons. No credit card needed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B1538] to-[#660C21] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Learn & Master Pashto</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Complete interactive exercises, earn XP, build your streak, and master Pashto at your own pace!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/logo.png" 
                  alt="Puhanah Logo" 
                  width={36} 
                  height={36}
                  className="rounded-lg"
                />
                <span className="font-bold text-lg text-white">Puhanah</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                Learn Pashto naturally with interactive lessons and gamification.
              </p>
              <p className="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">
                <Star className="w-3 h-3" />
                پوهنه · Knowledge is Light
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard/lessons" className="text-slate-400 hover:text-white transition-colors">Lessons</Link></li>
                <li><Link href="/register" className="text-slate-400 hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="text-slate-400 hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">© 2026 Puhanah. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Users className="w-4 h-4" />
              <span>Join 60+ learners mastering Pashto</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}