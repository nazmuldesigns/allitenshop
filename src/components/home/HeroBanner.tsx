'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Headphones,
  PenTool,
  Moon,
  Gamepad2,
  Gift,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Flame,
  CreditCard,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const SIDEBAR_CATEGORIES = [
  { slug: 'fiction', name_bn: 'উপন্যাস ও কথাসাহিত্য', name_en: 'Fiction & Novels', icon: BookOpen, count: '১২০+' },
  { slug: 'thriller-mystery', name_bn: 'রহস্য, গোয়েন্দা ও থ্রিলার', name_en: 'Thriller & Mystery', icon: Sparkles, count: '৮৫+' },
  { slug: 'electronics', name_bn: 'স্মার্ট ইলেকট্রনিক্স ও গ্যাজেট', name_en: 'Electronics & Gadgets', icon: Headphones, count: '৫০+' },
  { slug: 'islamic', name_bn: 'ইসলামিক সামগ্রী ও আতর', name_en: 'Islamic Items & Attar', icon: Moon, count: '৭০+' },
  { slug: 'stationery', name_bn: 'স্টেশনারি ও অফিস সাপ্লাই', name_en: 'Stationery & Office', icon: PenTool, count: '৪৫+' },
  { slug: 'kids', name_bn: 'কিডস জোন ও খেলনা', name_en: 'Kids Zone & Toys', icon: Gamepad2, count: '৪০+' },
  { slug: 'sci-fi', name_bn: 'সায়েন্স ফিকশন ও কল্পবিজ্ঞান', name_en: 'Science Fiction', icon: Flame, count: '৩০+' },
  { slug: 'gifts', name_bn: 'গিফট সামগ্রী ও লাইফস্টাইল', name_en: 'Gifts & Lifestyle', icon: Gift, count: '২৫+' },
];

