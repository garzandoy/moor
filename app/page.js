import Link from 'next/link';
import { BookOpen, Trophy, Flame, Zap, CheckCircle, Star, Globe, Users, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <span className="font-bold text-xl text-gray-900">Puhana</span>
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
                className="text-sm bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50/50 via-white to-slate-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-700 px-3 py-1.5 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Learn Pashto the fun way</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                Master Pashto,
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent"> One Lesson</span> at a Time
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Learn Pashto through interactive lessons, gamification, and real conversations. Perfect for beginners and advanced learners alike.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/register"
                  className="bg-blue-600 text-white px-7 py-3 rounded-lg font-medium text-base hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-center"
                >
                  Start Learning Free
                </Link>
                <a 
                  href="#how-it-works"
                  className="border-2 border-gray-300 text-gray-700 px-7 py-3 rounded-lg font-medium text-base hover:border-gray-400 hover:bg-gray-50 transition-all text-center"
                >
                  See How It Works
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">21 interactive lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Track your progress</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl p-8 shadow-xl">
                <div className="bg-white rounded-xl p-5 mb-4 shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      👋
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Lesson 1</div>
                      <div className="font-semibold text-gray-900">Basic Greetings</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '70%'}}></div>
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
                    <Zap className="w-7 h-7 text-yellow-500 mb-2" />
                    <div className="text-xl font-bold text-gray-900">450</div>
                    <div className="text-xs text-gray-600">Total XP</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Trophy className="w-7 h-7 text-purple-500 mb-2" />
                    <div className="text-xl font-bold text-gray-900">12</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-md">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 bg-blue-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            <div>
              <div className="text-4xl font-bold mb-2">21</div>
              <div className="text-sm text-blue-100">Interactive Lessons</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">7</div>
              <div className="text-sm text-blue-100">Learning Units</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-sm text-blue-100">Words & Phrases</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Free</div>
              <div className="text-sm text-blue-100">To Get Started</div>
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
              Puhana combines the best language learning methods with gamification to keep you motivated
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
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

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How Puhana Works</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Start speaking Pashto in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-md">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Create Your Account</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sign up for free in seconds. No credit card required. Start learning immediately.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-md">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Lesson</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Start with basics or jump to any lesson. Progress through 7 units at your own pace.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 shadow-md">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Learn & Practice</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Complete interactive exercises, earn XP, build your streak, and master Pashto!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning Pashto?</h2>
          <p className="text-base text-blue-100 mb-8">
            Join thousands of learners mastering Pashto with Puhana. Start your journey today.
          </p>
          <Link 
            href="/register"
            className="inline-block bg-white text-blue-600 px-10 py-3 rounded-lg font-semibold text-base hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
          >
            Start Learning Free →
          </Link>
          <p className="text-blue-100 mt-4 text-sm">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  P
                </div>
                <span className="font-bold text-lg text-white">Puhana</span>
              </div>
              <p className="text-sm text-gray-400">
                Learn Pashto naturally with interactive lessons and gamification.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
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
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2024 Puhana. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}