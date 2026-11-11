export interface HeroSlide {
  id: string;
  badge_bn: string;
  badge_en: string;
  title_bn: string;
  title_en: string;
  desc_bn: string;
  desc_en: string;
  cta_link: string;
  cta_text_bn: string;
  cta_text_en: string;
  bg_color: string;
  accent_color: string;
  image_url?: string;
  is_active: boolean;
}

export interface PromoCard {
  id: string;
  title_bn: string;
  title_en: string;
  desc_bn: string;
  desc_en: string;
  link: string;
  department: string;
  icon_name: 'Headphones' | 'Moon' | 'PenTool' | 'Gift' | 'BookOpen';
  badge_bn?: string;
}

export interface AnnouncementSettings {
  enabled: boolean;
  text_bn: string;
  text_en: string;
  helpline: string;
  inside_dhaka_delivery: number;
  outside_dhaka_delivery: number;
  free_delivery_min: number;
}

export interface FlashSaleSettings {
  enabled: boolean;
  title_bn: string;
  title_en: string;
  desc_bn: string;
  desc_en: string;
  end_time: string; // ISO String
}

export interface SiteMarketingConfig {
  announcement: AnnouncementSettings;
  flashSale: FlashSaleSettings;
  heroSlides: HeroSlide[];
  promoCards: PromoCard[];
}

// Default in-memory marketing configuration (can be updated via Admin Panel)
let marketingConfig: SiteMarketingConfig = {
  announcement: {
    enabled: true,
    text_bn: 'সারা দেশে দ্রুত ক্যাশ অন ডেলিভারি | ঢাকা ৬০৳, বাইরে ১২০৳ | ১৫০০৳ অর্ডারে ফ্রি ডেলিভারি!',
    text_en: 'Nationwide Cash on Delivery | Free shipping on orders over ৳1500!',
    helpline: '০১৭১২-৩৪৫৬৭৮',
    inside_dhaka_delivery: 60,
    outside_dhaka_delivery: 120,
    free_delivery_min: 1500,
  },
  flashSale: {
    enabled: true,
    title_bn: 'সুপার ডিল চলছে!',
    title_en: 'Super Deals Live!',
    desc_bn: 'সীমিত সময়ের জন্য বিশেষ মেগা মূল্যছাড়',
    desc_en: 'Limited-time special mega discount across all items',
    end_time: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(),
  },
  heroSlides: [
    {
      id: 'slide-1',
      badge_bn: '🎉 পাতাঘর মেগা বৈশাখী অফার',
      badge_en: 'Special Mega Offer',
      title_bn: 'বই, গ্যাজেট ও লাইফস্টাইলের বিশাল আয়োজন',
      title_en: 'Books, Gadgets & Lifestyle under one roof',
      desc_bn: 'জনপ্রিয় বেস্টসেলার বই, স্মার্টওয়াচ, প্রিমিয়াম ডায়েরি ও খাঁটি আতরে সর্বোচ্চ ৫০% পর্যন্ত বিশেষ ছাড়!',
      desc_en: 'Huge discounts on bestselling books, smartwatches, luxury diaries, and authentic attar!',
      cta_link: '/catalog',
      cta_text_bn: 'এখনই কেনাকাটা করুন',
      cta_text_en: 'Shop Now',
      bg_color: 'bg-[#0B6E4F]',
      accent_color: 'text-[#F4A300]',
      is_active: true,
    },
    {
      id: 'slide-2',
      badge_bn: '🎧 স্মার্ট গ্যাজেট সপ্তাহ',
      badge_en: 'Smart Gadget Week',
      title_bn: 'অফিসিয়াল ওয়ারেন্টিসহ স্মার্ট ইলেকট্রনিক্স',
      title_en: 'Official Warranty Smart Electronics',
      desc_bn: 'Haylou স্মার্টওয়াচ, Lenovo ইয়ারবাডস ও Remax পাওয়ার ব্যাংক — সরাসরি ঘরে বসেই ক্যাশ অন ডেলিভারিতে।',
      desc_en: 'Haylou smartwatches, Lenovo earbuds, and Remax power banks with nationwide cash on delivery.',
      cta_link: '/catalog?department=electronics',
      cta_text_bn: 'গ্যাজেট দেখুন',
      cta_text_en: 'Explore Gadgets',
      bg_color: 'bg-[#1E3A8A]',
      accent_color: 'text-amber-400',
      is_active: true,
    },
    {
      id: 'slide-3',
      badge_bn: '🕌 খাঁটি আতর ও ইসলামিক কর্নার',
      badge_en: 'Authentic Islamic Corner',
      title_bn: 'আল-হারামাইন ওউদ আতর ও তুরস্কের জায়নামাজ',
      title_en: 'Al Haramain Amber Oud & Turkish Prayer Mats',
      desc_bn: '১০০% অ্যালকোহলমুক্ত রাজকীয় সুবাস ও আরামদায়ক ভেলভেট ফোম জায়নামাজ। সেরা উপহার সামগ্রী।',
      desc_en: '100% alcohol-free luxury oriental perfume oils and premium velvet padded prayer mats.',
      cta_link: '/catalog?department=islamic',
      cta_text_bn: 'ইসলামিক কালেকশন',
      cta_text_en: 'View Islamic Items',
      bg_color: 'bg-[#78350F]',
      accent_color: 'text-amber-300',
      is_active: true,
    },
  ],
  promoCards: [
    {
      id: 'promo-1',
      title_bn: 'স্মার্ট ইলেকট্রনিক্স জোন',
      title_en: 'Smart Electronics Zone',
      desc_bn: 'স্মার্টওয়াচ, ইয়ারবাডস ও গ্যাজেট (সর্বোচ্চ ৪০% ছাড়)',
      desc_en: 'Smartwatch, Earbuds & Gadgets (Up to 40% OFF)',
      link: '/catalog?department=electronics',
      department: 'electronics',
      icon_name: 'Headphones',
      badge_bn: '৪০% পর্যন্ত ছাড়',
    },
    {
      id: 'promo-2',
      title_bn: 'খাঁটি আতর ও জায়নামাজ',
      title_en: 'Pure Attar & Prayer Mats',
      desc_bn: '১০০% অ্যালকোহলমুক্ত রাজকীয় সুবাস কালেকশন',
      desc_en: '100% Alcohol-free Luxury Fragrance',
      link: '/catalog?department=islamic',
      department: 'islamic',
      icon_name: 'Moon',
      badge_bn: 'প্রিমিয়াম কালেকশন',
    },
  ],
};

