'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, PhoneCall, Mail, MapPin, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-[#074D37] text-white pt-12 pb-24 md:pb-12 mt-16 border-t-4 border-[#F4A300]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Value Propositions Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#0B6E4F]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#0B6E4F] flex items-center justify-center shrink-0 text-[#F4A300]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{t.home.guarantee1}</h4>
              <p className="text-xs text-gray-300">{t.home.guarantee1Sub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#0B6E4F] flex items-center justify-center shrink-0 text-[#F4A300]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{t.home.guarantee2}</h4>
              <p className="text-xs text-gray-300">{t.home.guarantee2Sub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#0B6E4F] flex items-center justify-center shrink-0 text-[#F4A300]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{t.home.guarantee3}</h4>
              <p className="text-xs text-gray-300">{t.home.guarantee3Sub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#0B6E4F] flex items-center justify-center shrink-0 text-[#F4A300]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{t.home.guarantee4}</h4>
              <p className="text-xs text-gray-300">{t.home.guarantee4Sub}</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B6E4F] flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5 text-[#F4A300]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">{t.brand.name}</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">{t.brand.slogan}</p>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              {lang === 'bn'
                ? 'পাতাঘর বাংলাদেশের বিশ্বস্ত অনলাইন মেগা শপ। বই, স্মার্ট গ্যাজেট, প্রিমিয়াম স্টেশনারি, খাঁটি আতর ও গিফট সামগ্রী পৌঁছে দিচ্ছি সারা দেশে দ্রুত ক্যাশ অন ডেলিভারিতে।'
                : 'Pataghor is the trusted online mega store delivering books, smart gadgets, stationery, authentic attars, and gifts across Bangladesh with Cash on Delivery.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#F4A300] font-semibold">
              <span className="px-2 py-0.5 bg-[#0B6E4F] rounded">ক্যাশ অন ডেলিভারি</span>
              <span className="px-2 py-0.5 bg-[#0B6E4F] rounded">bKash</span>
              <span className="px-2 py-0.5 bg-[#0B6E4F] rounded">Nagad</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F4A300] mb-4">
              {lang === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  {t.nav.catalog}
                </Link>
              </li>
              <li>
                <Link href="/catalog?bestseller=true" className="hover:text-white transition-colors">
                  {t.nav.bestsellers}
                </Link>
              </li>
              <li>
                <Link href="/catalog?flash=true" className="hover:text-white transition-colors">
                  {t.nav.flashSale}
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-white transition-colors">
                  {t.nav.trackOrder}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  {t.nav.admin}
                </Link>
              </li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F4A300] mb-4">
              {lang === 'bn' ? 'ডিপার্টমেন্টসমূহ' : 'Departments'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/catalog?department=books" className="hover:text-white transition-colors">
                  {lang === 'bn' ? '📚 বই ও সাহিত্য' : 'Books & Literature'}
                </Link>
              </li>
              <li>
                <Link href="/catalog?department=electronics" className="hover:text-white transition-colors">
                  {lang === 'bn' ? '🎧 ইলেকট্রনিক্স ও গ্যাজেট' : 'Electronics & Gadgets'}
                </Link>
              </li>
              <li>
                <Link href="/catalog?department=stationery" className="hover:text-white transition-colors">
                  {lang === 'bn' ? '✏️ স্টেশনারি ও অফিস' : 'Stationery & Office'}
                </Link>
              </li>
              <li>
                <Link href="/catalog?department=islamic" className="hover:text-white transition-colors">
                  {lang === 'bn' ? '🕌 ইসলামিক আইটেম ও আতর' : 'Islamic & Attar'}
                </Link>
              </li>
              <li>
                <Link href="/catalog?department=kids" className="hover:text-white transition-colors">
                  {lang === 'bn' ? '🧸 কিডস ও খেলনা' : 'Kids & Toys'}
                </Link>
              </li>
              <li>
                <Link href="/catalog?department=gifts" className="hover:text-white transition-colors">
                  {lang === 'bn' ? '🎁 গিফট ও লাইফস্টাইল' : 'Gifts & Lifestyle'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F4A300] mb-4">
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4A300] shrink-0 mt-0.5" />
                <span>
                  {lang === 'bn'
                    ? 'বাংলাবাজার ও ধানমন্ডি, ঢাকা, বাংলাদেশ'
                    : 'Banglabazar & Dhanmondi, Dhaka, Bangladesh'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#F4A300] shrink-0" />
                <span>+880 1700-000000 (সকাল ৯টা - রাত ১০টা)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F4A300] shrink-0" />
                <span>support@pataghor.com</span>
              </div>
              <div className="mt-4 pt-3 border-t border-[#0B6E4F] text-[11px] text-gray-300">
                {lang === 'bn'
                  ? 'ডেলিভারি চার্জ: ঢাকা সিটিতে ৬০৳, সারাদেশে ১২০৳'
                  : 'Delivery: Dhaka City ৳60, Nationwide ৳120'}
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Courier Partners Strip (Rokomari Style) */}
        <div className="py-6 border-t border-[#0B6E4F] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-gray-300 font-semibold">{lang === 'bn' ? 'পেমেন্ট মাধ্যম:' : 'Payment Methods:'}</span>
            <span className="px-2.5 py-1 bg-white/10 rounded font-semibold text-white">ক্যাশ অন ডেলিভারি</span>
            <span className="px-2.5 py-1 bg-[#D12053] rounded font-bold text-white">bKash</span>
            <span className="px-2.5 py-1 bg-[#F7941D] rounded font-bold text-white">Nagad</span>
            <span className="px-2.5 py-1 bg-white/10 rounded font-semibold text-white">Visa / Mastercard</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-gray-300 font-semibold">{lang === 'bn' ? 'ডেলিভারি পার্টনার:' : 'Delivery Partners:'}</span>
            <span className="px-2 py-0.5 bg-emerald-900/60 border border-emerald-700 rounded text-emerald-200 text-[11px] font-medium">Pathao</span>
            <span className="px-2 py-0.5 bg-emerald-900/60 border border-emerald-700 rounded text-emerald-200 text-[11px] font-medium">Steadfast</span>
            <span className="px-2 py-0.5 bg-emerald-900/60 border border-emerald-700 rounded text-emerald-200 text-[11px] font-medium">RedX</span>
            <span className="px-2 py-0.5 bg-emerald-900/60 border border-emerald-700 rounded text-emerald-200 text-[11px] font-medium">সুন্দরবন কুরিয়ার</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-[#0B6E4F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Pataghor (পাতাঘর). All rights reserved.</p>
          <p className="text-gray-400">
            {lang === 'bn' ? 'ভালোবাসা দিয়ে তৈরি বাংলাদেশের পাঠকদের জন্য ❤️' : 'Crafted with care for book lovers in Bangladesh ❤️'}
          </p>
        </div>
      </div>
    </footer>
  );
}

