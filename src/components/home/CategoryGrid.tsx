'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Feather,
  Compass,
  Sparkles,
  Landmark,
  Lightbulb,
  Smile,
  Globe,
  LucideIcon,
  ArrowRight,
} from 'lucide-react';
import { Category } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Feather,
  Compass,
  Sparkles,
  Landmark,
  Lightbulb,
  Smile,
  Globe,
};

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const { lang, t } = useLanguage();

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 mb-8 shadow-2xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            {lang === 'bn' ? 'জনপ্রিয় বিষয় ও ক্যাটাগরি' : 'Popular Categories'}
          </h2>
          <p className="text-[11px] text-gray-500">
            {lang === 'bn' ? 'পছন্দের বিষয় অনুযায়ী বই ও পণ্য খুঁজুন' : 'Browse items by genre and category'}
          </p>
        </div>
        <Link
          href="/catalog"
          className="text-xs font-bold text-[#0B6E4F] hover:underline flex items-center gap-1"
        >
          <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'See All'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {categories.map((cat) => {
          const Icon = (cat.icon && iconMap[cat.icon]) || BookOpen;
          return (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.slug}`}
              className="group bg-gray-50/60 hover:bg-white p-3 rounded-lg border border-gray-200/90 hover:border-[#0B6E4F] hover:shadow-xs transition-all text-center flex flex-col items-center justify-center gap-2"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 group-hover:bg-[#0B6E4F] text-[#0B6E4F] group-hover:text-white flex items-center justify-center transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-800 group-hover:text-[#0B6E4F] transition-colors line-clamp-1">
                {lang === 'bn' ? cat.name_bn : cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
