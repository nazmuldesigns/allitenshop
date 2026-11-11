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
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
            {t.home.shopByCategory}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {lang === 'bn' ? 'আপনার পছন্দের বিষয় অনুযায়ী বই বেছে নিন' : 'Explore our collection by reading genre'}
          </p>
        </div>
        <Link
          href="/catalog"
          className="text-xs sm:text-sm font-semibold text-[#0B6E4F] hover:text-[#074D37] flex items-center gap-1"
        >
          <span>{t.home.viewAll}</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat) => {
          const Icon = (cat.icon && iconMap[cat.icon]) || BookOpen;
          return (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.slug}`}
              className="group bg-white p-4 rounded-xl border border-gray-200/80 hover:border-[#0B6E4F] hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-2.5"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E8F5EE] group-hover:bg-[#0B6E4F] text-[#0B6E4F] group-hover:text-white flex items-center justify-center transition-colors">
                <Icon className="w-6 h-6" />
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

