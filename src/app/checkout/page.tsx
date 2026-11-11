'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import BDLocationPicker from '@/components/checkout/BDLocationPicker';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { PaymentMethod } from '@/types';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Smartphone,
  CheckCircle2,
  Lock,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    clearCart,
    subtotal,
    appliedCoupon,
    discountAmount,
    selectedDivision,
    selectedDistrict,
    setLocation,
    deliveryFee,
    grandTotal,
  } = useCart();

  const { lang, t, formatPrice } = useLanguage();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [upazila, setUpazila] = useState('Dhanmondi');
  const [streetAddress, setStreetAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If cart is empty, redirect or display notice
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
        <Header />
        <main className="flex-1 max-w-xl mx-auto px-4 py-16 text-center">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t.cart.emptyTitle}</h2>
            <p className="text-xs text-gray-500 mb-6">{t.cart.emptySubtitle}</p>
            <Link
              href="/catalog"
              className="px-6 py-2.5 rounded-xl bg-[#0B6E4F] text-white text-xs font-bold"
            >
              {t.cart.continueShopping}
            </Link>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    );
  }

  const handleDivisionChange = (div: string) => {
    setLocation(div, selectedDistrict);
  };

  const handleDistrictChange = (dist: string) => {
    setLocation(selectedDivision, dist);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Bangladeshi phone validation (starts with 01, exactly 11 digits)
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone.startsWith('01') || cleanPhone.length !== 11) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (উদা: 01712345678)'
          : 'Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01712345678)'
      );
      return;
    }

    if (!streetAddress.trim()) {
      setErrorMessage(
        lang === 'bn' ? 'অনুগ্রহ করে বিস্তারিত ঠিকানা দিন' : 'Please provide detailed delivery address'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: fullName,
          customer_email: email || null,
          customer_phone: cleanPhone,
          shipping_division: selectedDivision,
          shipping_district: selectedDistrict,
          shipping_upazila: upazila,
          shipping_street_address: streetAddress,
          payment_method: paymentMethod,
          coupon_code: appliedCoupon?.code || null,
          notes,
          items: cart,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Order failed');
      }

      // Order created! Clear cart
      clearCart();

      // If client redirect required (e.g. online bKash sandbox), redirect there
      if (data.paymentResult?.requiresClientRedirect && data.paymentResult?.redirectUrl) {
        window.location.href = data.paymentResult.redirectUrl;
      } else {
        router.push(`/checkout/success?orderNumber=${data.order.order_number}`);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to place order');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 sm:py-8 w-full">
        <div className="mb-6">
          <Link
            href="/cart"
            className="text-xs font-semibold text-gray-500 hover:text-[#0B6E4F] flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'কার্টে ফিরে যান' : 'Back to Cart'}</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
            {t.checkout.title}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {lang === 'bn'
              ? 'নিরাপদ ক্যাশ অন ডেলিভারি এবং দ্রুত সরবরাহ'
              : 'Secure checkout with Cash on Delivery and fast nationwide delivery'}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Customer Information */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#1E293B] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0B6E4F] text-white text-xs flex items-center justify-center font-bold">
                  ১
                </span>
                <span>{t.checkout.customerInfo}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.checkout.fullName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'bn' ? 'উদা: তানভীর হাসান' : 'e.g. Tanvir Hasan'}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0B6E4F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.checkout.phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={11}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01712345678"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0B6E4F]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.checkout.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0B6E4F]"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    {lang === 'bn'
                      ? 'ইমেইল দিলে স্বয়ংক্রিয়ভাবে ইনভয়েস ও ট্র্যাকিং আপডেট পাঠানো হবে'
                      : 'We will send order confirmation and tracking details to this email'}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#1E293B] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0B6E4F] text-white text-xs flex items-center justify-center font-bold">
                  ২
                </span>
                <span>{t.checkout.shippingAddress}</span>
              </h2>

              <div className="space-y-4">
                {/* Bangladesh Hierarchical Picker */}
                <BDLocationPicker
                  division={selectedDivision}
                  district={selectedDistrict}
                  upazila={upazila}
                  onDivisionChange={handleDivisionChange}
                  onDistrictChange={handleDistrictChange}
                  onUpazilaChange={setUpazila}
                />

                <div className="p-2.5 rounded-lg bg-[#E8F5EE] border border-[#0B6E4F]/20 text-[11px] text-[#0B6E4F] font-medium flex items-center gap-2">
                  <Truck className="w-4 h-4 shrink-0 text-[#0B6E4F]" />
                  <span>
                    {selectedDistrict.toLowerCase().includes('dhaka')
                      ? (lang === 'bn' ? 'ঢাকা জেলা: ডেলিভারি চার্জ মাত্র ৬০৳' : 'Inside Dhaka: Delivery fee ৳60')
                      : (lang === 'bn' ? 'ঢাকার বাইরে: ডেলিভারি চার্জ ১২০৳' : 'Outside Dhaka: Delivery fee ৳120')}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.checkout.streetAddress} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder={
                      lang === 'bn'
                        ? 'বাড়ি নং, রোড নং, ফ্ল্যাট/ফ্লোর, এলাকার নাম বা পরিচিত ল্যান্ডমার্ক'
                        : 'House no, Road no, Flat/Floor, Area, Landmark'
                    }
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0B6E4F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.checkout.orderNotes}
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      lang === 'bn'
                        ? 'ডেলিভারির সময় কল করুন / ছুটির দিনে ডেলিভারি দিন'
                        : 'Call before delivery / Deliver after 4pm'
                    }
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0B6E4F]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm">
              <h2 className="text-sm font-bold text-[#1E293B] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0B6E4F] text-white text-xs flex items-center justify-center font-bold">
                  ৩
                </span>
                <span>{t.checkout.paymentMethod}</span>
              </h2>

              <div className="space-y-3">
                {/* COD (Default) */}
                <label
                  className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#0B6E4F] bg-[#E8F5EE]/40'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-[#0B6E4F]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1E293B]">
                        {t.checkout.cod}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0B6E4F] text-white">
                        {lang === 'bn' ? 'প্রস্তাবিত' : 'Recommended'}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">{t.checkout.codDesc}</p>
                  </div>
                </label>

                {/* bKash */}
                <label
                  className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-[#0B6E4F] bg-[#E8F5EE]/40'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="bkash"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="mt-1 accent-[#0B6E4F]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1E293B]">bKash (বিকাশ)</span>
                      <span className="text-[10px] text-gray-400">Sandbox / Gateway</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {lang === 'bn'
                        ? 'বিকাশ অনলাইন পেমেন্ট গেটওয়ে ইন্টিগ্রেশন মোড'
                        : 'Pay directly via bKash gateway'}
                    </p>
                  </div>
                </label>

                {/* Nagad */}
                <label
                  className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'nagad'
                      ? 'border-[#0B6E4F] bg-[#E8F5EE]/40'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value="nagad"
                    checked={paymentMethod === 'nagad'}
                    onChange={() => setPaymentMethod('nagad')}
                    className="mt-1 accent-[#0B6E4F]"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#1E293B]">Nagad (নগদ)</span>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {lang === 'bn'
                        ? 'নগদ ওয়ালেট পেমেন্ট সিস্টেম'
                        : 'Pay directly via Nagad gateway'}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm sticky top-24">
              <h3 className="text-sm font-bold text-[#1E293B] mb-4 pb-2 border-b border-gray-100">
                {t.cart.orderSummary}
              </h3>

              {/* Items Miniature List */}
              <div className="space-y-3 mb-4 max-h-56 overflow-y-auto pr-1 divide-y divide-gray-50">
                {cart.map((item) => (
                  <div key={item.book.id} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">
                        {lang === 'bn' ? item.book.title_bn : item.book.title}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {formatPrice(item.book.discount_price ?? item.book.price)} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-gray-700 shrink-0">
                      {formatPrice((item.book.discount_price ?? item.book.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2.5 pt-3 border-t border-gray-100 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-semibold text-gray-800">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-[#0B6E4F] font-semibold">
                    <span>{t.cart.discount} ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>{t.cart.deliveryFee}</span>
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

              {/* Confirm Order Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3.5 px-4 rounded-xl bg-[#0B6E4F] hover:bg-[#074D37] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <Lock className="w-4 h-4" />
                <span>{loading ? t.checkout.placingOrder : t.checkout.placeOrder}</span>
              </button>

              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-center text-gray-500">
                <span>🔒 {lang === 'bn' ? '১০০% নিরাপদ এবং সুরক্ষিত চেকআউট' : '100% Safe & Secure Checkout'}</span>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

