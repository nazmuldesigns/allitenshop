'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Headphones,
  PenTool,
  Moon,
  Gamepad2,
  Gift,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Department } from '@/types';

interface DepartmentCard {
  id: Department;
  title: string;
  title_bn: string;
  desc: string;
  desc_bn: string;
  badge_bn: string;
  badge_en: string;
  bgGradient: string;
  borderColor: string;
  iconBg: string;
  textColor: string;
  icon: React.ComponentType<{ className?: string }>;
  itemCountText_bn: string;
  itemCountText_en: string;
}

const DEPT_CARDS: DepartmentCard[] = [
  {
    id: 'books',
    title: 'Books & Literature',
    title_bn: 'বই ও সাহিত্য',
    desc: 'Bestseller novels, thrillers & academic',
    desc_bn: 'সেরা কথাসাহিত্য, রহস্য, কবিতা ও ক্লাসিক',
    badge_bn: 'মূল কালেকশন',
    badge_en: 'Main Library',
    bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-white',
    borderColor: 'hover:border-emerald-500/60',
    iconBg: 'bg-emerald-600 text-white',
    textColor: 'text-emerald-900',
    icon: BookOpen,
    itemCountText_bn: '১০০+ বই',
    itemCountText_en: '100+ Books',
  },
  {
    id: 'electronics',
    title: 'Electronics & Gadgets',
    title_bn: 'ইলেকট্রনিক্স ও গ্যাজেট',
    desc: 'Smartwatches, earbuds & accessories',
    desc_bn: 'স্মার্টওয়াচ, ট্রু-ওয়্যারলেস বাডস ও গ্যাজেট',
    badge_bn: 'অফিসিয়াল ওয়ারেন্টি',
    badge_en: 'Official Warranty',
    bgGradient: 'from-blue-500/10 via-blue-500/5 to-white',
    borderColor: 'hover:border-blue-500/60',
    iconBg: 'bg-blue-600 text-white',
    textColor: 'text-blue-900',
    icon: Headphones,
    itemCountText_bn: 'টপ রেটেড',
    itemCountText_en: 'Top Rated',
  },
  {
    id: 'stationery',
    title: 'Stationery & Office',
    title_bn: 'স্টেশনারি ও অফিস',
    desc: 'Leather journals, luxury pens & colors',
    desc_bn: 'লেদার ডায়রি, রোলারবল পেন ও আর্ট সামগ্রী',
    badge_bn: 'প্রিমিয়াম কোয়ালিটি',
    badge_en: 'Premium Craft',
    bgGradient: 'from-purple-500/10 via-purple-500/5 to-white',
    borderColor: 'hover:border-purple-500/60',
    iconBg: 'bg-purple-600 text-white',
    textColor: 'text-purple-900',
    icon: PenTool,
    itemCountText_bn: 'স্টুডেন্ট ফেভারিট',
    itemCountText_en: 'Student Pick',
  },
  {
    id: 'islamic',
    title: 'Islamic & Attar',
    title_bn: 'ইসলামিক কর্নার ও আতর',
    desc: 'Alcohol-free attars, prayer mats & tasbih',
    desc_bn: '১০০% খাঁটি ওউদ আতর, জায়নামাজ ও রেহাল',
    badge_bn: 'হালাল লাইফস্টাইল',
    badge_en: 'Halal Lifestyle',
    bgGradient: 'from-amber-500/10 via-amber-500/5 to-white',
    borderColor: 'hover:border-amber-500/60',
    iconBg: 'bg-amber-600 text-white',
    textColor: 'text-amber-900',
    icon: Moon,
    itemCountText_bn: 'খাঁটি ও পরীক্ষিত',
    itemCountText_en: 'Authentic',
  },
  {
    id: 'kids',
    title: 'Kids & Brain Toys',
    title_bn: 'বাচ্চাদের খেলনা ও কিট',
    desc: 'Alphabet puzzles, speed cubes & STEM kits',
    desc_bn: 'বাংলা বর্ণমালা পাজল, স্পিড কিউব ও রোবোটিকস',
    badge_bn: 'ব্রেন ডেভলপমেন্ট',
    badge_en: 'Brain Growth',
    bgGradient: 'from-pink-500/10 via-pink-500/5 to-white',
    borderColor: 'hover:border-pink-500/60',
    iconBg: 'bg-pink-600 text-white',
    textColor: 'text-pink-900',
    icon: Gamepad2,
    itemCountText_bn: 'নিরাপদ খেলনা',
    itemCountText_en: 'Safe & Smart',
  },
  {
    id: 'gifts',
    title: 'Gifts & Lifestyle',
    title_bn: 'গিফট ও লাইফস্টাইল',
    desc: 'Custom mugs, reading lights & bookmarks',
    desc_bn: 'টাইপোগ্রাফি মগ, রিডিং লাইট ও বুকমার্ক',
    badge_bn: 'সেরা উপহার',
    badge_en: 'Best Gifts',
    bgGradient: 'from-rose-500/10 via-rose-500/5 to-white',
    borderColor: 'hover:border-rose-500/60',
    iconBg: 'bg-rose-600 text-white',
    textColor: 'text-rose-900',
    icon: Gift,
    itemCountText_bn: 'উপহার বক্সসহ',
    itemCountText_en: 'Gift Ready',
  },
];

export default function DepartmentGrid() {
  const { lang } = useLanguage();

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🛍️</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
              {lang === 'bn' ? 'ডিপার্টমেন্ট অনুযায়ী কেনাকাটা' : 'Shop by Department'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {lang === 'bn'
              ? 'বই ছাড়াও ইলেকট্রনিক্স, স্টেশনারি, আতর ও গিফট সামগ্রী এক ঠিকানায়'
              : 'Explore Books, Gadgets, Stationery, Islamic Items & Gifts all in one place'}
          </p>
        </div>
        <Link
          href="/catalog"
          className="text-xs sm:text-sm font-semibold text-[#0B6E4F] hover:text-[#074D37] flex items-center gap-1"
        >
          <span>{lang === 'bn' ? 'সব পণ্য' : 'All Products'}</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {DEPT_CARDS.map((dept) => {
          const Icon = dept.icon;
          return (
            <Link
              key={dept.id}
              href={`/catalog?department=${dept.id}`}
              className={`group relative flex flex-col justify-between p-4 rounded-2xl bg-gradient-to-b ${dept.bgGradient} border border-gray-200/90 ${dept.borderColor} hover:shadow-lg transition-all transform hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${dept.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-gray-700 shadow-xs border border-gray-100">
                    {lang === 'bn' ? dept.badge_bn : dept.badge_en}
                  </span>
                </div>

                <h3 className={`text-sm sm:text-base font-bold ${dept.textColor} mb-1 line-clamp-1`}>
                  {lang === 'bn' ? dept.title_bn : dept.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {lang === 'bn' ? dept.desc_bn : dept.desc}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-gray-200/50 flex items-center justify-between text-xs font-semibold text-[#0B6E4F] group-hover:text-[#074D37]">
                <span>{lang === 'bn' ? dept.itemCountText_bn : dept.itemCountText_en}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

