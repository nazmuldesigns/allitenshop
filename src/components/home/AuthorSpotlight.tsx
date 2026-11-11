'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { Author } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface AuthorSpotlightProps {
  authors: Author[];
}

export default function AuthorSpotlight({ authors }: AuthorSpotlightProps) {
  const { lang, t } = useLanguage();

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 mb-8 shadow-2xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
            <span>{lang === 'bn' ? 'জনপ্রিয় লেখকবৃন্দ' : 'Popular Authors'}</span>
          </h2>
          <p className="text-[11px] text-gray-500">
            {lang === 'bn' ? 'শীর্ষ প্রিয় লেখকদের সাহিত্যকর্ম ও বই' : 'Explore books from top authors'}
          </p>
        </div>
        <Link
          href="/catalog"
          className="text-xs font-bold text-[#0B6E4F] hover:underline flex items-center gap-1"
        >
          <span>{lang === 'bn' ? 'সকল লেখক' : 'All Authors'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {authors.map((author) => (
          <Link
            key={author.id}
            href={`/catalog?author=${author.slug}`}
            className="group bg-gray-50/60 hover:bg-white p-3.5 rounded-lg border border-gray-200/90 hover:border-[#0B6E4F] hover:shadow-xs transition-all text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-200 mb-2 border-2 border-white shadow-2xs group-hover:border-[#0B6E4F] transition-all shrink-0">
              {author.photo_url ? (
                <img
                  src={author.photo_url}
                  alt={author.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-base bg-emerald-50 text-[#0B6E4F] font-bold">
                  {author.name[0]}
                </div>
              )}
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#0B6E4F] transition-colors line-clamp-1">
              {lang === 'bn' ? author.name_bn : author.name}
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
              {lang === 'bn' ? author.bio_bn : author.bio}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
