'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Clock, ArrowRight } from 'lucide-react';
import { Book } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import BookCard from '../book/BookCard';

interface FlashSaleStripProps {
  books: Book[];
}

export default function FlashSaleStrip({ books }: FlashSaleStripProps) {
  const { lang, t, toBengaliNumber } = useLanguage();

  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 35,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!books || books.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-[#FEF6E6] via-[#FFF9EE] to-[#FEF6E6] border border-[#F4A300]/30 rounded-2xl p-5 sm:p-6 mb-12 shadow-sm">
      {/* Header with Countdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F4A300]/20">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#F4A300] text-white">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1E293B] flex items-center gap-2">
              <span>{t.home.flashSaleTitle}</span>
            </h2>
            <p className="text-xs text-gray-500">
              {lang === 'bn' ? 'সীমিত সময়ের জন্য বিশেষ মূল্যছাড়' : 'Special discounts for a limited time'}
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C88500]" />
          <span className="text-xs font-medium text-gray-600 hidden sm:inline">
            {t.home.flashSaleEndsIn}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-white">
            <span className="px-2 py-1 rounded bg-[#0B6E4F] min-w-[28px] text-center">
              {lang === 'bn' ? toBengaliNumber(String(timeLeft.hours).padStart(2, '0')) : String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-gray-400 font-bold">:</span>
            <span className="px-2 py-1 rounded bg-[#0B6E4F] min-w-[28px] text-center">
              {lang === 'bn' ? toBengaliNumber(String(timeLeft.minutes).padStart(2, '0')) : String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-gray-400 font-bold">:</span>
            <span className="px-2 py-1 rounded bg-[#F4A300] min-w-[28px] text-center text-[#1E293B]">
              {lang === 'bn' ? toBengaliNumber(String(timeLeft.seconds).padStart(2, '0')) : String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
          <Link
            href="/catalog?flash=true"
            className="ml-2 text-xs font-semibold text-[#0B6E4F] hover:text-[#074D37] flex items-center gap-1"
          >
            <span>{t.home.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {books.slice(0, 6).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

