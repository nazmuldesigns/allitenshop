'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Check, Star } from 'lucide-react';
import { Book } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import RatingStars from './RatingStars';

interface BookCardProps {
  book: Book;
  priority?: boolean;
}

export default function BookCard({ book }: BookCardProps) {
  const { lang, t, formatPrice, toBengaliNumber } = useLanguage();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  const isWished = isInWishlist(book.id);
  const currentPrice = book.discount_price ?? book.price;
  const hasDiscount = book.discount_price && book.discount_price < book.price;
  const discountPercent = hasDiscount
    ? Math.round(((book.price - book.discount_price!) / book.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book, 1);
    setAdded(true);
    showToast({
      type: 'success',
      message: lang === 'bn' ? `"${book.title_bn}" ঝুড়িতে যুক্ত হয়েছে!` : `Added "${book.title}" to cart!`,
      actionLabel: lang === 'bn' ? 'ঝুড়ি দেখুন' : 'View Cart',
      actionHref: '/cart',
    });
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(book);
    showToast({
      type: 'info',
      message: isWished
        ? (lang === 'bn' ? 'পছন্দের তালিকা থেকে সরানো হয়েছে' : 'Removed from wishlist')
        : (lang === 'bn' ? 'পছন্দের তালিকায় যুক্ত হয়েছে!' : 'Added to wishlist!'),
      actionLabel: lang === 'bn' ? 'তালিকা দেখুন' : 'View Wishlist',
      actionHref: '/wishlist',
    });
  };

  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 hover:border-[#0B6E4F] hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Top Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
        {hasDiscount && (
          <span className="bg-[#E11D48] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
            {lang === 'bn' ? `${toBengaliNumber(discountPercent)}% ছাড়` : `${discountPercent}% OFF`}
          </span>
        )}
        {book.is_flash_sale && (
          <span className="bg-[#F4A300] text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
            ⚡ {lang === 'bn' ? 'ডিল' : 'Deal'}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 border border-gray-100 shadow-xs transition-transform active:scale-90 ${
          isWished ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'
        }`}
        aria-label="Wishlist"
      >
        <Heart className={`w-3.5 h-3.5 ${isWished ? 'fill-red-500' : ''}`} />
      </button>

      {/* Product Image Container (Clean White with subtle border) */}
      <Link href={`/book/${book.slug}`} className="block relative pt-[120%] bg-white border-b border-gray-100 overflow-hidden">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.title}
            className="absolute inset-0 w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-gray-300">
            <span className="text-3xl mb-1">📦</span>
            <span className="text-xs text-gray-400">{book.title}</span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-3 flex flex-col flex-1">
        {/* Title */}
        <Link href={`/book/${book.slug}`} className="block mb-1 group-hover:text-[#0B6E4F] transition-colors">
          <h3 className="font-semibold text-xs sm:text-sm text-gray-800 line-clamp-2 leading-snug min-h-[34px]">
            {lang === 'bn' ? book.title_bn : book.title}
          </h3>
        </Link>

        {/* Author or Brand */}
        <p className="text-[11px] text-gray-500 mb-1.5 truncate">
          {book.author
            ? (lang === 'bn' ? book.author.name_bn : book.author.name)
            : book.brand
            ? (lang === 'bn' ? `ব্র্যান্ড: ${book.brand}` : `Brand: ${book.brand}`)
            : (lang === 'bn' ? 'অরিজিনাল প্রোডাক্ট' : 'Original Product')}
        </p>

        {/* Rating */}
        <div className="mb-2">
          <RatingStars rating={book.rating_avg} count={book.rating_count} size="sm" />
        </div>

        {/* Price Block */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-[#0B6E4F]">
                {formatPrice(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-[11px] text-gray-400 line-through">
                  {formatPrice(book.price)}
                </span>
              )}
            </div>
            {book.stock_quantity <= 0 ? (
              <span className="text-[10px] text-red-600 font-semibold">{t.book.outOfStock}</span>
            ) : book.stock_quantity <= 5 ? (
              <span className="text-[10px] text-amber-600 font-medium">
                {lang === 'bn' ? `মাত্র ${toBengaliNumber(book.stock_quantity)}টি বাকি` : `Only ${book.stock_quantity} left`}
              </span>
            ) : (
              <span className="text-[10px] text-emerald-600 font-medium">✓ {t.book.inStock}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={book.stock_quantity <= 0}
            className={`p-2 sm:px-2.5 sm:py-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 ${
              book.stock_quantity <= 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : added
                ? 'bg-[#0B6E4F] text-white shadow-xs'
                : 'bg-emerald-50 text-[#0B6E4F] hover:bg-[#0B6E4F] hover:text-white border border-emerald-200'
            }`}
            aria-label={t.book.addToCart}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">{lang === 'bn' ? 'যুক্ত' : 'Added'}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">{lang === 'bn' ? 'কিনুন' : 'Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
