'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

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

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    setError('');

    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard/lessons`,
        },
      });

      if (error) throw error;
    } catch (error) {
      setError(error.message);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE2YzAtNC40MTggMy41ODItOCA4LThzOCAzLjU4MiA4IDgtMy41ODIgOC04IDgtOC0zLjU4Mi04LTh6TTAgMTZjMC00LjQxOCAzLjU4Mi04IDgtOHM4IDMuNTgyIDggOC0zLjU4MiA4LTggOC04LTMuNTgyLTgtOHptMCAzNmMwLTQuNDE4IDMuNTgyLTggOC04czggMy41ODIgOCA4LTMuNTgyIDgtOCA4LTgtMy41ODItOC04em0zNiAwYzAtNC40MTggMy41ODItOCA4LThzOCAzLjU4MiA4IDgtMy41ODIgOC04IDgtOC0zLjU4Mi04LTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

      {/* Close Button - Top Left */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-6 left-6 z-50 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Sign Up Button - Top Right */}
      <Link
        href="/register"
        className="fixed top-6 right-6 z-50 text-[#D4AF37] hover:text-[#b8973d] transition-colors font-semibold text-sm px-6 py-2 border-2 border-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10"
      >
        SIGN UP
      </Link>

      {/* Login Form - Centered */}
      <div className="relative z-10 bg-gradient-to-br from-[#1a1625] to-[#2d1f3d] rounded-2xl shadow-2xl max-w-md w-full p-8 border border-[#8B1538]/30">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
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
          <button 
            onClick={() => handleSocialLogin('google')}
            disabled={socialLoading === 'google'}
            className="flex-1 bg-transparent border border-[#8B1538]/30 text-white py-3 rounded-xl font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{socialLoading === 'google' ? 'LOADING...' : 'GOOGLE'}</span>
          </button>
          <button 
            onClick={() => handleSocialLogin('facebook')}
            disabled={socialLoading === 'facebook'}
            className="flex-1 bg-transparent border border-[#8B1538]/30 text-white py-3 rounded-xl font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>{socialLoading === 'facebook' ? 'LOADING...' : 'FACEBOOK'}</span>
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