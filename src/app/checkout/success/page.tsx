'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, Truck, ArrowRight, BookOpen, Clock, ShieldCheck } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'PTG-XXXXX';
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-lg text-center">
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-full bg-[#E8F5EE] text-[#0B6E4F] flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce">
        <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-2">
        {t.checkout.orderSuccessTitle}
      </h1>

      <p className="text-xs sm:text-sm text-gray-500 mb-6">
        {lang === 'bn'
          ? 'আমরা আপনার অর্ডারটি পেয়েছি। শীঘ্রই আপনার ঠিকানায় বই পৌঁছে যাবে।'
          : 'We have received your order and are preparing your books for dispatch.'}
      </p>

      {/* Order Number Box */}
      <div className="bg-[#FAF7F0] border-2 border-dashed border-[#0B6E4F]/30 rounded-2xl p-4 sm:p-6 mb-8 max-w-md mx-auto">
        <span className="text-xs font-semibold text-gray-500 block mb-1">
          {t.checkout.orderNumber}
        </span>
        <span className="text-2xl sm:text-3xl font-black text-[#0B6E4F] tracking-wider select-all">
          {orderNumber}
        </span>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
          <Truck className="w-5 h-5 text-[#0B6E4F] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-gray-800">
              {lang === 'bn' ? 'ডেলিভারির সময়সীমা' : 'Delivery Timeline'}
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {t.checkout.deliveryEstimate}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#F4A300] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-gray-800">
              {lang === 'bn' ? 'পেমেন্ট পদ্ধতি' : 'Payment on Delivery'}
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {lang === 'bn'
                ? 'বই হাতে পেয়ে ডেলিভারিম্যানকে টাকা দিন'
                : 'Pay cash to delivery courier after inspecting books'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href={`/track?orderNumber=${orderNumber}`}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <Truck className="w-4 h-4" />
          <span>{t.checkout.trackOrderButton}</span>
        </Link>

        <Link
          href="/catalog"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FAF7F0] hover:bg-gray-100 text-gray-800 font-bold text-xs border border-gray-200 transition-all flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-[#0B6E4F]" />
          <span>{t.cart.continueShopping}</span>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full flex items-center justify-center">
        <Suspense fallback={<div className="p-8 text-center text-xs">লোড হচ্ছে...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

