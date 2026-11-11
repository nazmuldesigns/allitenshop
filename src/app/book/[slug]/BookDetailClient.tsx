'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Zap,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  Share2,
  Check,
  Star,
} from 'lucide-react';
import { Book, Review } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import RatingStars from '@/components/book/RatingStars';
import BookCard from '@/components/book/BookCard';

interface BookDetailClientProps {
  book: Book;
  relatedBooks: Book[];
}

export default function BookDetailClient({ book, relatedBooks }: BookDetailClientProps) {
  const router = useRouter();
  const { lang, t, formatPrice, toBengaliNumber } = useLanguage();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  // Interactive local review submission state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev-1',
      book_id: book.id,
      reviewer_name: 'Sadia Rahman',
      rating: 5,
      comment: 'অসাধারণ একটি বই! কাগজ এবং বাঁধাইয়ের মান চমৎকার। পাতাঘরের ডেলিভারিও খুব দ্রুত পেয়েছি।',
      is_approved: true,
      created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'rev-2',
      book_id: book.id,
      reviewer_name: 'Imtiaz Ahmed',
      rating: 5,
      comment: 'Highly recommended! One of the finest pieces of literature. Original book delivered in pristine condition.',
      is_approved: true,
      created_at: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    },
  ]);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isWished = isInWishlist(book.id);
  const currentPrice = book.discount_price ?? book.price;
  const hasDiscount = book.discount_price && book.discount_price < book.price;
  const discountPercent = hasDiscount
    ? Math.round(((book.price - book.discount_price!) / book.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(book, quantity);
    router.push('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      book_id: book.id,
      reviewer_name: reviewerName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      is_approved: true,
      created_at: new Date().toISOString(),
    };

    setReviews([newRev, ...reviews]);
    setReviewerName('');
    setReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title_bn,
          text: `Check out ${book.title_bn} on Pataghor!`,
          url: window.location.href,
        });
      } catch {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'bn' ? 'লিংক কপি করা হয়েছে!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-[#0B6E4F]">
          {t.nav.home}
        </Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-[#0B6E4F]">
          {t.nav.catalog}
        </Link>
        <span>/</span>
        {book.author && (
          <>
            <Link
              href={`/catalog?author=${book.author.slug}`}
              className="hover:text-[#0B6E4F]"
            >
              {lang === 'bn' ? book.author.name_bn : book.author.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-800 font-medium truncate max-w-xs">
          {lang === 'bn' ? book.title_bn : book.title}
        </span>
      </nav>

      {/* Main Details Section */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Cover Image */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-[#F3EFE6] aspect-[1/1.4]">
              {hasDiscount && (
                <div className="absolute top-3 left-3 z-10 bg-[#0B6E4F] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  {lang === 'bn' ? `${toBengaliNumber(discountPercent)}% ছাড়` : `${discountPercent}% OFF`}
                </div>
              )}
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-gray-400">
                  <BookOpen className="w-16 h-16 text-gray-300 mb-2" />
                  <span className="text-sm font-semibold">{book.title}</span>
                </div>
              )}
            </div>

            {/* Quick Share & Wishlist Row */}
            <div className="flex items-center gap-4 mt-4 w-full max-w-sm justify-between px-2 text-xs text-gray-600">
              <button
                onClick={() => toggleWishlist(book)}
                className={`flex items-center gap-1.5 font-medium hover:text-red-500 transition-colors ${
                  isWished ? 'text-red-500 font-bold' : ''
                }`}
              >
                <Heart className={`w-4 h-4 ${isWished ? 'fill-red-500' : ''}`} />
                <span>{isWished ? (lang === 'bn' ? 'পছন্দের তালিকায় আছে' : 'In Wishlist') : (lang === 'bn' ? 'পছন্দের তালিকায় রাখুন' : 'Add to Wishlist')}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 font-medium hover:text-[#0B6E4F] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.book.shareBook}</span>
              </button>
            </div>
          </div>

          {/* Right: Book Details & Purchase Actions */}
          <div className="md:col-span-7 flex flex-col">
            {/* Title & Author */}
            <div className="border-b border-gray-100 pb-4 mb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-1">
                {lang === 'bn' ? book.title_bn : book.title}
              </h1>
              <p className="text-sm text-gray-500 font-medium mb-3">
                {lang === 'bn' ? book.title : book.title_bn}
              </p>

              <div className="flex items-center gap-4 flex-wrap text-xs text-gray-600">
                {book.author && (
                  <div>
                    <span className="text-gray-400">{t.book.author} </span>
                    <Link
                      href={`/catalog?author=${book.author.slug}`}
                      className="font-bold text-[#0B6E4F] hover:underline"
                    >
                      {lang === 'bn' ? book.author.name_bn : book.author.name}
                    </Link>
                  </div>
                )}
                {book.brand && (
                  <div>
                    <span className="text-gray-400">{lang === 'bn' ? 'ব্র্যান্ড: ' : 'Brand: '}</span>
                    <span className="font-bold text-[#0B6E4F]">{book.brand}</span>
                  </div>
                )}
                {book.warranty && (
                  <div>
                    <span className="text-gray-400">{lang === 'bn' ? 'ওয়ারেন্টি: ' : 'Warranty: '}</span>
                    <span className="font-bold text-blue-700">{book.warranty}</span>
                  </div>
                )}
                {book.publisher && (
                  <div>
                    <span className="text-gray-400">{t.book.publisher} </span>
                    <Link
                      href={`/catalog?publisher=${book.publisher.slug}`}
                      className="font-bold text-[#1E293B] hover:underline"
                    >
                      {lang === 'bn' ? book.publisher.name_bn : book.publisher.name}
                    </Link>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="mt-3">
                <RatingStars
                  rating={book.rating_avg}
                  count={book.rating_count}
                  size="md"
                  showCount
                />
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#E2D9C8]/70 mb-6 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#0B6E4F]">
                    {formatPrice(currentPrice)}
                  </span>
                  {hasDiscount && (
                    <span className="text-base text-gray-400 line-through font-medium">
                      {formatPrice(book.price)}
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    {lang === 'bn'
                      ? `আপনি সাশ্রয় করছেন ৳${toBengaliNumber(book.price - book.discount_price!)}`
                      : `You save ৳${book.price - book.discount_price!}`}
                  </p>
                )}
              </div>

              {/* Stock status */}
              <div className="text-right">
                {book.stock_quantity <= 0 ? (
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 font-bold text-xs rounded-full">
                    {t.book.outOfStock}
                  </span>
                ) : book.stock_quantity <= 5 ? (
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full">
                    {lang === 'bn'
                      ? `মাত্র ${toBengaliNumber(book.stock_quantity)}টি বাকি আছে`
                      : `Only ${book.stock_quantity} left`}
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-[#E8F5EE] text-[#0B6E4F] font-bold text-xs rounded-full">
                    ✓ {t.book.inStock}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            {book.stock_quantity > 0 && (
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-600">
                    {lang === 'bn' ? 'পরিমাণ:' : 'Quantity:'}
                  </span>
                  <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-bold min-w-[36px] text-center">
                      {lang === 'bn' ? toBengaliNumber(quantity) : quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(book.stock_quantity, quantity + 1))}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      added
                        ? 'bg-[#0B6E4F] text-white'
                        : 'bg-[#E8F5EE] text-[#0B6E4F] hover:bg-[#0B6E4F] hover:text-white border border-[#0B6E4F]/30'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>{t.book.addedToCart}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>{t.book.addToCart}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 px-5 rounded-xl font-bold text-sm bg-[#F4A300] hover:bg-[#d99000] text-[#1E293B] flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    <span>{t.book.buyNow}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Trust & Delivery Assurance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0B6E4F] shrink-0" />
                <span>{lang === 'bn' ? 'ঢাকা ৬০৳ | বাইরে ১২০৳' : 'Dhaka ৳60 | Outside ৳120'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0B6E4F] shrink-0" />
                <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#0B6E4F] shrink-0" />
                <span>{lang === 'bn' ? '৭ দিনের রিপ্লেসমেন্ট' : '7 Days Replacement'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Specifications, Reviews */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-8 shadow-sm mb-12">
        {/* Tab Headers */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'desc'
                ? 'border-[#0B6E4F] text-[#0B6E4F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t.book.description}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'specs'
                ? 'border-[#0B6E4F] text-[#0B6E4F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t.book.specifications}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-[#0B6E4F] text-[#0B6E4F]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>{t.book.reviews}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-gray-100 text-[10px] text-gray-600">
              {reviews.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'desc' && (
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            <p className="text-base font-medium mb-3">
              {lang === 'bn'
                ? book.description_bn || book.description
                : book.description || book.description_bn}
            </p>
            {book.author?.bio_bn && (
              <div className="mt-6 p-4 rounded-xl bg-[#FAF7F0] border border-[#E2D9C8]/60">
                <h4 className="font-bold text-sm text-[#0B6E4F] mb-1">
                  {lang === 'bn' ? 'লেখক পরিচিতি' : 'About the Author'}
                </h4>
                <p className="text-xs text-gray-600">
                  {lang === 'bn' ? book.author.bio_bn : book.author.bio}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Specifications Table */}
        {activeTab === 'specs' && (
          <div className="max-w-xl">
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-gray-100">
                {book.brand && (
                  <tr>
                    <td className="py-2.5 font-semibold text-gray-500 w-1/3">{lang === 'bn' ? 'ব্র্যান্ড' : 'Brand'}</td>
                    <td className="py-2.5 text-gray-800 font-bold">{book.brand}</td>
                  </tr>
                )}
                {book.warranty && (
                  <tr>
                    <td className="py-2.5 font-semibold text-gray-500">{lang === 'bn' ? 'ওয়ারেন্টি' : 'Warranty'}</td>
                    <td className="py-2.5 text-blue-700 font-semibold">{book.warranty}</td>
                  </tr>
                )}
                {book.department && (
                  <tr>
                    <td className="py-2.5 font-semibold text-gray-500">{lang === 'bn' ? 'ডিপার্টমেন্ট' : 'Department'}</td>
                    <td className="py-2.5 text-gray-800 font-medium capitalize">{book.department}</td>
                  </tr>
                )}
                {book.isbn && (
                  <tr>
                    <td className="py-2.5 font-semibold text-gray-500 w-1/3">{t.book.isbn}</td>
                    <td className="py-2.5 text-gray-800">{book.isbn}</td>
                  </tr>
                )}
                {book.pages && (
                  <tr>
                    <td className="py-2.5 font-semibold text-gray-500">{t.book.pages}</td>
                    <td className="py-2.5 text-gray-800">
                      {lang === 'bn' ? toBengaliNumber(book.pages) : book.pages}
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="py-2.5 font-semibold text-gray-500">{t.book.language}</td>
                  <td className="py-2.5 text-gray-800">
                    {book.language === 'bn' ? 'বাংলা (Bangla)' : 'English'}
                  </td>
                </tr>
                {book.edition && (
                  <tr>
                    <td className="py-2.5 font-semibold text-gray-500">{t.book.edition}</td>
                    <td className="py-2.5 text-gray-800">{book.edition}</td>
                  </tr>
                )}
                {book.published_year && (
                  <tr>
                    <td className="py-2.5 font-semibold text-gray-500">{t.book.publishedYear}</td>
                    <td className="py-2.5 text-gray-800">
                      {lang === 'bn' ? toBengaliNumber(book.published_year) : book.published_year}
                    </td>
                  </tr>
                )}
                {book.publisher && (
                  <tr>
                    <td className="py-2.5 font-semibold text-gray-500">{t.book.publisher}</td>
                    <td className="py-2.5 text-gray-800">
                      {lang === 'bn' ? book.publisher.name_bn : book.publisher.name}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Reader Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-800">{rev.reviewer_name}</span>
                    <RatingStars rating={rev.rating} showCount={false} size="sm" />
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-bold text-sm text-gray-800 mb-3">{t.book.writeReview}</h4>

              {reviewSubmitted ? (
                <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg">
                  ✓ {lang === 'bn' ? 'আপনার রিভিউ সফলভাবে যুক্ত হয়েছে! ধন্যবাদ।' : 'Your review has been submitted! Thank you.'}
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3 max-w-lg">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {t.book.yourRating}
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="p-1"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating
                                ? 'fill-[#F4A300] text-[#F4A300]'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {t.book.yourName}
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder={lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Your full name'}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0B6E4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {t.book.yourComment}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder={lang === 'bn' ? 'বইটি আপনার কেমন লেগেছে তা লিখুন...' : 'Write your thoughts about the book...'}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0B6E4F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0B6E4F] text-white text-xs font-bold hover:bg-[#074D37] transition-colors"
                  >
                    {t.book.submitReview}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
              {t.book.relatedBooks}
            </h2>
            <Link
              href="/catalog"
              className="text-xs sm:text-sm font-semibold text-[#0B6E4F] hover:text-[#074D37]"
            >
              {t.home.viewAll} →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedBooks.map((relBook) => (
              <BookCard key={relBook.id} book={relBook} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

