import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import HeroBanner from '@/components/home/HeroBanner';
import DepartmentGrid from '@/components/home/DepartmentGrid';
import FlashSaleStrip from '@/components/home/FlashSaleStrip';
import CategoryGrid from '@/components/home/CategoryGrid';
import AuthorSpotlight from '@/components/home/AuthorSpotlight';
import BookCard from '@/components/book/BookCard';
import {
  getAuthors,
  getBestsellerBooks,
  getCategories,
  getFlashSaleBooks,
  getNewArrivals,
  getProductsByDepartment,
} from '@/lib/data/storeService';
import Link from 'next/link';
import { ArrowRight, Flame, Headphones, Moon, PenTool, Sparkles, Gamepad2 } from 'lucide-react';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [
    flashSaleBooks,
    bestsellerBooks,
    newArrivalBooks,
    electronicsProducts,
    stationeryProducts,
    islamicProducts,
    kidsProducts,
    categories,
    authors,
  ] = await Promise.all([
    getFlashSaleBooks(),
    getBestsellerBooks(),
    getNewArrivals(),
    getProductsByDepartment('electronics', 6),
    getProductsByDepartment('stationery', 6),
    getProductsByDepartment('islamic', 6),
    getProductsByDepartment('kids', 6),
    getCategories(),
    getAuthors(),
  ]);

  // Featured authors (first 6)
  const featuredAuthors = authors.filter((a) => a.is_featured).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F7]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-4 sm:py-6 w-full">
        {/* 1. Hero Section: Category Sidebar + Carousel Slider + Trust Badges */}
        <HeroBanner />

        {/* 2. Department Grid (Clean White Tiles) */}
        <DepartmentGrid />

        {/* 3. Flash Sale Strip (Super Deals with Real Countdown) */}
        <FlashSaleStrip books={flashSaleBooks} />

        {/* 4. Electronics & Gadgets Shelf (Rokomari Style Card) */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 mb-8 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  স্মার্ট গ্যাজেট ও ইলেকট্রনিক্স
                </h2>
                <p className="text-[11px] text-gray-500">
                  অফিসিয়াল ওয়ারেন্টিসহ স্মার্টওয়াচ, বাডস, পাওয়ার ব্যাংক ও কিবোর্ড
                </p>
              </div>
            </div>
            <Link
              href="/catalog?department=electronics"
              className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {electronicsProducts.map((product) => (
              <BookCard key={product.id} book={product} />
            ))}
          </div>
        </section>

        {/* 5. Bestselling Books Shelf */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 mb-8 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-emerald-50 text-[#0B6E4F] flex items-center justify-center font-bold">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  জনপ্রিয় বেস্টসেলার বই
                </h2>
                <p className="text-[11px] text-gray-500">
                  পাঠকদের সর্বাধিক পছন্দের সেরা কথাসাহিত্য ও ক্লাসিক সাহিত্য
                </p>
              </div>
            </div>
            <Link
              href="/catalog?department=books&bestseller=true"
              className="text-xs font-bold text-[#0B6E4F] hover:underline flex items-center gap-1"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {bestsellerBooks.slice(0, 6).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* 6. Islamic & Attar Shelf */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 mb-8 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  ইসলামিক কর্নার ও খাঁটি আতর
                </h2>
                <p className="text-[11px] text-gray-500">
                  ১০০% অ্যালকোহলমুক্ত সুবাস, তুরস্কের ফোম জায়নামাজ ও ডিজিটাল তাসবিহ
                </p>
              </div>
            </div>
            <Link
              href="/catalog?department=islamic"
              className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {islamicProducts.map((product) => (
              <BookCard key={product.id} book={product} />
            ))}
          </div>
        </section>

        {/* 7. Stationery & Office Shelf */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 mb-8 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <PenTool className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  স্টেশনারি ও অফিস সাপ্লাই
                </h2>
                <p className="text-[11px] text-gray-500">
                  প্রিমিয়াম হ্যান্ডক্রাফটেড লেদার ডায়েরি, পার্কার পেন ও আর্ট সামগ্রী
                </p>
              </div>
            </div>
            <Link
              href="/catalog?department=stationery"
              className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {stationeryProducts.map((product) => (
              <BookCard key={product.id} book={product} />
            ))}
          </div>
        </section>

        {/* 8. Kids & Toys Shelf */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 mb-8 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  বাচ্চাদের খেলনা ও ব্রেন কিট
                </h2>
                <p className="text-[11px] text-gray-500">
                  বাংলা বর্ণমালা কাঠের পাজল, ৩x৩ স্পিড কিউব ও রোবোটিক্স কিট
                </p>
              </div>
            </div>
            <Link
              href="/catalog?department=kids"
              className="text-xs font-bold text-pink-700 hover:underline flex items-center gap-1"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {kidsProducts.map((product) => (
              <BookCard key={product.id} book={product} />
            ))}
          </div>
        </section>

        {/* 9. Popular Categories */}
        <CategoryGrid categories={categories.slice(0, 8)} />

        {/* 10. New Arrivals Shelf */}
        <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 mb-8 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-emerald-50 text-[#0B6E4F] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  নতুন প্রকাশিত ও সংগৃহীত পণ্য
                </h2>
                <p className="text-[11px] text-gray-500">
                  লেটেস্ট প্রকাশিত বই এবং নতুন যুক্ত হওয়া গ্যাজেট
                </p>
              </div>
            </div>
            <Link
              href="/catalog?sort=newest"
              className="text-xs font-bold text-[#0B6E4F] hover:underline flex items-center gap-1"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {newArrivalBooks.slice(0, 6).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* 11. Author Spotlight */}
        <AuthorSpotlight authors={featuredAuthors} />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
