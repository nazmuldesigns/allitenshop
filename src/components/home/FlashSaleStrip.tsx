'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Zap } from 'lucide-react';
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
    <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 mb-8 shadow-2xs">
      {/* Header with Countdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-rose-50 text-[#E11D48] flex items-center justify-center font-bold">
            <Zap className="w-4 h-4 fill-[#E11D48]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {lang === 'bn' ? 'আজকের সুপার ডিল ও অফার' : 'Today’s Super Deals'}
              </h2>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                {lang === 'bn' ? 'সীমিত সময়' : 'Limited Time'}
              </span>
            </div>
            <p className="text-[11px] text-gray-500">
              {lang === 'bn' ? 'সেরা মূল্যে সর্বোচ্চ ছাড়ের পণ্য' : 'Top discounted products of the day'}
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="hidden sm:inline">{lang === 'bn' ? 'অফার শেষ হতে বাকি:' : 'Ends in:'}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-white">
            <span className="px-2 py-0.5 rounded bg-gray-900 min-w-[24px] text-center">
              {lang === 'bn' ? toBengaliNumber(String(timeLeft.hours).padStart(2, '0')) : String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-gray-400 font-bold">:</span>
            <span className="px-2 py-0.5 rounded bg-gray-900 min-w-[24px] text-center">
              {lang === 'bn' ? toBengaliNumber(String(timeLeft.minutes).padStart(2, '0')) : String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-gray-400 font-bold">:</span>
            <span className="px-2 py-0.5 rounded bg-[#E11D48] min-w-[24px] text-center">
              {lang === 'bn' ? toBengaliNumber(String(timeLeft.seconds).padStart(2, '0')) : String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
          <Link
            href="/catalog?flash=true"
            className="ml-2 text-xs font-bold text-[#0B6E4F] hover:underline flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'See All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {books.slice(0, 6).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
