'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/context/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, Lock, Mail, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // If Supabase is connected via environment variables
    if (supabase) {
      try {
        if (isSignUp) {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName },
            },
          });
          if (error) throw error;
          setMessage({
            text:
              lang === 'bn'
                ? 'অ্যাকাউন্ট তৈরি হয়েছে! আপনার ইমেইল যাচাই করুন।'
                : 'Account created! Please check your email to verify.',
            isError: false,
          });
        } else {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          router.push('/account');
        }
      } catch (err: unknown) {
        setMessage({
          text: err instanceof Error ? err.message : 'Authentication failed',
          isError: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Demo / Preview Mode authentication simulation
      setTimeout(() => {
        setLoading(false);
        router.push('/account');
      }, 500);
    }
  };

  const handleGoogleLogin = async () => {
    if (supabase) {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/account`,
        },
      });
    } else {
      router.push('/account');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Header />

      <main className="flex-1 max-w-md mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
          {/* Brand Logo & Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#0B6E4F] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <BookOpen className="w-6 h-6 text-[#F4A300]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
              {isSignUp
                ? lang === 'bn'
                  ? 'পাতাঘরে অ্যাকাউন্ট তৈরি করুন'
                  : 'Create an Account'
                : lang === 'bn'
                ? 'স্বাগতম পাতাঘরে'
                : 'Welcome Back'}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'bn'
                ? 'বই পড়ার আনন্দ উপভোগ করুন সহজে'
                : 'Enjoy the joy of reading with doorstep delivery'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-6 text-xs font-bold">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 rounded-lg transition-all ${
                !isSignUp ? 'bg-white text-[#0B6E4F] shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {lang === 'bn' ? 'লগইন (Sign In)' : 'Sign In'}
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 rounded-lg transition-all ${
                isSignUp ? 'bg-white text-[#0B6E4F] shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {lang === 'bn' ? 'রেজিস্ট্রেশন (Sign Up)' : 'Sign Up'}
            </button>
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                message.isError
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{message.text}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-3.5 text-xs">
            {isSignUp && (
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={lang === 'bn' ? 'আপনার নাম' : 'John Doe'}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#0B6E4F]"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                {lang === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3.5 py-2.5 outline-none focus:border-[#0B6E4F]"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3.5 py-2.5 outline-none focus:border-[#0B6E4F]"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <span>{loading ? 'প্রসেস হচ্ছে...' : isSignUp ? 'অ্যাকাউন্ট খুলুন' : 'লগইন করুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              {lang === 'bn' ? 'অথবা' : 'Or continue with'}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Auth Button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-2.5 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google অ্যাকাউন্ট দিয়ে প্রবেশ করুন</span>
          </button>

          {/* Guest Checkout Bypass link */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <Link
              href="/checkout"
              className="text-xs text-[#0B6E4F] font-semibold hover:underline"
            >
              {lang === 'bn' ? 'অ্যাকাউন্ট ছাড়া গেস্ট চেকআউট করুন →' : 'Continue as Guest without account →'}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

