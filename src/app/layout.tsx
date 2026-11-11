import type { Metadata } from 'next';
import { Inter, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastProvider } from '@/context/ToastContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pataghor.com'),
  title: {
    default: 'Pataghor (পাতাঘর) - পাতা ওল্টান, জীবন গড়ুন | বাংলাদেশের সেরা অনলাইন বইয়ের দোকান',
    template: '%s | Pataghor (পাতাঘর)',
  },
  description:
    'বাংলাদেশের বৃহত্তম অনলাইন বুকস্টোর পাতাঘর। হুমায়ূন আহমেদ, রবীন্দ্রনাথ, নজরুল সহ দেশি-বিদেশি সকল বই ক্যাশ অন ডেলিভারিতে পৌঁছে যাবে আপনার ঠিকানায়। ঢাকা সিটিতে ৬০৳, সারাদেশে ১২০৳ ডেলিভারি চার্জ।',
  keywords: [
    'Pataghor',
    'পাতাঘর',
    'অনলাইন বইয়ের দোকান',
    'বই কিনুন',
    'Bangla books online',
    'Buy books Bangladesh',
    'Cash on delivery bookstore',
    'Humayun Ahmed books',
    'রবীন্দ্রনাথ ঠাকুর',
    'কাজী নজরুল ইসলাম',
  ],
  authors: [{ name: 'Pataghor Team' }],
  openGraph: {
    title: 'Pataghor (পাতাঘর) - Every page, delivered.',
    description: 'বাংলাদেশের বিশ্বস্ত অনলাইন বইয়ের দোকান। ক্যাশ অন ডেলিভারিতে দ্রুত বই পান।',
    url: 'https://pataghor.com',
    siteName: 'Pataghor (পাতাঘর)',
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pataghor (পাতাঘর) - অনলাইন বুকস্টোর',
    description: 'পাতা ওল্টান, জীবন গড়ুন। দেশব্যাপী দ্রুত ডেলিভারি।',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${inter.variable} ${notoSansBengali.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1E293B]">
        <LanguageProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
