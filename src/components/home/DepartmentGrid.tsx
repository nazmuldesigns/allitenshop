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
  title_bn: string;
  title_en: string;
  desc_bn: string;
  desc_en: string;
  badge_bn: string;
  badge_en: string;
  iconBg: string;
  iconColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DEPT_CARDS: DepartmentCard[] = [
  {
    id: 'books',
    title_bn: 'বই ও সাহিত্য',
    title_en: 'Books',
    desc_bn: 'উপন্যাস, থ্রিলার ও একাডেমিক',
    desc_en: 'Novels & Academics',
    badge_bn: '১০০+ বই',
    badge_en: '100+ Books',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-[#0B6E4F]',
    icon: BookOpen,
  },
  {
    id: 'electronics',
    title_bn: 'ইলেকট্রনিক্স ও গ্যাজেট',
    title_en: 'Electronics',
    desc_bn: 'স্মার্টওয়াচ, বাডস ও এক্সেসরিজ',
    desc_en: 'Smartwatch & Audio',
    badge_bn: 'ওয়ারেন্টিসহ',
    badge_en: 'Warranty',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    icon: Headphones,
  },
  {
    id: 'stationery',
    title_bn: 'স্টেশনারি ও অফিস',
    title_en: 'Stationery',
    desc_bn: 'ডায়েরি, পার্কার পেন ও আর্ট কিট',
    desc_en: 'Diaries & Art Kits',
    badge_bn: 'প্রিমিয়াম',
    badge_en: 'Premium',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    icon: PenTool,
  },
  {
    id: 'islamic',
    title_bn: 'ইসলামিক ও আতর',
    title_en: 'Islamic & Attar',
    desc_bn: 'খাঁটি ওউদ আতর ও জায়নামাজ',
    desc_en: 'Alcohol-free Attar & Mats',
    badge_bn: '১০০% খাঁটি',
    badge_en: 'Authentic',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-700',
    icon: Moon,
  },
  {
    id: 'kids',
    title_bn: 'কিডস ও খেলনা',
    title_en: 'Kids & Toys',
    desc_bn: 'বাংলা বর্ণমালা পাজল ও কিউব',
    desc_en: 'Puzzles & Cubes',
    badge_bn: 'ব্রেন কিট',
    badge_en: 'Brain Kit',
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600',
    icon: Gamepad2,
  },
  {
    id: 'gifts',
    title_bn: 'গিফট ও লাইফস্টাইল',
    title_en: 'Gifts & Lifestyle',
    desc_bn: 'কাস্টম মগ ও রিডিং ল্যাম্প',
    desc_en: 'Mugs & Lamps',
    badge_bn: 'উপহার বক্স',
    badge_en: 'Gift Box',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    icon: Gift,
  },
];

export default function DepartmentGrid() {
  const { lang } = useLanguage();

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 mb-8 shadow-2xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            {lang === 'bn' ? 'প্রধান ডিপার্টমেন্টসমূহ' : 'Shop by Department'}
          </h2>
          <p className="text-[11px] text-gray-500">
            {lang === 'bn'
              ? 'বই, গ্যাজেট, স্টেশনারি ও ইসলামিক সামগ্রীর এক বিশ্বস্ত প্ল্যাটফর্ম'
              : 'Browse our complete catalog across major departments'}
          </p>
        </div>
        <Link
          href="/catalog"
          className="text-xs font-bold text-[#0B6E4F] hover:underline flex items-center gap-1"
        >
          <span>{lang === 'bn' ? 'সকল পণ্য' : 'All Products'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {DEPT_CARDS.map((dept) => {
          const Icon = dept.icon;
          return (
            <Link
              key={dept.id}
              href={`/catalog?department=${dept.id}`}
              className="group bg-gray-50/60 hover:bg-white p-3.5 rounded-lg border border-gray-200/90 hover:border-[#0B6E4F] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className={`w-9 h-9 rounded-md ${dept.iconBg} ${dept.iconColor} flex items-center justify-center font-bold`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-gray-600 border border-gray-200">
                    {lang === 'bn' ? dept.badge_bn : dept.badge_en}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#0B6E4F] transition-colors mb-0.5 line-clamp-1">
                  {lang === 'bn' ? dept.title_bn : dept.title_en}
                </h3>
                <p className="text-[11px] text-gray-500 line-clamp-1">
                  {lang === 'bn' ? dept.desc_bn : dept.desc_en}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-200/50 flex items-center justify-between text-[11px] font-bold text-[#0B6E4F]">
                <span>{lang === 'bn' ? 'ব্রাউজ করুন' : 'Browse'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
