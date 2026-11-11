import React from 'react';
import { getAuthors, getBooks, getCategories, getPublishers } from '@/lib/data/storeService';
import BooksClient from './BooksClient';

export const revalidate = 0; // Dynamic

export default async function AdminBooksPage() {
  const [booksRes, categories, authors, publishers] = await Promise.all([
    getBooks({ limit: 100 }),
    getCategories(),
    getAuthors(),
    getPublishers(),
  ]);

  return (
    <BooksClient
      initialBooks={booksRes.books}
      categories={categories}
      authors={authors}
      publishers={publishers}
    />
  );
}

