'use client';

import React from 'react';
import Link from 'next/link';
import { Author } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface AuthorSpotlightProps {
  authors: Author[];
}

export default function AuthorSpotlight({ authors }: AuthorSpotlightProps) {
  const { lang, t } = useLanguage();

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
            {t.home.featuredAuthors}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t.home.featuredAuthorsSubtitle}
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {authors.map((author) => (
          <Link
            key={author.id}
            href={`/catalog?author=${author.slug}`}
            className="group bg-white p-4 rounded-xl border border-gray-200/80 hover:border-[#0B6E4F] hover:shadow-md transition-all text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-100 mb-3 border-2 border-transparent group-hover:border-[#0B6E4F] transition-all shrink-0">
              {author.photo_url ? (
                <img
                  src={author.photo_url}
                  alt={author.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg bg-emerald-50 text-[#0B6E4F] font-bold">
                  {author.name[0]}
                </div>
              )}
            </div>
            <h3 className="text-sm font-bold text-[#1E293B] group-hover:text-[#0B6E4F] transition-colors line-clamp-1">
              {lang === 'bn' ? author.name_bn : author.name}
            </h3>
            <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
              {lang === 'bn' ? author.bio_bn : author.bio}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

