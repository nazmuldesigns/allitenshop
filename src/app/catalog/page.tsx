import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import BookCard from '@/components/book/BookCard';
import CatalogClientFilters from './CatalogClientFilters';
import {
  getAuthors,
  getBooks,
  getCategories,
  getPublishers,
} from '@/lib/data/storeService';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'বইয়ের ক্যাটালগ | Pataghor (পাতাঘর)',
  description: 'হাজারো বাংলা ও ইংরেজি বই থেকে আপনার প্রিয় বইটি খুঁজে নিন। বিষয়, লেখক, প্রকাশনী ও মূল্য অনুযায়ী ফিল্টার করুন।',
};

interface CatalogPageProps {
  searchParams: Promise<{
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
    page?: string;
    bestseller?: string;
    flash?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const pageSize = 12;
  const offset = (page - 1) * pageSize;

  const [categories, authors, publishers, booksData] = await Promise.all([
    getCategories(),
    getAuthors(),
    getPublishers(),
    getBooks({
      search: params.q,
      department: params.department,
      category: params.category,
      author: params.author,
      publisher: params.publisher,
      language: params.language,
      minPrice: params.minPrice ? parseFloat(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : undefined,
      inStock: params.inStock === 'true',
      isBestseller: params.bestseller === 'true',
      isFlashSale: params.flash === 'true',
      sort: params.sort,
      limit: pageSize,
      offset,
    }),
  ]);

  const { books, total } = booksData;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 sm:py-8 w-full">
        <CatalogClientFilters
          categories={categories}
          authors={authors}
          publishers={publishers}
          books={books}
          total={total}
          currentPage={page}
          totalPages={totalPages}
          currentFilters={{
            q: params.q,
            department: params.department,
            category: params.category,
            author: params.author,
            publisher: params.publisher,
            language: params.language,
            minPrice: params.minPrice,
            maxPrice: params.maxPrice,
            inStock: params.inStock,
            sort: params.sort || 'popular',
          }}
        />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

