'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Trophy, Flame, Zap, CheckCircle, Star, Globe, Users, Sparkles } from 'lucide-react';

export default function LightMode() {
  const [showLoginModal, setShowLoginModal] = useState(false);

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
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-4 py-2"
              >
                Sign In
              </button>
              <Link 
                href="/dashboard/lessons"
                className="text-sm bg-[#8B1538] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#660C21] transition-all shadow-sm"
              >
                Get Started
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
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="border-2 border-[#8B1538] text-[#8B1538] px-7 py-3 rounded-lg font-medium text-base hover:bg-rose-50 transition-all text-center"
                >
                  I Already Have an Account
                </button>
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
                Click "Try Free Lesson" and start learning immediately. No signup required for your first lesson!
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
            {/* Brand - CHANGED: Logo instead of P */}
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

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard/lessons" className="hover:text-white transition-colors">Lessons</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><button onClick={() => setShowLoginModal(true)} className="hover:text-white transition-colors">Login</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2026 Puhanah. All rights reserved.</p>
            <div className="flex items-center gap-2 mt-4 md:mt-0 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              <span>Join 60+ learners mastering Pashto</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

// Login Modal Component
function LoginModal({ onClose }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push('/dashboard/lessons');
      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#1a1625] to-[#2d1f3d] rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-[#8B1538]/30">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="absolute top-4 right-4">
          <Link
            href="/register"
            className="text-[#D4AF37] hover:text-[#b8973d] transition-colors font-semibold text-sm"
          >
            SIGN UP
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mt-8 mb-8">
          Log in
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or username"
              required
              className="w-full px-4 py-3 bg-[#2d1f3d] border border-[#8B1538]/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#8B1538] focus:ring-2 focus:ring-[#8B1538]/20 transition-colors"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 bg-[#2d1f3d] border border-[#8B1538]/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#8B1538] focus:ring-2 focus:ring-[#8B1538]/20 transition-colors"
            />
            <div className="text-right mt-2">
              <Link
                href="/reset-password"
                className="text-sm text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
              >
                FORGOT?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#8B1538] to-[#660C21] text-white py-3 rounded-xl font-bold hover:from-[#a01843] hover:to-[#75102a] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'LOGGING IN...' : 'LOG IN'}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-white/50 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-transparent border border-[#8B1538]/30 text-white py-3 rounded-xl font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>GOOGLE</span>
          </button>
          <button className="flex-1 bg-transparent border border-[#8B1538]/30 text-white py-3 rounded-xl font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>FACEBOOK</span>
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-white/40">
          By signing in to Puhanah, you agree to our{' '}
          <Link href="/terms" className="text-[#D4AF37]/70 hover:text-[#D4AF37]">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-[#D4AF37]/70 hover:text-[#D4AF37]">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}