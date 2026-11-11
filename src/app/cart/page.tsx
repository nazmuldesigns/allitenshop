'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Trash2, ShoppingBag, ArrowRight, Tag, Truck, Check, Sparkles } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    selectedDivision,
    selectedDistrict,
    deliveryFee,
    grandTotal,
  } = useCart();

  const { lang, t, formatPrice, toBengaliNumber } = useLanguage();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;

    setCouponLoading(true);
    setCouponMessage(null);

    const res = await applyCoupon(couponCodeInput.trim());
    setCouponLoading(false);

    if (res.success) {
      setCouponMessage({ text: t.cart.couponApplied, isError: false });
      setCouponCodeInput('');
    } else {
      setCouponMessage({ text: res.message, isError: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 sm:py-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-6 flex items-center gap-3">
          <ShoppingBag className="w-7 h-7 text-[#0B6E4F]" />
          <span>{t.cart.title}</span>
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#E8F5EE] text-[#0B6E4F] flex items-center justify-center mx-auto mb-4 text-2xl">
              🛒
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t.cart.emptyTitle}</h2>
            <p className="text-xs text-gray-500 mb-6">{t.cart.emptySubtitle}</p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B6E4F] text-white font-bold text-sm hover:bg-[#074D37] transition-all shadow-md"
            >
              <span>{t.cart.continueShopping}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {lang === 'bn' ? 'নির্বাচিত বইসমূহ' : 'Selected Books'} ({cart.length})
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-red-500 hover:underline font-semibold"
                >
                  {t.cart.clearCart}
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => {
                  const book = item.book;
                  const unitPrice = book.discount_price ?? book.price;
                  const itemTotal = unitPrice * item.quantity;

                  return (
                    <div
                      key={book.id}
                      className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Book Cover + Title */}
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <div className="w-14 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                          {book.cover_url ? (
                            <img
                              src={book.cover_url}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                              📖
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/book/${book.slug}`}
                            className="font-bold text-sm text-[#1E293B] hover:text-[#0B6E4F] transition-colors line-clamp-1"
                          >
                            {lang === 'bn' ? book.title_bn : book.title}
                          </Link>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {book.author
                              ? lang === 'bn'
                                ? book.author.name_bn
                                : book.author.name
                              : ''}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-[#0B6E4F]">
                              {formatPrice(unitPrice)}
                            </span>
                            {book.discount_price && (
                              <span className="text-[10px] text-gray-400 line-through">
                                {formatPrice(book.price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls & Delete */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                          <button
                            onClick={() => updateQuantity(book.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-bold min-w-[28px] text-center bg-white">
                            {lang === 'bn' ? toBengaliNumber(item.quantity) : item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(book.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 font-bold text-xs"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#1E293B] min-w-[70px] text-right">
                          {formatPrice(itemTotal)}
                        </span>

                        <button
                          onClick={() => removeFromCart(book.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <Link
                  href="/catalog"
                  className="font-semibold text-[#0B6E4F] hover:underline flex items-center gap-1"
                >
                  ← {t.cart.continueShopping}
                </Link>
                <span className="text-gray-500">
                  {lang === 'bn' ? 'অর্ডার করতে চেকআউটে এগিয়ে যান' : 'Proceed to checkout to complete order'}
                </span>
              </div>
            </div>

            {/* Order Summary & Coupon Card */}
            <div className="lg:col-span-4 space-y-6">
              {/* Coupon Box */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#F4A300]" />
                  <span>{t.cart.couponCode}</span>
                </h3>

                {appliedCoupon ? (
                  <div className="p-3 rounded-xl bg-[#E8F5EE] border border-[#0B6E4F]/30 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#0B6E4F]">
                        <Check className="w-4 h-4" />
                        <span>{appliedCoupon.code}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        {lang === 'bn' ? `সাশ্রয়: ${formatPrice(discountAmount)}` : `Saved: ${formatPrice(discountAmount)}`}
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-500 hover:underline font-semibold"
                    >
                      {lang === 'bn' ? 'মুছুন' : 'Remove'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                        placeholder={lang === 'bn' ? 'কুপন লিখুন (উদা: BOIMELA20)' : 'e.g. BOIMELA20'}
                        className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs uppercase outline-none focus:border-[#0B6E4F]"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading || !couponCodeInput.trim()}
                        className="px-4 py-2 bg-[#0B6E4F] hover:bg-[#074D37] disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        {couponLoading ? '...' : t.cart.applyCoupon}
                      </button>
                    </div>
                    {couponMessage && (
                      <p
                        className={`text-[11px] font-semibold ${
                          couponMessage.isError ? 'text-red-500' : 'text-emerald-600'
                        }`}
                      >
                        {couponMessage.text}
                      </p>
                    )}
                    <p className="text-[10px] text-gray-400">
                      {lang === 'bn'
                        ? 'টিপস: BOIMELA20 (২০% ছাড়), PATAGHOR50 (৫০৳ ছাড়)'
                        : 'Tips: try BOIMELA20 (20% off) or PATAGHOR50 (৳50 off)'}
                    </p>
                  </form>
                )}
              </div>

              {/* Order Cost Calculation */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm">
                <h3 className="text-sm font-bold text-[#1E293B] mb-4 pb-2 border-b border-gray-100">
                  {t.cart.orderSummary}
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>{t.cart.subtotal}</span>
                    <span className="font-semibold text-gray-800">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-[#0B6E4F] font-semibold">
                      <span>{t.cart.discount} ({appliedCoupon?.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-gray-600">
                    <div>
                      <span>{t.cart.deliveryFee}</span>
                      <p className="text-[10px] text-gray-400">
                        {deliveryFee === 0 ? t.cart.freeDeliveryAlert : t.cart.dhakaFee}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {deliveryFee === 0 ? (
                        <span className="text-[#0B6E4F] font-bold">
                          {lang === 'bn' ? 'ফ্রি' : 'FREE'}
                        </span>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between text-base">
                    <span className="font-bold text-[#1E293B]">{t.cart.grandTotal}</span>
                    <span className="font-black text-xl text-[#0B6E4F]">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full mt-6 py-3.5 px-4 rounded-xl bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <span>{t.cart.proceedToCheckout}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-center text-gray-500 flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#0B6E4F]" />
                  <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারিতে কোনো অগ্রিম ফি নেই' : 'Cash on Delivery - No advance payment'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