export default function HeroBanner() {
  const { lang, t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      badge_bn: '🎉 পাতাঘর মেগা বৈশাখী অফার',
      badge_en: 'Special Mega Offer',
      title_bn: 'বই, গ্যাজেট ও লাইফস্টাইলের বিশাল আয়োজন',
      title_en: 'Books, Gadgets & Lifestyle under one roof',
      desc_bn: 'জনপ্রিয় বেস্টসেলার বই, স্মার্টওয়াচ, প্রিমিয়াম ডায়েরি ও খাঁটি আতরে সর্বোচ্চ ৫০% পর্যন্ত বিশেষ ছাড়!',
      desc_en: 'Huge discounts on bestselling books, smartwatches, luxury diaries, and authentic attar!',
      cta_link: '/catalog',
      cta_text_bn: 'এখনই কেনাকাটা করুন',
      cta_text_en: 'Shop Now',
      bg_color: 'bg-[#0B6E4F]',
      accent_color: 'text-[#F4A300]',
    },
    {
      badge_bn: '🎧 স্মার্ট গ্যাজেট সপ্তাহ',
      badge_en: 'Smart Gadget Week',
      title_bn: 'অফিসিয়াল ওয়ারেন্টিসহ স্মার্ট ইলেকট্রনিক্স',
      title_en: 'Official Warranty Smart Electronics',
      desc_bn: 'Haylou স্মার্টওয়াচ, Lenovo ইয়ারবাডস ও Remax পাওয়ার ব্যাংক — সরাসরি ঘরে বসেই ক্যাশ অন ডেলিভারিতে।',
      desc_en: 'Haylou smartwatches, Lenovo earbuds, and Remax power banks with nationwide cash on delivery.',
      cta_link: '/catalog?department=electronics',
      cta_text_bn: 'গ্যাজেট দেখুন',
      cta_text_en: 'Explore Gadgets',
      bg_color: 'bg-[#1E3A8A]',
      accent_color: 'text-amber-400',
    },
    {
      badge_bn: '🕌 খাঁটি আতর ও ইসলামিক কর্নার',
      badge_en: 'Authentic Islamic Corner',
      title_bn: 'আল-হারামাইন ওউদ আতর ও তুরস্কের জায়নামাজ',
      title_en: 'Al Haramain Amber Oud & Turkish Prayer Mats',
      desc_bn: '১০০% অ্যালকোহলমুক্ত রাজকীয় সুবাস ও আরামদায়ক ভেলভেট ফোম জায়নামাজ। সেরা উপহার সামগ্রী।',
      desc_en: '100% alcohol-free luxury oriental perfume oils and premium velvet padded prayer mats.',
      cta_link: '/catalog?department=islamic',
      cta_text_bn: 'ইসলামিক কালেকশন',
      cta_text_en: 'View Islamic Items',
      bg_color: 'bg-[#78350F]',
      accent_color: 'text-amber-300',
    },
  ];

  const current = slides[activeSlide];

  return (
    <div className="mb-8">
      {/* 2-Column Rokomari Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Category Sidebar (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-3 bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
          <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-2">
              <span className="text-[#0B6E4F]">☰</span>
              <span>{lang === 'bn' ? 'ক্যাটাগরি ব্রাউজ করুন' : 'Browse Categories'}</span>
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {SIDEBAR_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/catalog?category=${cat.slug}`}
                  className="flex items-center justify-between px-3.5 py-2.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#0B6E4F] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B6E4F] transition-colors" />
                    <span className="font-medium">{lang === 'bn' ? cat.name_bn : cat.name_en}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:translate-x-0.5 group-hover:text-[#0B6E4F] transition-all" />
                </Link>
              );
            })}
          </div>
          <div className="p-3 bg-gray-50 border-t border-gray-100">
            <Link
              href="/catalog"
              className="block text-center text-xs font-bold text-[#0B6E4F] hover:underline"
            >
              {lang === 'bn' ? 'সকল বিষয় ও ব্র্যান্ড দেখুন →' : 'View All Categories →'}
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Banner Carousel & Promo Cards */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          {/* Main Banner Slider */}
          <div className={`relative rounded-lg ${current.bg_color} text-white p-6 sm:p-8 md:p-10 shadow-xs overflow-hidden transition-colors duration-500 min-h-[260px] sm:min-h-[290px] flex flex-col justify-between`}>
            {/* Subtle background decorative shapes */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-xl pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <div className="inline-block px-2.5 py-1 rounded bg-white/15 text-xs font-bold mb-3 backdrop-blur-xs">
                {lang === 'bn' ? current.badge_bn : current.badge_en}
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-white leading-tight">
                {lang === 'bn' ? current.title_bn : current.title_en}
              </h1>

              <p className="text-xs sm:text-sm text-gray-100 mb-6 leading-relaxed line-clamp-2 sm:line-clamp-none max-w-lg">
                {lang === 'bn' ? current.desc_bn : current.desc_en}
              </p>

              <div className="flex items-center gap-3">
                <Link
                  href={current.cta_link}
                  className="px-5 py-2.5 rounded-md bg-[#F4A300] hover:bg-[#d99000] text-gray-900 font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>{lang === 'bn' ? current.cta_text_bn : current.cta_text_en}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/catalog?flash=true"
                  className="px-4 py-2.5 rounded-md bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm transition-colors border border-white/20"
                >
                  ⚡ {lang === 'bn' ? 'আজকের অফার' : 'Today Deals'}
                </Link>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2 mt-4 z-10">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeSlide ? 'w-6 bg-[#F4A300]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* 2 Quick Sub-Banners (Rokomari Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/catalog?department=electronics"
              className="bg-white rounded-lg p-3.5 border border-gray-200 hover:border-blue-500 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-800 group-hover:text-blue-600 transition-colors">
                    {lang === 'bn' ? 'স্মার্ট ইলেকট্রনিক্স জোন' : 'Smart Electronics Zone'}
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    {lang === 'bn' ? 'স্মার্টওয়াচ, ইয়ারবাডস ও গ্যাজেট' : 'Smartwatch, Earbuds & Accessories'}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/catalog?department=islamic"
              className="bg-white rounded-lg p-3.5 border border-gray-200 hover:border-amber-500 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-800 group-hover:text-amber-700 transition-colors">
                    {lang === 'bn' ? 'খাঁটি আতর ও জায়নামাজ' : 'Pure Attar & Prayer Mats'}
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    {lang === 'bn' ? '১০০% অ্যালকোহলমুক্ত সুবাস ও রেহাল' : 'Alcohol-free perfume oil & accessories'}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Trust & Benefit Badges (Rokomari Standard) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-md bg-emerald-50 text-[#0B6E4F] flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-gray-800 leading-tight">
              {lang === 'bn' ? 'দ্রুত ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}
            </h5>
            <p className="text-[11px] text-gray-500">
              {lang === 'bn' ? 'ঢাকা ৬০৳ | সারাদেশে ১২০৳' : 'Dhaka ৳60 | Outside ৳120'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-gray-800 leading-tight">
              {lang === 'bn' ? '১০০% অরিজিনাল পণ্য' : '100% Genuine Items'}
            </h5>
            <p className="text-[11px] text-gray-500">
              {lang === 'bn' ? 'সরাসরি প্রকাশক ও ব্র্যান্ড থেকে' : 'Direct from Brand & Publisher'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-gray-800 leading-tight">
              {lang === 'bn' ? '৭ দিনে সহজ রিটার্ন' : '7 Days Easy Return'}
            </h5>
            <p className="text-[11px] text-gray-500">
              {lang === 'bn' ? 'ত্রুটিযুক্ত পণ্যে সহজ বদল' : 'Hassle-free replacement'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-gray-800 leading-tight">
              {lang === 'bn' ? 'নিরাপদ পেমেন্ট' : 'Secure Payment'}
            </h5>
            <p className="text-[11px] text-gray-500">
              {lang === 'bn' ? 'ক্যাশ, বিকাশ, নগদ ও কার্ড' : 'bKash, Nagad, Cards & COD'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
