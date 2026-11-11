'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingCart,
  Heart,
  Truck,
  BookOpen,
  Menu,
  X,
  ShieldCheck,
  PhoneCall,
  User,
  Headphones,
  PenTool,
  Moon,
  Gamepad2,
  Gift,
  Flame,
  Sparkles,
  LayoutGrid,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Book } from '@/types';

export default function Header() {
  const { lang, toggleLang, t, formatPrice } = useLanguage();
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.books || []);
          setShowSearchDropdown(true);
        }
      } catch {
        // Fallback
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0] border-b border-[#E2D9C8]">
      {/* Top Notification Strip */}
      <div className="bg-[#0B6E4F] text-[#FAF7F0] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#F4A300]" />
            <span>
              {lang === 'bn'
                ? '🚚 সারা দেশে দ্রুত ডেলিভারি | ঢাকা ৬০৳, বাইরে ১২০৳ | ১৫০০৳ অর্ডারে ফ্রি ডেলিভারি!'
                : '🚚 Fast delivery nationwide | Dhaka ৳60, Outside ৳120 | Free shipping on orders over ৳1500!'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <Link href="/track" className="hover:text-[#F4A300] transition-colors flex items-center gap-1">
              <Truck className="w-3 h-3" />
              <span>{t.nav.trackOrder}</span>
            </Link>
            <span className="text-[#074D37]">|</span>
            <div className="flex items-center gap-1 text-[#E8F5EE]">
              <PhoneCall className="w-3 h-3" />
              <span>01700-000000</span>
            </div>
            <span className="text-[#074D37]">|</span>
            <Link href="/login" className="hover:text-[#F4A300] transition-colors flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{t.nav.login}</span>
            </Link>
            <span className="text-[#074D37]">|</span>
            <Link href="/admin" className="hover:text-[#F4A300] transition-colors">
              {t.nav.admin}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 md:gap-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-[#0B6E4F] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-[#F4A300]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-[#0B6E4F]">
                  {t.brand.name}
                </span>
                <span className="text-xs text-[#F4A300] font-semibold hidden md:inline">
                  {lang === 'bn' ? 'মেগা অনলাইন শপ' : 'Mega Store'}
                </span>
              </div>
              <p className="text-[10px] text-[#64748B] tracking-wide -mt-0.5 hidden sm:block">
                {lang === 'bn' ? 'বই, ইলেকট্রনিক্স, স্টেশনারি ও লাইফস্টাইল' : 'Books, Electronics, Stationery & Lifestyle'}
              </p>
            </div>
          </Link>

          {/* Search Bar (Desktop & Tablet) */}
          <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.nav.searchPlaceholder}
                className="w-full bg-white border-2 border-[#0B6E4F]/20 focus:border-[#0B6E4F] rounded-full py-2.5 pl-4 pr-11 text-sm outline-none transition-all shadow-sm focus:shadow-md"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-2 bg-[#0B6E4F] hover:bg-[#074D37] text-white rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Instant Search Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-2 text-xs font-semibold text-gray-500 bg-gray-50">
                  {lang === 'bn' ? 'অনুসন্ধান ফলাফল' : 'Search Results'}
                </div>
                {searchResults.map((book) => (
                  <Link
                    key={book.id}
                    href={`/book/${book.slug}`}
                    onClick={() => setShowSearchDropdown(false)}
                    className="flex items-center gap-3 p-3 hover:bg-[#FAF7F0] border-b border-gray-100 last:border-0 transition-colors"
                  >
                    <div className="w-10 h-14 bg-gray-100 rounded overflow-hidden shrink-0 relative">
                      {book.cover_url ? (
                        <img
                          src={book.cover_url}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          বই
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1E293B] truncate">
                        {lang === 'bn' ? book.title_bn : book.title}
                      </p>
                      <p className="text-xs text-[#64748B] truncate">
                        {book.author ? (lang === 'bn' ? book.author.name_bn : book.author.name) : ''}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-[#0B6E4F]">
                          {formatPrice(book.discount_price ?? book.price)}
                        </span>
                        {book.discount_price && (
                          <span className="text-[10px] text-gray-400 line-through">
                            {formatPrice(book.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                <Link
                  href={`/catalog?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setShowSearchDropdown(false)}
                  className="block text-center py-2.5 text-xs font-semibold text-[#0B6E4F] bg-[#E8F5EE] hover:bg-[#d8ede1] transition-colors"
                >
                  {lang === 'bn' ? 'সব ফলাফল দেখুন' : 'View all results'} →
                </Link>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 text-xs font-semibold rounded-full border border-[#0B6E4F] text-[#0B6E4F] hover:bg-[#0B6E4F] hover:text-white transition-all"
              title="Toggle Language"
            >
              {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2 text-[#1E293B] hover:text-[#0B6E4F] transition-colors hidden sm:block"
              title={t.nav.wishlist}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#F4A300] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account Link */}
            <Link
              href="/account"
              className="p-2 text-[#1E293B] hover:text-[#0B6E4F] transition-colors hidden sm:block"
              title={lang === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account'}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 p-2 bg-[#0B6E4F]/10 hover:bg-[#0B6E4F]/20 text-[#0B6E4F] rounded-full px-3.5 py-1.5 transition-colors font-medium text-sm"
              title={t.nav.cart}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline font-bold">{t.nav.cart}</span>
              {itemCount > 0 && (
                <span className="w-5 h-5 bg-[#0B6E4F] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-gray-700 hover:text-[#0B6E4F]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full bg-white border border-[#0B6E4F]/30 focus:border-[#0B6E4F] rounded-full py-2 pl-4 pr-10 text-xs outline-none"
            />
            <button
              type="submit"
              className="absolute right-1 p-1.5 bg-[#0B6E4F] text-white rounded-full"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Desktop Rokomari-Style Multi-Department Navigation Bar */}
        <nav className="hidden md:flex items-center justify-between gap-1 mt-3 pt-2.5 border-t border-[#E2D9C8]/60 text-xs sm:text-sm font-semibold text-gray-700 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 lg:gap-3">
            <Link
              href="/"
              className="px-2.5 py-1.5 rounded-lg hover:bg-white hover:text-[#0B6E4F] transition-all flex items-center gap-1.5"
            >
              <LayoutGrid className="w-4 h-4 text-[#0B6E4F]" />
              <span>{t.nav.home}</span>
            </Link>

            <Link
              href="/catalog?department=books"
              className="px-2.5 py-1.5 rounded-lg hover:bg-white hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 group"
            >
              <BookOpen className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>{lang === 'bn' ? 'বই' : 'Books'}</span>
            </Link>

            <Link
              href="/catalog?department=electronics"
              className="px-2.5 py-1.5 rounded-lg hover:bg-white hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 group"
            >
              <Headphones className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
              <span>{lang === 'bn' ? 'ইলেকট্রনিক্স ও গ্যাজেট' : 'Electronics'}</span>
              <span className="hidden lg:inline text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded-full font-bold">New</span>
            </Link>

            <Link
              href="/catalog?department=stationery"
              className="px-2.5 py-1.5 rounded-lg hover:bg-white hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 group"
            >
              <PenTool className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
              <span>{lang === 'bn' ? 'স্টেশনারি ও অফিস' : 'Stationery'}</span>
            </Link>

            <Link
              href="/catalog?department=islamic"
              className="px-2.5 py-1.5 rounded-lg hover:bg-white hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 group"
            >
              <Moon className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              <span>{lang === 'bn' ? 'ইসলামিক ও আতর' : 'Islamic & Attar'}</span>
            </Link>

            <Link
              href="/catalog?department=kids"
              className="px-2.5 py-1.5 rounded-lg hover:bg-white hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 group"
            >
              <Gamepad2 className="w-4 h-4 text-pink-600 group-hover:scale-110 transition-transform" />
              <span>{lang === 'bn' ? 'কিডস ও খেলনা' : 'Kids & Toys'}</span>
            </Link>

            <Link
              href="/catalog?department=gifts"
              className="px-2.5 py-1.5 rounded-lg hover:bg-white hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 group"
            >
              <Gift className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
              <span>{lang === 'bn' ? 'গিফট ও লাইফস্টাইল' : 'Gifts'}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-gray-300">
            <Link
              href="/catalog?bestseller=true"
              className="px-2 py-1 text-xs font-bold text-[#0B6E4F] hover:bg-[#E8F5EE] rounded-lg transition-all flex items-center gap-1"
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>{t.nav.bestsellers}</span>
            </Link>
            <Link
              href="/catalog?flash=true"
              className="px-2 py-1 text-xs font-bold text-[#C88500] hover:bg-amber-100/60 rounded-lg transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.nav.flashSale}</span>
            </Link>
          </div>
        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-200 flex flex-col gap-1 pb-3 max-h-[80vh] overflow-y-auto">
            <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
              {lang === 'bn' ? 'ডিপার্টমেন্টসমূহ (Departments)' : 'Shop by Department'}
            </div>

            <Link
              href="/catalog?department=books"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-medium flex items-center gap-2.5 text-emerald-800"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'bn' ? '📚 বই কালেকশন' : '📚 Books'}</span>
            </Link>
            <Link
              href="/catalog?department=electronics"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-medium flex items-center gap-2.5 text-blue-800"
            >
              <Headphones className="w-4 h-4 text-blue-600" />
              <span>{lang === 'bn' ? '🎧 ইলেকট্রনিক্স ও স্মার্ট গ্যাজেট' : '🎧 Electronics & Gadgets'}</span>
            </Link>
            <Link
              href="/catalog?department=stationery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-medium flex items-center gap-2.5 text-purple-800"
            >
              <PenTool className="w-4 h-4 text-purple-600" />
              <span>{lang === 'bn' ? '✏️ স্টেশনারি ও অফিস' : '✏️ Stationery & Office'}</span>
            </Link>
            <Link
              href="/catalog?department=islamic"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-medium flex items-center gap-2.5 text-amber-800"
            >
              <Moon className="w-4 h-4 text-amber-600" />
              <span>{lang === 'bn' ? '🕌 ইসলামিক আইটেম ও খাঁটি আতর' : '🕌 Islamic Items & Attar'}</span>
            </Link>
            <Link
              href="/catalog?department=kids"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-medium flex items-center gap-2.5 text-pink-800"
            >
              <Gamepad2 className="w-4 h-4 text-pink-600" />
              <span>{lang === 'bn' ? '🧸 কিডস ও শিক্ষণীয় খেলনা' : '🧸 Kids & Brain Toys'}</span>
            </Link>
            <Link
              href="/catalog?department=gifts"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-medium flex items-center gap-2.5 text-rose-800"
            >
              <Gift className="w-4 h-4 text-rose-600" />
              <span>{lang === 'bn' ? '🎁 গিফট ও লাইফস্টাইল' : '🎁 Gifts & Lifestyle'}</span>
            </Link>

            <div className="my-2 border-t border-gray-200" />

            <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
              {lang === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Links'}
            </div>

            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-medium flex items-center gap-2"
            >
              <LayoutGrid className="w-4 h-4 text-gray-500" />
              <span>{lang === 'bn' ? 'সব পণ্য একসাথে (All Products)' : 'Browse All Products'}</span>
            </Link>
            <Link
              href="/catalog?bestseller=true"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-bold text-[#0B6E4F] flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>🔥 {t.nav.bestsellers}</span>
            </Link>
            <Link
              href="/catalog?flash=true"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-bold text-[#C88500] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>⚡ {t.nav.flashSale}</span>
            </Link>
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-medium flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-[#0B6E4F]" />
              <span>{t.nav.trackOrder}</span>
            </Link>
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-medium flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#0B6E4F]" />
              <span>{lang === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account'}</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white text-sm font-bold text-purple-700 flex items-center gap-2"
            >
              <span>⚙️ {t.nav.admin}</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

