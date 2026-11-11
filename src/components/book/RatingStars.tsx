'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export default function RatingStars({
  rating,
  count,
  size = 'sm',
  showCount = true,
}: RatingStarsProps) {
  const { lang, toBengaliNumber } = useLanguage();

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-[#F4A300]">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.round(rating);
          return (
            <Star
              key={star}
              className={`${iconSizes[size]} ${
                isFilled ? 'fill-[#F4A300] text-[#F4A300]' : 'text-gray-300'
              }`}
            />
          );
        })}
      </div>
      {showCount && (
        <span className={`${textSizes[size]} text-gray-500 font-medium`}>
          {lang === 'bn' ? toBengaliNumber(rating.toFixed(1)) : rating.toFixed(1)}
          {count !== undefined && (
            <span className="text-gray-400 text-[11px] ml-1">
              ({lang === 'bn' ? toBengaliNumber(count) : count})
            </span>
          )}
        </span>
      )}
    </div>
  );
}