export async function getMarketingConfig(): Promise<SiteMarketingConfig> {
  return marketingConfig;
}

export async function updateMarketingConfig(
  updates: Partial<SiteMarketingConfig>
): Promise<SiteMarketingConfig> {
  marketingConfig = {
    ...marketingConfig,
    ...updates,
    announcement: {
      ...marketingConfig.announcement,
      ...(updates.announcement || {}),
    },
    flashSale: {
      ...marketingConfig.flashSale,
      ...(updates.flashSale || {}),
    },
  };
  return marketingConfig;
}

export async function updateHeroSlide(
  slideId: string,
  slideData: Partial<HeroSlide>
): Promise<HeroSlide | null> {
  const idx = marketingConfig.heroSlides.findIndex((s) => s.id === slideId);
  if (idx === -1) return null;

  marketingConfig.heroSlides[idx] = {
    ...marketingConfig.heroSlides[idx],
    ...slideData,
  };
  return marketingConfig.heroSlides[idx];
}

export async function addHeroSlide(slide: Omit<HeroSlide, 'id'>): Promise<HeroSlide> {
  const newSlide: HeroSlide = {
    ...slide,
    id: `slide-${Date.now()}`,
  };
  marketingConfig.heroSlides.push(newSlide);
  return newSlide;
}

export async function deleteHeroSlide(slideId: string): Promise<boolean> {
  const len = marketingConfig.heroSlides.length;
  marketingConfig.heroSlides = marketingConfig.heroSlides.filter((s) => s.id !== slideId);
  return marketingConfig.heroSlides.length < len;
}

