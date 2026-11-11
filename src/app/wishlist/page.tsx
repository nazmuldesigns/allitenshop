'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import BookCard from '@/components/book/BookCard';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { lang, t, toBengaliNumber } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 sm:py-8 w-full">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] flex items-center gap-2.5">
              <Heart className="w-7 h-7 text-red-500 fill-red-500" />
              <span>{t.nav.wishlist}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'bn'
                ? `আপনার পছন্দের তালিকায় সংরক্ষিত বই (${toBengaliNumber(wishlist.length)}টি)`
                : `Saved books in your wishlist (${wishlist.length})`}
            </p>
          </div>

          {wishlist.length > 0 && (
            <Link
              href="/catalog"
              className="text-xs font-semibold text-[#0B6E4F] hover:underline"
            >
              {lang === 'bn' ? 'আরও বই খুঁজুন' : 'Browse more books'} →
            </Link>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              ❤️
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {lang === 'bn' ? 'পছন্দের তালিকা খালি' : 'Your wishlist is empty'}
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              {lang === 'bn'
                ? 'বইয়ের কার্ডে হার্ট আইকনে ক্লিক করে বই সংরক্ষণ করে রাখুন।'
                : 'Click the heart icon on any book card to save it here for later.'}
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6E4F] text-white font-bold text-xs hover:bg-[#074D37] transition-all shadow-md"
            >
              <span>{t.home.browseCatalog}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {wishlist.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

