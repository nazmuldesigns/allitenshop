import { Language } from '@/types';

const BENGALI_DIGITS: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

/**
 * Converts standard digits to Bengali numerals
 */
export function toBengaliNumber(val: number | string): string {
  const str = String(val);
  return str.replace(/[0-9]/g, (match) => BENGALI_DIGITS[match] || match);
}

/**
 * Formats a currency amount in BDT (৳) according to the active language
 */
export function formatPrice(amount: number, lang: Language = 'bn'): string {
  const rounded = Math.round(amount);
  if (lang === 'bn') {
    return `৳${toBengaliNumber(rounded)}`;
  }
  return `৳${rounded.toLocaleString('en-US')}`;
}

/**
 * Formats a date string nicely
 */
export function formatDate(dateStr: string, lang: Language = 'bn'): string {
  try {
    const d = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    if (lang === 'bn') {
      return d.toLocaleDateString('bn-BD', options);
    }
    return d.toLocaleDateString('en-US', options);
  } catch {
    return dateStr;
  }
}

