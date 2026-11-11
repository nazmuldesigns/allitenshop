'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Filter,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Check,
  BookOpen,
  Headphones,
  PenTool,
  Moon,
  Gamepad2,
  Gift,
  LayoutGrid,
} from 'lucide-react';
import { Author, Book, Category, Department, Publisher } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import BookCard from '@/components/book/BookCard';

interface DepartmentOption {
  id: string;
  name: string;
  name_bn: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const DEPARTMENTS: DepartmentOption[] = [
  { id: '', name: 'All Departments', name_bn: 'সকল পণ্য', icon: LayoutGrid, color: 'text-gray-700' },
  { id: 'books', name: 'Books', name_bn: 'বই কালেকশন', icon: BookOpen, color: 'text-emerald-700' },
  { id: 'electronics', name: 'Electronics', name_bn: 'ইলেকট্রনিক্স ও গ্যাজেট', icon: Headphones, color: 'text-blue-700' },
  { id: 'stationery', name: 'Stationery', name_bn: 'স্টেশনারি ও অফিস', icon: PenTool, color: 'text-purple-700' },
  { id: 'islamic', name: 'Islamic & Attar', name_bn: 'ইসলামিক ও আতর', icon: Moon, color: 'text-amber-700' },
  { id: 'kids', name: 'Kids & Toys', name_bn: 'খেলনা ও কিডস', icon: Gamepad2, color: 'text-pink-700' },
  { id: 'gifts', name: 'Gifts & Lifestyle', name_bn: 'গিফট ও লাইফস্টাইল', icon: Gift, color: 'text-rose-700' },
];

interface CatalogClientFiltersProps {
  categories: Category[];
  authors: Author[];
  publishers: Publisher[];
  books: Book[];
  total: number;
  currentPage: number;
  totalPages: number;
  currentFilters: {
    q?: string;
    department?: string;
    category?: string;
    author?: string;
    publisher?: string;
    language?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    sort?: string;
  };
}

export default function CatalogClientFilters({
  categories,
  authors,
  publishers,
  books,
  total,
  currentPage,
  totalPages,
  currentFilters,
}: CatalogClientFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang, t, toBengaliNumber } = useLanguage();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [minPrice, setMinPrice] = useState(currentFilters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice || '');

