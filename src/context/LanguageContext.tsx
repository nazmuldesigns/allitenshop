'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '@/types';
import { translations } from '@/lib/i18n/translations';
import { formatPrice as formatPriceUtil, toBengaliNumber as toBengaliNumberUtil, formatDate as formatDateUtil } from '@/lib/i18n/formatters';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: typeof translations.bn;
  formatPrice: (amount: number) => string;
  toBengaliNumber: (val: number | string) => string;
  formatDate: (dateStr: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('bn');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pataghor_lang') as Language | null;
    if (saved === 'bn' || saved === 'en') {
      setLangState(saved);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('pataghor_lang', newLang);
    document.documentElement.lang = newLang;
  };

  const toggleLang = () => {
    setLang(lang === 'bn' ? 'en' : 'bn');
  };

  const t = translations[lang];

  const formatPrice = (amount: number) => formatPriceUtil(amount, lang);
  const toBengaliNumber = (val: number | string) => toBengaliNumberUtil(val);
  const formatDate = (dateStr: string) => formatDateUtil(dateStr, lang);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        formatPrice,
        toBengaliNumber,
        formatDate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

