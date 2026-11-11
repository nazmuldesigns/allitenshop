'use client';

import React, { useState } from 'react';
import { Author, Book, Category, Publisher } from '@/types';
import {
  Plus,
  Upload,
  Search,
  Trash2,
  Edit,
  Check,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';

interface BooksClientProps {
  initialBooks: Book[];
  categories: Category[];
  authors: Author[];
  publishers: Publisher[];
}

export default function BooksClient({
  initialBooks,
  categories,
  authors,
  publishers,
}: BooksClientProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);

  // Add Book Form state
  const [newTitleBn, setNewTitleBn] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newAuthorId, setNewAuthorId] = useState('');
  const [newPublisherId, setNewPublisherId] = useState('');
  const [newPrice, setNewPrice] = useState('300');
  const [newDiscountPrice, setNewDiscountPrice] = useState('250');
  const [newStock, setNewStock] = useState('25');
  const [newPages, setNewPages] = useState('160');
  const [newLanguage, setNewLanguage] = useState<'bn' | 'en'>('bn');
  const [newIsbn, setNewIsbn] = useState('');
  const [newDescBn, setNewDescBn] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // CSV Import State
  const [csvText, setCsvText] = useState('');
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvResult, setCsvResult] = useState<string | null>(null);

  const filteredBooks = books.filter((b) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.title_bn.includes(q) ||
      b.isbn?.toLowerCase().includes(q)
    );
  });

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const res = await fetch('/api/admin/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title_bn: newTitleBn,
          title: newTitleEn || newTitleBn,
          slug: (newTitleEn || newTitleBn)
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-'),
          author_id: newAuthorId || null,
          publisher_id: newPublisherId || null,
          price: parseFloat(newPrice),
          discount_price: newDiscountPrice ? parseFloat(newDiscountPrice) : null,
          stock_quantity: parseInt(newStock) || 0,
          pages: parseInt(newPages) || 150,
          language: newLanguage,
          isbn: newIsbn || null,
          description_bn: newDescBn,
          description: newDescBn,
        }),
      });

      const data = await res.json();
      if (res.ok && data.book) {
        setBooks([data.book, ...books]);
        setShowAddModal(false);
        // Reset form
        setNewTitleBn('');
        setNewTitleEn('');
        setNewDescBn('');
      }
    } catch {
      // Error
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm('আপনি কি নিশ্চিতভাবে এই বইটি মুছে ফেলতে চান?')) return;

    try {
      const res = await fetch(`/api/admin/books?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBooks(books.filter((b) => b.id !== id));
      }
    } catch {
      // Error
    }
  };

  const handleStockChange = async (id: string, newStockVal: number) => {
    if (newStockVal < 0) return;
    try {
      const res = await fetch('/api/admin/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, stock_quantity: newStockVal }),
      });
      if (res.ok) {
        setBooks(
          books.map((b) => (b.id === id ? { ...b, stock_quantity: newStockVal } : b))
        );
      }
    } catch {
      // Error
    }
  };

  const handleCsvImport = async () => {
    if (!csvText.trim()) return;
    setCsvLoading(true);
    setCsvResult(null);

    try {
      const res = await fetch('/api/admin/books/import-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv: csvText }),
      });
      const data = await res.json();
      if (data.success) {
        setCsvResult(`সফলভাবে ${data.count}টি বই যুক্ত হয়েছে!`);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setCsvResult(`ব্যর্থ: ${data.message}`);
      }
    } catch {
      setCsvResult('CSV ইমপোর্টে সমস্যা হয়েছে');
    } finally {
      setCsvLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">বই ও স্টক ব্যবস্থাপনা</h1>
          <p className="text-xs text-slate-500 mt-1">
            মোট {books.length}টি বই তালিকাভুক্ত আছে
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCsvModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-200"
          >
            <Upload className="w-4 h-4 text-[#0B6E4F]" />
            <span>বাল্ক CSV ইমপোর্ট</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন বই যুক্ত করুন</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="বইয়ের নাম বা ISBN খুঁজুন..."
          className="w-full bg-white border border-slate-300 rounded-xl py-2 pl-9 pr-3 text-xs outline-none focus:border-[#0B6E4F]"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">কভার ও নাম</th>
                <th className="py-3 px-4">বিভাগ / ব্র্যান্ড</th>
                <th className="py-3 px-4">মূল্য (৳)</th>
                <th className="py-3 px-4">ছাড়ের মূল্য</th>
                <th className="py-3 px-4">মজুদ স্টক</th>
                <th className="py-3 px-4">ভাষা / সাল</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-14 bg-slate-100 rounded overflow-hidden shrink-0 border">
                        {book.cover_url ? (
                          <img
                            src={book.cover_url}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs">
                            📖
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{book.title_bn}</div>
                        <div className="text-[11px] text-slate-400">{book.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 capitalize mr-1.5 border border-emerald-200">
                      {book.department || 'books'}
                    </span>
                    <span className="text-xs font-medium">
                      {book.author?.name_bn || book.author?.name || book.brand || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    ৳{book.price}
                  </td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">
                    {book.discount_price ? `৳${book.discount_price}` : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                      <button
                        onClick={() => handleStockChange(book.id, book.stock_quantity - 1)}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-200 font-bold"
                      >
                        -
                      </button>
                      <span
                        className={`px-3 py-1 font-bold ${
                          book.stock_quantity <= 10
                            ? 'text-amber-600 bg-amber-50'
                            : 'text-slate-800 bg-white'
                        }`}
                      >
                        {book.stock_quantity}
                      </span>
                      <button
                        onClick={() => handleStockChange(book.id, book.stock_quantity + 1)}
                        className="px-2 py-1 text-slate-600 hover:bg-slate-200 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {book.language === 'bn' ? 'বাংলা' : 'English'} / {book.published_year || '-'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                      title="মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">নতুন বই যোগ করুন</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBook} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">বইয়ের নাম (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={newTitleBn}
                    onChange={(e) => setNewTitleBn(e.target.value)}
                    placeholder="উদা: চাঁদের পাহাড়"
                    className="w-full border rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Book Title (English)</label>
                  <input
                    type="text"
                    value={newTitleEn}
                    onChange={(e) => setNewTitleEn(e.target.value)}
                    placeholder="Chander Pahar"
                    className="w-full border rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">লেখক নির্বাচন করুন</label>
                  <select
                    value={newAuthorId}
                    onChange={(e) => setNewAuthorId(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  >
                    <option value="">লেখক পছন্দ করুন...</option>
                    {authors.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name_bn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">প্রকাশনী</label>
                  <select
                    value={newPublisherId}
                    onChange={(e) => setNewPublisherId(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  >
                    <option value="">প্রকাশক পছন্দ করুন...</option>
                    {publishers.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name_bn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">ছাড়ের মূল্য (৳)</label>
                  <input
                    type="number"
                    value={newDiscountPrice}
                    onChange={(e) => setNewDiscountPrice(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">স্টক *</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">পৃষ্ঠা</label>
                  <input
                    type="number"
                    value={newPages}
                    onChange={(e) => setNewPages(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">ভাষা</label>
                  <select
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value as 'bn' | 'en')}
                    className="w-full border rounded-lg p-2 outline-none"
                  >
                    <option value="bn">বাংলা</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">ISBN</label>
                  <input
                    type="text"
                    value={newIsbn}
                    onChange={(e) => setNewIsbn(e.target.value)}
                    placeholder="978-..."
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">বইয়ের বিবরণ (বাংলা)</label>
                <textarea
                  rows={3}
                  value={newDescBn}
                  onChange={(e) => setNewDescBn(e.target.value)}
                  placeholder="বইয়ের বিষয়বস্তু সম্পর্কে সংক্ষেপে লিখুন..."
                  className="w-full border rounded-lg p-2 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-50 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2 bg-[#0B6E4F] hover:bg-[#074D37] text-white rounded-lg font-bold"
                >
                  {formLoading ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk CSV Import Modal */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#0B6E4F]" />
                <h3 className="font-bold text-base text-slate-900">বাল্ক CSV ইমপোর্ট</h3>
              </div>
              <button
                onClick={() => setShowCsvModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-3">
              <div className="p-3 bg-slate-50 border rounded-xl">
                <p className="font-semibold text-slate-700 mb-1">CSV ফাইলের হেডার কাঠামো:</p>
                <code className="text-[11px] text-[#0B6E4F] font-mono block">
                  title,title_bn,slug,price,discount_price,stock_quantity,pages,language,isbn,description
                </code>
              </div>

              <div>
                <label className="block font-semibold mb-1">CSV টেক্সট পেস্ট করুন:</label>
                <textarea
                  rows={6}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder={`title,title_bn,slug,price,discount_price,stock_quantity,pages,language,isbn,description\nLal Shalu,লাল শালু,lal-shalu,220,180,30,140,bn,978-984,Syed Waliullah classic novel`}
                  className="w-full border rounded-xl p-3 font-mono text-[11px] outline-none focus:border-[#0B6E4F]"
                />
              </div>

              {csvResult && (
                <div className="p-3 bg-emerald-50 text-emerald-800 font-semibold rounded-lg">
                  {csvResult}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowCsvModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-50 font-semibold"
                >
                  বন্ধ করুন
                </button>
                <button
                  type="button"
                  onClick={handleCsvImport}
                  disabled={csvLoading || !csvText.trim()}
                  className="px-5 py-2 bg-[#0B6E4F] hover:bg-[#074D37] text-white rounded-lg font-bold disabled:opacity-50"
                >
                  {csvLoading ? 'ইমপোর্ট হচ্ছে...' : 'ইমপোর্ট করুন'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