  const updateQueryParam = (updates: Record<string, string | null | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === undefined || val === '') {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    // Reset to page 1 on filter change if page wasn't explicitly changed
    if (!updates.page) {
      params.delete('page');
    }
    router.push(`/catalog?${params.toString()}`);
  };

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault();
    updateQueryParam({ minPrice, maxPrice });
  };

  const clearAllFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    router.push('/catalog');
  };

  // Filter categories by selected department if one is selected
  const visibleCategories = currentFilters.department
    ? categories.filter((c) => c.department === currentFilters.department)
    : categories;

  const currentDept = DEPARTMENTS.find((d) => d.id === (currentFilters.department || ''));

  const filterSidebar = (
    <div className="space-y-6">
      {/* Active Filters Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <h3 className="font-bold text-sm text-[#1E293B] flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#0B6E4F]" />
          <span>{t.catalog.filters}</span>
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-xs text-[#0B6E4F] hover:underline font-semibold"
        >
          {t.catalog.clearFilters}
        </button>
      </div>

      {/* Departments */}
      <div>
        <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-3">
          {lang === 'bn' ? 'ডিপার্টমেন্ট (বিভাগ)' : 'Department'}
        </h4>
        <div className="space-y-1">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            const isSelected = (!currentFilters.department && dept.id === '') || currentFilters.department === dept.id;
            return (
              <button
                key={dept.id || 'all'}
                onClick={() => updateQueryParam({ department: dept.id || null, category: null })}
                className={`w-full text-left text-xs py-2 px-2.5 rounded-lg transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#0B6E4F] text-white font-bold shadow-xs'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : dept.color}`} />
                <span>{lang === 'bn' ? dept.name_bn : dept.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-3">
          {t.catalog.categories}
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => updateQueryParam({ category: null })}
            className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between ${
              !currentFilters.category
                ? 'bg-[#E8F5EE] text-[#0B6E4F] font-bold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>{lang === 'bn' ? 'সকল ক্যাটাগরি' : 'All Categories'}</span>
          </button>
          {visibleCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => updateQueryParam({ category: c.slug })}
              className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between ${
                currentFilters.category === c.slug
                  ? 'bg-[#E8F5EE] text-[#0B6E4F] font-bold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{lang === 'bn' ? c.name_bn : c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Authors (Show only if Books or no department selected) */}
      {(!currentFilters.department || currentFilters.department === 'books') && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-3">
            {t.catalog.authors}
          </h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            <button
              onClick={() => updateQueryParam({ author: null })}
              className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors ${
                !currentFilters.author
                  ? 'bg-[#E8F5EE] text-[#0B6E4F] font-bold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {lang === 'bn' ? 'সকল লেখক' : 'All Authors'}
            </button>
            {authors.map((a) => (
              <button
                key={a.id}
                onClick={() => updateQueryParam({ author: a.slug })}
                className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                  currentFilters.author === a.slug
                    ? 'bg-[#E8F5EE] text-[#0B6E4F] font-bold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{lang === 'bn' ? a.name_bn : a.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-3">
          {t.catalog.priceRange} (৳)
        </h4>
        <form onSubmit={handlePriceApply} className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded px-2.5 py-1 text-xs outline-none focus:border-[#0B6E4F]"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded px-2.5 py-1 text-xs outline-none focus:border-[#0B6E4F]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-1.5 bg-[#0B6E4F] hover:bg-[#074D37] text-white text-xs font-semibold rounded transition-colors"
          >
            {lang === 'bn' ? 'মূল্য ফিল্টার করুন' : 'Apply Price'}
          </button>
        </form>
      </div>

      {/* In Stock Only Checkbox */}
      <div className="pt-4 border-t border-gray-200">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
          <input
            type="checkbox"
            checked={currentFilters.inStock === 'true'}
            onChange={(e) => updateQueryParam({ inStock: e.target.checked ? 'true' : null })}
            className="rounded accent-[#0B6E4F]"
          />
          <span>{t.catalog.inStockOnly}</span>
        </label>
      </div>
    </div>
  );

  return (
    <div>
      {/* Top Rokomari-Style Department Pills Selector */}
      <div className="mb-6 overflow-x-auto scrollbar-none pb-1">
        <div className="flex items-center gap-2 min-w-max">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            const isSelected = (!currentFilters.department && dept.id === '') || currentFilters.department === dept.id;
            return (
              <button
                key={dept.id || 'all-pill'}
                onClick={() => updateQueryParam({ department: dept.id || null, category: null })}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#0B6E4F] text-white shadow-md scale-102'
                    : 'bg-white border border-gray-200/90 text-gray-700 hover:border-[#0B6E4F] hover:bg-emerald-50/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : dept.color}`} />
                <span>{lang === 'bn' ? dept.name_bn : dept.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Banner and Breadcrumb */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
            {currentDept ? (lang === 'bn' ? currentDept.name_bn : currentDept.name) : t.catalog.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t.catalog.showing}{' '}
            <span className="font-bold text-[#0B6E4F]">
              {lang === 'bn' ? toBengaliNumber(total) : total}
            </span>{' '}
            {lang === 'bn' ? 'টি পণ্য পাওয়া গেছে' : 'items found'}
            {currentFilters.q && ` ("${currentFilters.q}")`}
          </p>
        </div>

        {/* Toolbar: Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-[#1E293B] shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#0B6E4F]" />
            <span>{t.catalog.filters}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={currentFilters.sort || 'popular'}
              onChange={(e) => updateQueryParam({ sort: e.target.value })}
              className="bg-transparent border-0 outline-none text-xs font-medium text-gray-700 cursor-pointer"
            >
              <option value="popular">{t.catalog.sortPopular}</option>
              <option value="price-asc">{t.catalog.sortPriceAsc}</option>
              <option value="price-desc">{t.catalog.sortPriceDesc}</option>
              <option value="rating">{t.catalog.sortRating}</option>
              <option value="newest">{t.catalog.sortNewest}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm h-fit sticky top-24">
          {filterSidebar}
        </aside>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-black/50 backdrop-blur-sm">
            <div className="relative w-4/5 max-w-sm bg-white h-full overflow-y-auto p-5 shadow-2xl">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
              {filterSidebar}
            </div>
            <div className="flex-1" onClick={() => setMobileFilterOpen(false)} />
          </div>
        )}

        {/* Products Grid */}
        <section className="lg:col-span-3">
          {books.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E8F5EE] text-[#0B6E4F] flex items-center justify-center mx-auto mb-4 text-2xl">
                🔍
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {lang === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No items found'}
              </h3>
              <p className="text-xs text-gray-500 mb-6 max-w-md mx-auto">
                {lang === 'bn'
                  ? 'আপনার দেওয়া ফিল্টার বা অনুসন্ধানের সাথে কোনো পণ্য মেলেনি। অনুগ্রহ করে ফিল্টারগুলো পরিবর্তন করুন।'
                  : 'We could not find any items matching your active filters. Try clearing some filters.'}
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-xl bg-[#0B6E4F] text-white text-xs font-semibold hover:bg-[#074D37] transition-colors"
              >
                {t.catalog.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => updateQueryParam({ page: (currentPage - 1).toString() })}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => updateQueryParam({ page: p.toString() })}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                    p === currentPage
                      ? 'bg-[#0B6E4F] text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {lang === 'bn' ? toBengaliNumber(p) : p}
                </button>
              ))}

              <button
                disabled={currentPage >= totalPages}
                onClick={() => updateQueryParam({ page: (currentPage + 1).toString() })}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
