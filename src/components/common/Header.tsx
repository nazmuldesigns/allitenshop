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
  PhoneCall,
  User,
  Headphones,
  PenTool,
  Moon,
  Gamepad2,
  Gift,
  Flame,
  Sparkles,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Book } from '@/types';

export default function Header() {
  const { lang, toggleLang, t, formatPrice } = useLanguage();
  const { itemCount, subtotal } = useCart();
  const { wishlist } = useWishlist();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');
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
          let filtered = data.books || [];
          if (searchDepartment) {
            filtered = filtered.filter((b: Book) => b.department === searchDepartment);
          }
          setSearchResults(filtered);
          setShowSearchDropdown(true);
        }
      } catch {
        // Fallback
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, searchDepartment]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() || searchDepartment) {
      setShowSearchDropdown(false);
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set('q', searchQuery.trim());
      if (searchDepartment) params.set('department', searchDepartment);
      router.push(`/catalog?${params.toString()}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* 1. Top Utility Strip */}
      <div className="bg-[#0B6E4F] text-white text-[11px] sm:text-xs py-1.5 px-4 border-b border-[#074D37]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-emerald-100">
              <PhoneCall className="w-3 h-3 text-[#F4A300]" />
              <span>{lang === 'bn' ? 'হেল্পলাইন: ০১৭১২-৩৪৫৬৭৮' : 'Helpline: 01712-345678'}</span>
            </div>
            <span className="text-emerald-300/40 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-100">
              <Truck className="w-3.5 h-3.5 text-[#F4A300]" />
              <span>
                {lang === 'bn'
                  ? 'সারা দেশে ক্যাশ অন ডেলিভারি | ঢাকা ৬০৳, বাইরে ১২০৳ | ১৫০০৳ অর্ডারে ফ্রি ডেলিভারি!'
                  : 'Nationwide Cash on Delivery | Free shipping on orders over ৳1500!'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
            <Link
              href="/track"
              className="text-emerald-100 hover:text-white transition-colors flex items-center gap-1"
            >
              <Truck className="w-3 h-3 text-[#F4A300]" />
              <span>{t.nav.trackOrder}</span>
            </Link>
            <span className="text-emerald-300/40">|</span>
            <Link
              href="/admin"
              className="text-emerald-100 hover:text-[#F4A300] font-medium transition-colors"
            >
              {t.nav.admin}
            </Link>
            <span className="text-emerald-300/40">|</span>
            <button
              onClick={toggleLang}
              className="text-white font-bold bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition-all"
            >
              {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header (Logo, Search, Cart, Account) */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-[#0B6E4F] flex items-center justify-center text-white shadow-xs group-hover:scale-102 transition-transform">
              <BookOpen className="w-6 h-6 text-[#F4A300]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black tracking-tight text-[#0B6E4F]">
                  {t.brand.name}
                </span>
                <span className="text-xs text-gray-400 font-semibold hidden md:inline">
                  .com
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium tracking-tight -mt-0.5 hidden sm:block">
                {lang === 'bn' ? 'পাতা ওল্টান, জীবন গড়ুন' : 'Every page, delivered'}
              </p>
            </div>
          </Link>

          {/* Search Bar with Department Selector (Rokomari Style) */}
          <div ref={searchRef} className="relative flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative flex-1 flex items-center border-2 border-[#0B6E4F] rounded-lg overflow-hidden bg-white shadow-xs focus-within:shadow-md transition-shadow">
                {/* Department Dropdown */}
                <select
                  value={searchDepartment}
                  onChange={(e) => setSearchDepartment(e.target.value)}
                  className="bg-gray-50 text-gray-700 text-xs font-semibold py-2.5 px-3 border-r border-gray-200 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <option value="">{lang === 'bn' ? 'সব বিভাগ' : 'All'}</option>
                  <option value="books">{lang === 'bn' ? 'বই' : 'Books'}</option>
                  <option value="electronics">{lang === 'bn' ? 'ইলেকট্রনিক্স' : 'Electronics'}</option>
                  <option value="stationery">{lang === 'bn' ? 'স্টেশনারি' : 'Stationery'}</option>
                  <option value="islamic">{lang === 'bn' ? 'ইসলামিক ও আতর' : 'Islamic'}</option>
                  <option value="kids">{lang === 'bn' ? 'কিডস ও খেলনা' : 'Kids'}</option>
                  <option value="gifts">{lang === 'bn' ? 'গিফট সামগ্রী' : 'Gifts'}</option>
                </select>

                {/* Input Text */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'বই, লেখক, গ্যাজেট বা পণ্য খুঁজুন...'
                      : 'Search books, authors, gadgets or items...'
                  }
                  className="w-full py-2 px-3 text-xs sm:text-sm text-gray-800 outline-none"
                />

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-[#0B6E4F] hover:bg-[#074D37] text-white px-5 py-2.5 text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden lg:inline">{lang === 'bn' ? 'খুঁজুন' : 'Search'}</span>
                </button>
              </div>
            </form>

            {/* Instant Search Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-2 text-[11px] font-bold text-gray-400 bg-gray-50 uppercase tracking-wider border-b border-gray-100">
                  {lang === 'bn' ? 'অনুসন্ধান ফলাফল' : 'Search Results'}
                </div>
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/book/${item.slug}`}
                    onClick={() => setShowSearchDropdown(false)}
                    className="flex items-center gap-3 p-2.5 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                  >
                    <div className="w-10 h-12 bg-white rounded border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                      {item.cover_url ? (
                        <img
                          src={item.cover_url}
                          alt={item.title}
                          className="w-full h-full object-contain p-0.5"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">📦</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                        {lang === 'bn' ? item.title_bn : item.title}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {item.author
                          ? (lang === 'bn' ? item.author.name_bn : item.author.name)
                          : item.brand
                          ? `ব্র্যান্ড: ${item.brand}`
                          : item.department}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-[#0B6E4F]">
                          {formatPrice(item.discount_price ?? item.price)}
                        </span>
                        {item.discount_price && (
                          <span className="text-[10px] text-gray-400 line-through">
                            {formatPrice(item.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                <Link
                  href={`/catalog?q=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setShowSearchDropdown(false)}
                  className="block text-center py-2 text-xs font-bold text-[#0B6E4F] bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  {lang === 'bn' ? 'সব ফলাফল দেখুন' : 'View all results'} →
                </Link>
              </div>
            )}
          </div>

          {/* Action Icons (Wishlist, Cart, Account) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-lg text-gray-600 hover:text-[#0B6E4F] hover:bg-gray-100 transition-colors hidden sm:flex items-center justify-center"
              title={t.nav.wishlist}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E11D48] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link with Price Preview (Rokomari Signature) */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#0B6E4F] rounded-lg transition-colors font-medium text-xs sm:text-sm"
              title={t.nav.cart}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-[#0B6E4F]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#0B6E4F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-gray-500 font-medium">
                  {lang === 'bn' ? 'আমার ঝুড়ি' : 'My Cart'}
                </span>
                <span className="text-xs font-bold text-[#0B6E4F]">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </Link>

            {/* Account / Login Link */}
            <Link
              href="/account"
              className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 rounded-lg border border-gray-200 hover:border-[#0B6E4F] text-gray-700 hover:text-[#0B6E4F] transition-colors text-xs font-semibold"
              title={lang === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account'}
            >
              <User className="w-4 h-4 text-gray-600" />
              <span className="hidden sm:inline">
                {lang === 'bn' ? 'অ্যাকাউন্ট' : 'Account'}
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-gray-700 hover:text-[#0B6E4F] rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'বই, গ্যাজেট বা পণ্য খুঁজুন...' : 'Search books, gadgets or items...'}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-xs outline-none focus:border-[#0B6E4F] focus:bg-white"
            />
            <button
              type="submit"
              className="absolute right-1 p-1.5 bg-[#0B6E4F] text-white rounded-md"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Rokomari Horizontal Department Navigation Bar */}
      <div className="border-t border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="hidden md:flex items-center justify-between text-xs font-semibold text-gray-700 overflow-x-auto scrollbar-none py-1.5">
            <div className="flex items-center gap-1 lg:gap-2">
              <Link
                href="/catalog?department=books"
                className="px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 text-gray-800"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'বই' : 'Books'}</span>
              </Link>

              <Link
                href="/catalog?department=electronics"
                className="px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 text-gray-800"
              >
                <Headphones className="w-3.5 h-3.5 text-blue-600" />
                <span>{lang === 'bn' ? 'ইলেকট্রনিক্স' : 'Electronics'}</span>
              </Link>

              <Link
                href="/catalog?department=stationery"
                className="px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 text-gray-800"
              >
                <PenTool className="w-3.5 h-3.5 text-purple-600" />
                <span>{lang === 'bn' ? 'স্টেশনারি' : 'Stationery'}</span>
              </Link>

              <Link
                href="/catalog?department=islamic"
                className="px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 text-gray-800"
              >
                <Moon className="w-3.5 h-3.5 text-amber-600" />
                <span>{lang === 'bn' ? 'ইসলামিক সামগ্রী ও আতর' : 'Islamic & Attar'}</span>
              </Link>

              <Link
                href="/catalog?department=kids"
                className="px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 text-gray-800"
              >
                <Gamepad2 className="w-3.5 h-3.5 text-pink-600" />
                <span>{lang === 'bn' ? 'কিডস জোন' : 'Kids Zone'}</span>
              </Link>

              <Link
                href="/catalog?department=gifts"
                className="px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-[#0B6E4F] transition-all flex items-center gap-1.5 text-gray-800"
              >
                <Gift className="w-3.5 h-3.5 text-rose-600" />
                <span>{lang === 'bn' ? 'গিফট ও লাইফস্টাইল' : 'Gifts'}</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <Link
                href="/catalog?bestseller=true"
                className="px-2.5 py-1 text-xs font-bold text-[#0B6E4F] hover:bg-emerald-50 rounded-md transition-colors flex items-center gap-1"
              >
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                <span>{lang === 'bn' ? 'বেস্ট সেলিং' : 'Bestsellers'}</span>
              </Link>

              <Link
                href="/catalog?flash=true"
                className="px-2.5 py-1 text-xs font-bold text-[#E11D48] hover:bg-rose-50 rounded-md transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>{lang === 'bn' ? 'সুপার ডিল' : 'Super Deals'}</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 shadow-lg flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
          <div className="px-2 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            {lang === 'bn' ? 'ডিপার্টমেন্টসমূহ' : 'Departments'}
          </div>

          <Link
            href="/catalog?department=books"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-2.5 rounded hover:bg-gray-50 text-xs font-semibold flex items-center gap-2 text-gray-800"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'bn' ? 'বই ও সাহিত্য' : 'Books'}</span>
          </Link>
          <Link
            href="/catalog?department=electronics"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-2.5 rounded hover:bg-gray-50 text-xs font-semibold flex items-center gap-2 text-gray-800"
          >
            <Headphones className="w-4 h-4 text-blue-600" />
            <span>{lang === 'bn' ? 'ইলেকট্রনিক্স ও গ্যাজেট' : 'Electronics'}</span>
          </Link>
          <Link
            href="/catalog?department=stationery"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-2.5 rounded hover:bg-gray-50 text-xs font-semibold flex items-center gap-2 text-gray-800"
          >
            <PenTool className="w-4 h-4 text-purple-600" />
            <span>{lang === 'bn' ? 'স্টেশনারি ও অফিস' : 'Stationery'}</span>
          </Link>
          <Link
            href="/catalog?department=islamic"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-2.5 rounded hover:bg-gray-50 text-xs font-semibold flex items-center gap-2 text-gray-800"
          >
            <Moon className="w-4 h-4 text-amber-600" />
            <span>{lang === 'bn' ? 'ইসলামিক ও আতর' : 'Islamic & Attar'}</span>
          </Link>
          <Link
            href="/catalog?department=kids"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-2.5 rounded hover:bg-gray-50 text-xs font-semibold flex items-center gap-2 text-gray-800"
          >
            <Gamepad2 className="w-4 h-4 text-pink-600" />
            <span>{lang === 'bn' ? 'কিডস জোন ও খেলনা' : 'Kids Zone'}</span>
          </Link>
          <Link
            href="/catalog?department=gifts"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-2.5 rounded hover:bg-gray-50 text-xs font-semibold flex items-center gap-2 text-gray-800"
          >
            <Gift className="w-4 h-4 text-rose-600" />
            <span>{lang === 'bn' ? 'গিফট ও লাইফস্টাইল' : 'Gifts & Lifestyle'}</span>
          </Link>

          <div className="my-2 border-t border-gray-100" />

          <Link
            href="/catalog?bestseller=true"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-2.5 rounded hover:bg-gray-50 text-xs font-bold text-[#0B6E4F] flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>{lang === 'bn' ? 'বেস্ট সেলিং' : 'Bestsellers'}</span>
          </Link>
          <Link
            href="/catalog?flash=true"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-2.5 rounded hover:bg-gray-50 text-xs font-bold text-[#E11D48] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#E11D48]" />
            <span>{lang === 'bn' ? 'সুপার ডিল' : 'Super Deals'}</span>
          </Link>
          <Link
            href="/track"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-2.5 rounded hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center gap-2"
          >
            <Truck className="w-4 h-4 text-[#0B6E4F]" />
            <span>{t.nav.trackOrder}</span>
          </Link>
          <Link
            href="/account"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-2.5 rounded hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center gap-2"
          >
            <User className="w-4 h-4 text-[#0B6E4F]" />
            <span>{lang === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account'}</span>
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 px-2.5 rounded hover:bg-gray-50 text-xs font-bold text-purple-700 flex items-center gap-2"
          >
            <span>⚙️ {t.nav.admin}</span>
          </Link>
        </div>
      )}
    </header>
  );
}
