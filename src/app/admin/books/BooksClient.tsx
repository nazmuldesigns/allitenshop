'use client';

import React, { useState } from 'react';
import { Author, Book, Category, Department, Publisher } from '@/types';
import {
  Plus,
  Upload,
  Search,
  Trash2,
  Edit,
  Check,
  AlertCircle,
  FileSpreadsheet,
  Image as ImageIcon,
  Sparkles,
  Flame,
  CheckCircle2,
  X,
  Layers,
  ArrowUpDown,
  ExternalLink,
} from 'lucide-react';

interface BooksClientProps {
  initialBooks: Book[];
  categories: Category[];
  authors: Author[];
  publishers: Publisher[];
}

const SAMPLE_IMAGE_PRESETS: { label: string; department: string; url: string }[] = [
  {
    label: 'স্মার্টওয়াচ (Smartwatch)',
    department: 'electronics',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
  },
  {
    label: 'ইয়ারবাডস (Earbuds)',
    department: 'electronics',
    url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
  },
  {
    label: 'বাংলা বই (Novel Book)',
    department: 'books',
    url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
  },
  {
    label: 'ইংরেজি বই (English Book)',
    department: 'books',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
  },
  {
    label: 'খাঁটি আতর (Oud Attar)',
    department: 'islamic',
    url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80',
  },
  {
    label: 'জায়নামাজ (Prayer Mat)',
    department: 'islamic',
    url: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=600&q=80',
  },
  {
    label: 'প্রিমিয়াম পেন (Parker Pen)',
    department: 'stationery',
    url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=80',
  },
  {
    label: 'বাচ্চাদের খেলনা (Kids Toy)',
    department: 'kids',
    url: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&q=80',
  },
];

