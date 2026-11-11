'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroBanner() {
  const { lang, t } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0B6E4F] via-[#085a40] to-[#053b2a] text-white rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl mb-10">
      {/* Background Decorative patterns */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-60 h-60 rounded-full bg-[#F4A300]/10 blur-xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#F4A300] text-xs font-semibold mb-4 border border-white/15">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'পাতাঘর — বাংলাদেশের বিশ্বস্ত মেগা অনলাইন শপ' : 'Pataghor — Bangladesh’s Premier Mega Online Store'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-[#FAF7F0]">
          {lang === 'bn' ? 'বই, গ্যাজেট ও লাইফস্টাইলের বিশাল আয়োজন' : 'Books, Gadgets & Lifestyle at Your Fingertips'}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed mb-8 max-w-2xl">
          {lang === 'bn'
            ? 'প্রিয় বই, স্মার্টওয়াচ, ওয়্যারলেস বাডস, প্রিমিয়াম স্টেশনারি, খাঁটি আতর ও গিফট সামগ্রী ঘরে বসেই অর্ডার করুন দ্রুত ক্যাশ অন ডেলিভারিতে।'
            : 'Explore thousands of books, smartwatches, earbuds, executive diaries, authentic attars, and lifestyle essentials delivered fast.'}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/catalog"
            className="px-6 py-3.5 rounded-xl bg-[#F4A300] hover:bg-[#d99000] text-[#1E293B] font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-[#1E293B]" />
            <span>{t.home.browseCatalog}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <Link
            href="/catalog?flash=true"
            className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base transition-all backdrop-blur-sm border border-white/20"
          >
            ⚡ {t.home.exploreOffer}
          </Link>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/15 text-xs text-emerald-100">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#F4A300] shrink-0" />
            <span>{lang === 'bn' ? 'ঢাকা ৬০৳ | বাইরে ১২০৳' : 'Dhaka ৳60 | Outside ৳120'}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F4A300] shrink-0" />
            <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}</span>
          </div>
          <div className="flex items-center gap-2 hidden sm:flex">
            <Sparkles className="w-4 h-4 text-[#F4A300] shrink-0" />
            <span>{lang === 'bn' ? '১০০% অরিজিনাল পণ্য ও ওয়ারেন্টি' : '100% Genuine & Warranty'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

