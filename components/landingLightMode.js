'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Trophy, Flame, Zap, CheckCircle, Star, Globe, Users, Sparkles } from 'lucide-react';

export default function LightMode() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
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
              <span className="font-bold text-xl text-gray-900">Puhanah</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link 
                href="/register"
                className="text-sm bg-[#8B1538] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#660C21] transition-all shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-rose-50/30 via-white to-amber-50/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-100/60 text-[#8B1538] px-3 py-1.5 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Try 3 lessons free - no signup required!</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                Master Pashto,
                <span className="bg-gradient-to-r from-[#8B1538] to-[#660C21] bg-clip-text text-transparent"> One Lesson</span> at a Time
              </h1>
              
              <p className="text-lg text-gray-600 mb-3 leading-relaxed">
                Interactive lessons from alphabet to conversations. See results in your first 10-minute lesson.
              </p>

              <p className="text-sm text-[#8B1538] font-semibold mb-8 flex items-center gap-2">
                <Star className="w-4 h-4 text-[#D4AF37]" />
                پوهنه · Knowledge is Light
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/dashboard/lessons"
                  className="bg-[#8B1538] text-white px-7 py-3 rounded-lg font-medium text-base hover:bg-[#660C21] transition-all shadow-md hover:shadow-lg text-center"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/login"
                  className="border-2 border-[#8B1538] text-[#8B1538] px-7 py-3 rounded-lg font-medium text-base hover:bg-rose-50 transition-all text-center"
                >
                  I Already Have an Account
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">3 free lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">No signup required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">21 total lessons</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl p-8 shadow-xl">
                <div className="bg-white rounded-xl p-5 mb-4 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-[#8B1538] to-[#660C21] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      👋
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Lesson 1</div>
                      <div className="font-semibold text-gray-900">Basic Greetings</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-[#8B1538] to-[#660C21] h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <div className="text-xs text-gray-500">70% complete</div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Flame className="w-7 h-7 text-orange-500 mb-2" />
                    <div className="text-xl font-bold text-gray-900">7</div>
                    <div className="text-xs text-gray-600">Day Streak</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Zap className="w-7 h-7 text-[#D4AF37] mb-2" />
                    <div className="text-xl font-bold text-gray-900">450</div>
                    <div className="text-xs text-gray-600">Total XP</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Trophy className="w-7 h-7 text-[#8B1538] mb-2" />
                    <div className="text-xl font-bold text-gray-900">12</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-[#D4AF37] rounded-full p-3 shadow-md">
                <Star className="w-6 h-6 text-amber-800" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-4 bg-amber-50 border-y border-amber-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#8B1538]" />
              <span className="text-sm font-medium text-gray-700">60+ learners already started</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">No credit card needed</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-medium text-gray-700">Try demo in 30 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 bg-gradient-to-r from-[#8B1538] to-[#660C21]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            <div>
              <div className="text-4xl font-bold mb-2">21</div>
              <div className="text-sm text-rose-100">Interactive Lessons</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">7</div>
              <div className="text-sm text-rose-100">Learning Units</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">140+</div>
              <div className="text-sm text-rose-100">Words & Phrases</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Free</div>
              <div className="text-sm text-rose-100">Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything You Need to Learn Pashto</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Puhanah combines the best language learning methods with gamification to keep you motivated
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#8B1538] rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Interactive Lessons</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Learn through multiple choice, sentence building, and real conversation practice. Every lesson is designed to be engaging and effective.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Daily Streaks</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Build consistent learning habits with daily streaks. The longer your streak, the more motivated you'll be to keep going.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Earn XP & Level Up</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Complete lessons to earn XP, level up, and unlock achievements. Learning feels like playing a game.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Leaderboards</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Compete with other learners on the leaderboard. See how you rank and stay motivated to climb higher.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Monitor your learning journey with detailed progress tracking. See which lessons you've completed and what's next.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Real Conversations</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Practice real-world conversations from greetings to shopping at the market. Learn Pashto you'll actually use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How Puhanah Works</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Start speaking Pashto in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#8B1538] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-md">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Try a Demo Lesson</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Click "Get Started Free" and start learning immediately. No signup required for your first 3 lessons!
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#8B1538] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-md">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Create Free Account</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Like it? Sign up for free to save your progress and unlock all 21 lessons. No credit card needed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#8B1538] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-md">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Learn & Master Pashto</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Complete interactive exercises, earn XP, build your streak, and master Pashto at your own pace!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
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
              <p className="text-sm text-gray-400 mb-3">
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
                <li><Link href="/dashboard/lessons" className="hover:text-white transition-colors">Lessons</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2026 Puhanah. All rights reserved.</p>
            <div className="flex items-center gap-2 mt-4 md:mt-0 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              <span>Join 60+ learners mastering Pashto</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}