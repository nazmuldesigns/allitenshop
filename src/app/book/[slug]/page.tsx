import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import { getBookBySlug, getRelatedBooks } from '@/lib/data/storeService';
import BookDetailClient from './BookDetailClient';
import { Metadata } from 'next';

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    return {
      title: 'বই পাওয়া যায়নি | Pataghor',
    };
  }

  const title = `${book.title_bn} (${book.title}) - ${book.author?.name_bn || 'পাতাঘর'}`;
  const description = book.description_bn || book.description || 'পাতাঘর থেকে অনলাইনে আসল বই অর্ডার করুন।';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: book.cover_url ? [{ url: book.cover_url }] : [],
      type: 'book',
      siteName: 'Pataghor (পাতাঘর)',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: book.cover_url ? [book.cover_url] : [],
    },
  };
}

export default async function BookDetailPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const relatedBooks = await getRelatedBooks(book.id, book.author_id, 4);

  // Generate JSON-LD Schema for Book SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title_bn,
    alternateName: book.title,
    author: {
      '@type': 'Person',
      name: book.author?.name_bn || book.author?.name || 'Unknown',
    },
    isbn: book.isbn || undefined,
    numberOfPages: book.pages || undefined,
    inLanguage: book.language === 'bn' ? 'bn' : 'en',
    publisher: {
      '@type': 'Organization',
      name: book.publisher?.name_bn || book.publisher?.name || 'Pataghor',
    },
    image: book.cover_url || undefined,
    description: book.description_bn || book.description,
    offers: {
      '@type': 'Offer',
      price: book.discount_price ?? book.price,
      priceCurrency: 'BDT',
      availability:
        book.stock_quantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Pataghor',
      },
    },
    aggregateRating:
      book.rating_count > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: book.rating_avg,
            reviewCount: book.rating_count,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F7]">
      {/* Structured Data Script for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 sm:py-8 w-full">
        <BookDetailClient book={book} relatedBooks={relatedBooks} />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}