export default function BooksClient({
  initialBooks,
  categories,
  authors,
  publishers,
}: BooksClientProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');

  // Add Product Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Book | null>(null);
  const [showCsvModal, setShowCsvModal] = useState(false);

  // Form State
  const [department, setDepartment] = useState<Department>('books');
  const [categoryId, setCategoryId] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [brand, setBrand] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [publisherId, setPublisherId] = useState('');
  const [price, setPrice] = useState('450');
  const [discountPrice, setDiscountPrice] = useState('380');
  const [stockQuantity, setStockQuantity] = useState('20');
  const [isbn, setIsbn] = useState('');
  const [warranty, setWarranty] = useState('');
  const [pages, setPages] = useState('160');
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80');
  const [descriptionBn, setDescriptionBn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // CSV Import State
  const [csvText, setCsvText] = useState('');
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvResult, setCsvResult] = useState<string | null>(null);

  // Discount percentage calculator
  const regularPriceNum = parseFloat(price) || 0;
  const discountPriceNum = parseFloat(discountPrice) || 0;
  const discountPercent =
    regularPriceNum > 0 && discountPriceNum > 0 && discountPriceNum < regularPriceNum
      ? Math.round(((regularPriceNum - discountPriceNum) / regularPriceNum) * 100)
      : 0;

  // Filtered products
  const filteredBooks = books.filter((b) => {
    // 1. Department filter
    if (selectedDept !== 'all') {
      const bDept = b.department || 'books';
      if (bDept !== selectedDept) return false;
    }

    // 2. Stock filter
    if (stockFilter === 'in_stock' && b.stock_quantity <= 0) return false;
    if (stockFilter === 'low_stock' && (b.stock_quantity <= 0 || b.stock_quantity > 10)) return false;
    if (stockFilter === 'out_of_stock' && b.stock_quantity > 0) return false;

    // 3. Search filter
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.title_bn.includes(q) ||
      b.brand?.toLowerCase().includes(q) ||
      b.isbn?.toLowerCase().includes(q)
    );
  });

  const handleOpenAddModal = () => {
    setEditProduct(null);
    setTitleBn('');
    setTitleEn('');
    setBrand('');
    setAuthorId('');
    setPublisherId('');
    setPrice('450');
    setDiscountPrice('380');
    setStockQuantity('25');
    setIsbn('');
    setWarranty('');
    setPages('160');
    setCoverUrl('https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80');
    setDescriptionBn('');
    setDescriptionEn('');
    setIsFeatured(false);
    setIsBestseller(false);
    setIsFlashSale(false);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (book: Book) => {
    setEditProduct(book);
    setDepartment(book.department || 'books');
    setTitleBn(book.title_bn);
    setTitleEn(book.title);
    setBrand(book.brand || '');
    setAuthorId(book.author_id || '');
    setPublisherId(book.publisher_id || '');
    setPrice(book.price.toString());
    setDiscountPrice(book.discount_price ? book.discount_price.toString() : '');
    setStockQuantity(book.stock_quantity.toString());
    setIsbn(book.isbn || '');
    setWarranty(book.warranty || '');
    setPages(book.pages ? book.pages.toString() : '160');
    setCoverUrl(book.cover_url || '');
    setDescriptionBn(book.description_bn || '');
    setDescriptionEn(book.description || '');
    setIsFeatured(book.is_featured);
    setIsBestseller(book.is_bestseller);
    setIsFlashSale(book.is_flash_sale);
    setShowAddModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCoverUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn.trim()) {
      alert('পণ্যের বাংলা নাম আবশ্যক');
      return;
    }
    setFormLoading(true);

    const payload = {
      id: editProduct ? editProduct.id : undefined,
      department,
      title_bn: titleBn.trim(),
      title: titleEn.trim() || titleBn.trim(),
      slug: (titleEn.trim() || titleBn.trim())
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-'),
      brand: brand.trim() || null,
      author_id: authorId || null,
      publisher_id: publisherId || null,
      price: parseFloat(price) || 0,
      discount_price: discountPrice ? parseFloat(discountPrice) : null,
      stock_quantity: parseInt(stockQuantity) || 0,
      isbn: isbn.trim() || null,
      warranty: warranty.trim() || null,
      pages: parseInt(pages) || 160,
      language,
      cover_url: coverUrl.trim(),
      description_bn: descriptionBn.trim(),
      description: descriptionEn.trim() || descriptionBn.trim(),
      is_featured: isFeatured,
      is_bestseller: isBestseller,
      is_flash_sale: isFlashSale,
    };

    try {
      const res = await fetch('/api/admin/books', {
        method: editProduct ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.book) {
        if (editProduct) {
          setBooks(books.map((b) => (b.id === editProduct.id ? data.book : b)));
        } else {
          setBooks([data.book, ...books]);
        }
        setShowAddModal(false);
      } else {
        alert(data.message || 'সংরক্ষণ ব্যর্থ হয়েছে');
      }
    } catch {
      alert('সার্ভার এরর');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm('আপনি কি নিশ্চিতভাবে এই পণ্যটি মুছে ফেলতে চান?')) return;

    try {
      const res = await fetch(`/api/admin/books?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBooks(books.filter((b) => b.id !== id));
      }
    } catch {
      alert('ডিলিট ব্যর্থ হয়েছে');
    }
  };

  const handleStockChange = async (id: string, delta: number) => {
    const book = books.find((b) => b.id === id);
    if (!book) return;
    const newStock = Math.max(0, book.stock_quantity + delta);

    try {
      const res = await fetch('/api/admin/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, stock_quantity: newStock }),
      });
      if (res.ok) {
        setBooks(books.map((b) => (b.id === id ? { ...b, stock_quantity: newStock } : b)));
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
        setCsvResult(`সফলভাবে ${data.count}টি পণ্য যুক্ত হয়েছে!`);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
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
      {/* 1. Header & Actions */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">পণ্য ও ইনভেন্টরি ব্যবস্থাপনা</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#0B6E4F]">
              মোট {books.length}টি পণ্য
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            বই, স্মার্ট গ্যাজেট, প্রিমিয়াম আতর, স্টেশনারি ও খেলনাসহ সকল ক্যাটাগরির পণ্য যুক্ত ও নিয়ন্ত্রণ করুন
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowCsvModal(true)}
            className="px-3.5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center gap-1.5 transition-colors border border-gray-200"
          >
            <Upload className="w-4 h-4 text-[#0B6E4F]" />
            <span>বাল্ক CSV ইমপোর্ট</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ নতুন পণ্য যুক্ত করুন</span>
          </button>
        </div>
      </div>

      {/* 2. Department Category Filter Tabs */}
      <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-thin">
          {[
            { id: 'all', label: 'সকল পণ্য', count: books.length },
            { id: 'books', label: 'বই ও সাহিত্য', count: books.filter((b) => !b.department || b.department === 'books').length },
            { id: 'electronics', label: 'ইলেকট্রনিক্স', count: books.filter((b) => b.department === 'electronics').length },
            { id: 'islamic', label: 'ইসলামিক ও আতর', count: books.filter((b) => b.department === 'islamic').length },
            { id: 'stationery', label: 'স্টেশনারি', count: books.filter((b) => b.department === 'stationery').length },
            { id: 'kids', label: 'কিডস ও খেলনা', count: books.filter((b) => b.department === 'kids').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDept(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedDept === tab.id
                  ? 'bg-[#0B6E4F] text-white shadow-xs'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedDept === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Stock Status Filter */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-gray-400 text-[11px] hidden md:inline">ফিল্টার:</span>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-[#0B6E4F]"
          >
            <option value="all">সকল স্টক অবস্থা</option>
            <option value="in_stock">মজুদ আছে (In Stock)</option>
            <option value="low_stock">কম স্টক (Low Stock ≤ 10)</option>
            <option value="out_of_stock">স্টক শেষ (Stock Out)</option>
          </select>
        </div>
      </div>

      {/* 3. Search and Count Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="পণ্যের নাম, ব্র্যান্ড বা মডেল দিয়ে খুঁজুন..."
            className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-xs outline-none focus:border-[#0B6E4F] shadow-2xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs text-gray-500 font-medium">
          প্রদর্শিত হচ্ছে: <strong className="text-gray-900">{filteredBooks.length}</strong>টি পণ্য
        </div>
      </div>

      {/* 4. Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">ছবি ও নাম</th>
                <th className="py-3 px-4">বিভাগ / ব্র্যান্ড</th>
                <th className="py-3 px-4">মূল্য (৳)</th>
                <th className="py-3 px-4">ছাড়ের মূল্য</th>
                <th className="py-3 px-4">মজুদ স্টক (দ্রুত পরিবর্তন)</th>
                <th className="py-3 px-4">হোমপেজ ব্যাজ</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    কোনো পণ্য খুঁজে পাওয়া যায়নি। ফিল্টার পরিবর্তন করে বা নতুন পণ্য যুক্ত করুন।
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book) => {
                  const regP = book.price;
                  const discP = book.discount_price;
                  const saveP = regP && discP && discP < regP ? Math.round(((regP - discP) / regP) * 100) : 0;
                  const isLow = book.stock_quantity <= 10 && book.stock_quantity > 0;
                  const isOut = book.stock_quantity === 0;

                  return (
                    <tr key={book.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* Image & Title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-14 bg-white rounded border border-gray-200 p-1 shrink-0 overflow-hidden flex items-center justify-center shadow-2xs">
                            {book.cover_url ? (
                              <img
                                src={book.cover_url}
                                alt={book.title}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span className="text-xl">📦</span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 line-clamp-1">{book.title_bn}</div>
                            <div className="text-[11px] text-gray-500 line-clamp-1">{book.title}</div>
                            {book.isbn && (
                              <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                                SKU: {book.isbn}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Department & Brand */}
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-800 capitalize mb-0.5">
                          {book.department || 'books'}
                        </span>
                        <div className="text-xs text-gray-700 font-medium">
                          {book.brand || book.author?.name_bn || 'জনপ্রিয় প্রকাশনা'}
                        </div>
                      </td>

                      {/* Regular Price */}
                      <td className="py-3 px-4 font-bold text-gray-900">৳{book.price}</td>

                      {/* Discount Price */}
                      <td className="py-3 px-4">
                        {book.discount_price ? (
                          <div>
                            <span className="font-bold text-[#0B6E4F]">৳{book.discount_price}</span>
                            {saveP > 0 && (
                              <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                                -{saveP}%
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>

                      {/* Stock with Quick Adjusters */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStockChange(book.id, -1)}
                            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center transition-colors"
                            title="১টি কমান"
                          >
                            -
                          </button>
                          <span
                            className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                              isOut
                                ? 'bg-red-100 text-red-700'
                                : isLow
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-50 text-emerald-800'
                            }`}
                          >
                            {book.stock_quantity}
                          </span>
                          <button
                            onClick={() => handleStockChange(book.id, 1)}
                            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center transition-colors"
                            title="১টি বাড়ান"
                          >
                            +
                          </button>
                        </div>
                        {isLow && <span className="text-[10px] text-amber-600 block mt-0.5">কম স্টক</span>}
                        {isOut && <span className="text-[10px] text-red-600 block mt-0.5">স্টক শেষ</span>}
                      </td>

                      {/* Badges */}
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {book.is_bestseller && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              বেস্টসেলার
                            </span>
                          )}
                          {book.is_flash_sale && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                              ⚡ সুপার ডিল
                            </span>
                          )}
                          {book.is_featured && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                              ফিচার্ড
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(book)}
                            className="p-1.5 text-gray-600 hover:text-[#0B6E4F] hover:bg-emerald-50 rounded transition-colors"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. ADD / EDIT PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-2xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl my-8 border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {editProduct ? 'পণ্য সম্পাদনা করুন (Edit Product)' : 'নতুন পণ্য যুক্ত করুন (Add New Product)'}
                </h3>
                <p className="text-xs text-gray-500">
                  রকমারি-স্টাইলে ছবি, মূল্য, স্টক ও স্পেসিফিকেশন পূরণ করুন
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="space-y-4 text-xs">
              {/* Department & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">বিভাগ (Department) *</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as Department)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 font-semibold text-gray-800 outline-none focus:border-[#0B6E4F]"
                  >
                    <option value="books">বই ও সাহিত্য (Books)</option>
                    <option value="electronics">স্মার্ট ইলেকট্রনিক্স ও গ্যাজেট (Electronics)</option>
                    <option value="islamic">ইসলামিক ও আতর (Islamic & Attar)</option>
                    <option value="stationery">স্টেশনারি ও অফিস সাপ্লাই (Stationery)</option>
                    <option value="kids">কিডস জোন ও খেলনা (Kids Toys)</option>
                    <option value="gifts">গিফট ও লাইফস্টাইল (Gifts)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">ব্র্যান্ড / প্রস্তুতকারক / লেখক</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="যেমন: Haylou, Al Haramain, Humayun Ahmed"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>
              </div>

              {/* Product Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">পণ্যের নাম (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={titleBn}
                    onChange={(e) => setTitleBn(e.target.value)}
                    placeholder="যেমন: হায়লু সোলার প্লাস স্মার্টওয়াচ"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">পণ্যের নাম (English)</label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. Haylou Solar Plus RT3 AMOLED Smartwatch"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>
              </div>

              {/* Pricing, Discount & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">রেগুলার মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 font-bold text-gray-900 outline-none focus:border-[#0B6E4F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">ছাড়ের মূল্য (৳)</label>
                  <input
                    type="number"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="ঐচ্ছিক"
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 font-bold text-[#0B6E4F] outline-none focus:border-[#0B6E4F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">ছাড়ের হার (%)</label>
                  <div className="p-2 bg-white border border-gray-300 rounded-lg font-bold text-red-600 flex items-center justify-between">
                    <span>{discountPercent}% ছাড়</span>
                    {discountPercent > 0 && <span className="text-[10px] text-gray-500">অটো সেভ</span>}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">মজুদ সংখ্যা (Stock) *</label>
                  <input
                    type="number"
                    required
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 font-bold text-gray-900 outline-none focus:border-[#0B6E4F]"
                  />
                </div>
              </div>

              {/* Image Options: URL + Preview + Quick Presets + File Upload */}
              <div className="border border-gray-200 rounded-xl p-3 bg-gray-50/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#0B6E4F]" />
                    <span>পণ্যের ছবি যুক্ত করার অপশন (Image Options)</span>
                  </label>
                  <span className="text-[10px] text-gray-500">অনলাইন URL বা লোকাল ছবি</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-20 bg-white rounded-lg border border-gray-300 p-1 shrink-0 overflow-hidden shadow-2xs flex items-center justify-center">
                    {coverUrl ? (
                      <img src={coverUrl} alt="Preview" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-gray-400 text-xs">নো ছবি</span>
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <input
                      type="url"
                      value={coverUrl}
                      onChange={(e) => setCoverUrl(e.target.value)}
                      placeholder="কভার ইমেজের URL দিন (https://...)"
                      className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs outline-none focus:border-[#0B6E4F]"
                    />

                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-2.5 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded text-[11px] font-semibold text-gray-700 flex items-center gap-1 shadow-2xs">
                        <Upload className="w-3 h-3 text-[#0B6E4F]" />
                        <span>ডিভাইস থেকে ছবি আপলোড</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[10px] text-gray-400">বা নিচের রেডিমেড স্যাম্পল ক্লিক করুন:</span>
                    </div>
                  </div>
                </div>

                {/* Sample Presets */}
                <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-thin">
                  {SAMPLE_IMAGE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCoverUrl(preset.url)}
                      className="px-2 py-1 bg-white hover:bg-emerald-50 border border-gray-200 rounded text-[10px] font-medium text-gray-700 whitespace-nowrap transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications: Warranty, Model/ISBN, Pages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">মডেল / SKU / বারকোড</label>
                  <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="যেমন: HYL-RT3-BLK"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">ওয়ারেন্টি / গ্যারান্টি</label>
                  <input
                    type="text"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    placeholder="যেমন: ১ বছর অফিসিয়াল ওয়ারেন্টি"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">পৃষ্ঠা সংখ্যা (বইয়ের ক্ষেত্রে)</label>
                  <input
                    type="number"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>
              </div>

              {/* Full Product Description */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">পণ্যের বিস্তারিত বিবরণ (Description - বাংলা)</label>
                <textarea
                  rows={3}
                  value={descriptionBn}
                  onChange={(e) => setDescriptionBn(e.target.value)}
                  placeholder="পণ্যের বৈশিষ্ট্য, ম্যাটেরিয়াল ও ব্যবহারের নিয়ম..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              {/* Homepage Features & Badges */}
              <div className="flex items-center gap-4 pt-1 flex-wrap">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="rounded text-[#0B6E4F] focus:ring-0 w-4 h-4"
                  />
                  <span>🔥 বেস্টসেলার পণ্য</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={isFlashSale}
                    onChange={(e) => setIsFlashSale(e.target.checked)}
                    className="rounded text-red-600 focus:ring-0 w-4 h-4"
                  />
                  <span>⚡ সুপার ডিল অফার</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-0 w-4 h-4"
                  />
                  <span>⭐ হোমপেজ ফিচার্ড</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold transition-colors shadow-xs"
                >
                  {formLoading ? 'সংরক্ষণ হচ্ছে...' : editProduct ? 'আপডেট সম্পন্ন করুন' : 'পণ্য যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. CSV IMPORT MODAL */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#0B6E4F]" />
                <span>বাল্ক CSV পণ্য ইমপোর্ট</span>
              </h3>
              <button
                onClick={() => setShowCsvModal(false)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-gray-600">
                হেডার ফরম্যাট: <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px] font-mono">title_bn,title,price,discount_price,stock_quantity,department,brand</code>
              </p>

              <textarea
                rows={6}
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder="title_bn,title,price,discount_price,stock_quantity,department,brand&#10;হায়লু স্মার্টওয়াচ,Haylou Watch,3500,2990,15,electronics,Haylou&#10;খাঁটি ওউদ আতর,Pure Oud Attar,650,550,20,islamic,Al Haramain"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 font-mono text-xs outline-none focus:border-[#0B6E4F]"
              />

              {csvResult && (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-[#0B6E4F] border border-emerald-200 font-bold">
                  {csvResult}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowCsvModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  বন্ধ করুন
                </button>
                <button
                  onClick={handleCsvImport}
                  disabled={csvLoading || !csvText.trim()}
                  className="px-5 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold transition-colors disabled:opacity-50"
                >
                  {csvLoading ? 'ইমপোর্ট হচ্ছে...' : 'ইমপোর্ট সম্পন্ন করুন'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
