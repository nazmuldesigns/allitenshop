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
    getProductsByDepartment('electronics', 4),
    getProductsByDepartment('stationery', 4),
    getProductsByDepartment('islamic', 4),
    getProductsByDepartment('kids', 4),
    getCategories(),
    getAuthors(),
  ]);

  // Featured authors (first 6)
  const featuredAuthors = authors.filter((a) => a.is_featured).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 sm:py-8 w-full">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Rokomari-Style Department Tiles */}
        <DepartmentGrid />

        {/* Flash Sale Strip with Real Countdown */}
        <FlashSaleStrip books={flashSaleBooks} />

        {/* Electronics & Gadgets Shelf */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🎧</span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
                  স্মার্ট গ্যাজেট ও ইলেকট্রনিক্স
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                অফিসিয়াল ওয়ারেন্টিসহ স্মার্টওয়াচ, ইয়ারবাডস, পাওয়ার ব্যাংক ও কিবোর্ড
              </p>
            </div>
            <Link
              href="/catalog?department=electronics"
              className="text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              <span>সব গ্যাজেট দেখুন</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {electronicsProducts.map((product) => (
              <BookCard key={product.id} book={product} />
            ))}
          </div>
        </section>

        {/* Bestsellers Section (Books) */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
                  জনপ্রিয় বেস্টসেলার বই
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                পাঠকদের সর্বাধিক পছন্দের সেরা সাহিত্য ও মোটিভেশনাল বই
              </p>
            </div>
            <Link
              href="/catalog?department=books&bestseller=true"
              className="text-xs sm:text-sm font-semibold text-[#0B6E4F] hover:text-[#074D37] flex items-center gap-1"
            >
              <span>সব বই দেখুন</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {bestsellerBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Islamic & Attar Shelf */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🕌</span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
                  ইসলামিক কর্নার ও প্রিমিয়াম আতর
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                ১০০% অ্যালকোহলমুক্ত সুগন্ধি আতর, তুরস্কের ভেলভেট জায়নামাজ ও ডিজিটাল তাসবিহ
              </p>
            </div>
            <Link
              href="/catalog?department=islamic"
              className="text-xs sm:text-sm font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1"
            >
              <span>সব ইসলামিক পণ্য</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {islamicProducts.map((product) => (
              <BookCard key={product.id} book={product} />
            ))}
          </div>
        </section>

        {/* Stationery & Office Shelf */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✏️</span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
                  স্টেশনারি ও অফিস কর্নার
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                প্রিমিয়াম হ্যান্ডক্রাফটেড লেদার ডায়রি, পার্কার রোলারবল পেন ও আর্ট কিট
              </p>
            </div>
            <Link
              href="/catalog?department=stationery"
              className="text-xs sm:text-sm font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1"
            >
              <span>সব স্টেশনারি দেখুন</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {stationeryProducts.map((product) => (
              <BookCard key={product.id} book={product} />
            ))}
          </div>
        </section>

        {/* Kids & Toys Shelf */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🧸</span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
                  বাচ্চাদের খেলনা ও ব্রেন কিট
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                বাংলা বর্ণমালা কাঠের পাজল, ৩x৩ স্পিড কিউব ও রোবোটিক সায়েন্স কিট
              </p>
            </div>
            <Link
              href="/catalog?department=kids"
              className="text-xs sm:text-sm font-semibold text-pink-700 hover:text-pink-900 flex items-center gap-1"
            >
              <span>সব খেলনা দেখুন</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {kidsProducts.map((product) => (
              <BookCard key={product.id} book={product} />
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <CategoryGrid categories={categories.slice(0, 8)} />

        {/* New Arrivals Section */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
                  নতুন প্রকাশিত ও যুক্ত পণ্য
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                সদ্য প্রকাশিত নতুন বই ও লেটেস্ট কালেকশন
              </p>
            </div>
            <Link
              href="/catalog?sort=newest"
              className="text-xs sm:text-sm font-semibold text-[#0B6E4F] hover:text-[#074D37] flex items-center gap-1"
            >
              <span>সবগুলো দেখুন</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {newArrivalBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Author Spotlight */}
        <AuthorSpotlight authors={featuredAuthors} />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
