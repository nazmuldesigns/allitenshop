'use client';

import React, { useState } from 'react';
import { Author, Category, Department, Publisher } from '@/types';
import {
  FolderTree,
  Users,
  Building2,
  Plus,
  Sparkles,
  ExternalLink,
  X,
  Search,
} from 'lucide-react';

interface CategoriesClientProps {
  initialCategories: Category[];
  initialAuthors: Author[];
  initialPublishers: Publisher[];
}

export default function CategoriesClient({
  initialCategories,
  initialAuthors,
  initialPublishers,
}: CategoriesClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [authors, setAuthors] = useState<Author[]>(initialAuthors);
  const [publishers, setPublishers] = useState<Publisher[]>(initialPublishers);

  // Tab State
  const [activeTab, setActiveTab] = useState<'categories' | 'authors' | 'publishers'>('categories');
  const [search, setSearch] = useState('');

  // Add Category Modal
  const [showCatModal, setShowCatModal] = useState(false);
  const [catNameBn, setCatNameBn] = useState('');
  const [catNameEn, setCatNameEn] = useState('');
  const [catDept, setCatDept] = useState<Department>('books');
  const [catFeatured, setCatFeatured] = useState(false);

  // Add Brand/Author Modal
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [authorNameBn, setAuthorNameBn] = useState('');
  const [authorNameEn, setAuthorNameEn] = useState('');
  const [authorPhoto, setAuthorPhoto] = useState('');

  // Add Publisher Modal
  const [showPubModal, setShowPubModal] = useState(false);
  const [pubNameBn, setPubNameBn] = useState('');
  const [pubNameEn, setPubNameEn] = useState('');
  const [pubWebsite, setPubWebsite] = useState('');

  const [loading, setLoading] = useState(false);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catNameBn.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'category',
          name_bn: catNameBn.trim(),
          name: catNameEn.trim() || catNameBn.trim(),
          slug: (catNameEn.trim() || catNameBn.trim()).toLowerCase().replace(/[^a-z0-9]/g, '-'),
          department: catDept,
          is_featured: catFeatured,
        }),
      });
      const data = await res.json();
      if (res.ok && data.item) {
        setCategories([...categories, data.item]);
        setShowCatModal(false);
        setCatNameBn('');
        setCatNameEn('');
      }
    } catch {
      alert('ক্যাটাগরি তৈরি ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorNameBn.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'author',
          name_bn: authorNameBn.trim(),
          name: authorNameEn.trim() || authorNameBn.trim(),
          slug: (authorNameEn.trim() || authorNameBn.trim()).toLowerCase().replace(/[^a-z0-9]/g, '-'),
          photo_url: authorPhoto.trim() || null,
        }),
      });
      const data = await res.json();
      if (res.ok && data.item) {
        setAuthors([...authors, data.item]);
        setShowAuthorModal(false);
        setAuthorNameBn('');
        setAuthorNameEn('');
      }
    } catch {
      alert('লেখক/ব্র্যান্ড তৈরি ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePublisher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubNameBn.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'publisher',
          name_bn: pubNameBn.trim(),
          name: pubNameEn.trim() || pubNameBn.trim(),
          slug: (pubNameEn.trim() || pubNameBn.trim()).toLowerCase().replace(/[^a-z0-9]/g, '-'),
          website: pubWebsite.trim() || null,
        }),
      });
      const data = await res.json();
      if (res.ok && data.item) {
        setPublishers([...publishers, data.item]);
        setShowPubModal(false);
        setPubNameBn('');
        setPubNameEn('');
      }
    } catch {
      alert('প্রকাশনী তৈরি ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.name_bn.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAuthors = authors.filter(
    (a) =>
      a.name_bn.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPublishers = publishers.filter(
    (p) =>
      p.name_bn.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Tab Navigation & Controls */}
      <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'categories'
                ? 'bg-[#0B6E4F] text-white shadow-xs'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>বিষয় / ক্যাটাগরি ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('authors')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'authors'
                ? 'bg-[#0B6E4F] text-white shadow-xs'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>লেখক ও ব্র্যান্ড ({authors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('publishers')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'publishers'
                ? 'bg-[#0B6E4F] text-white shadow-xs'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>প্রকাশনী ও ভেন্ডর ({publishers.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="নাম খুঁজুন..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-1.5 pl-7 pr-2 text-xs outline-none focus:border-[#0B6E4F]"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-2" />
          </div>

          {activeTab === 'categories' && (
            <button
              onClick={() => setShowCatModal(true)}
              className="px-3 py-1.5 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1 shadow-xs whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ ক্যাটাগরি যোগ</span>
            </button>
          )}

          {activeTab === 'authors' && (
            <button
              onClick={() => setShowAuthorModal(true)}
              className="px-3 py-1.5 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1 shadow-xs whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ ব্র্যান্ড/লেখক যোগ</span>
            </button>
          )}

          {activeTab === 'publishers' && (
            <button
              onClick={() => setShowPubModal(true)}
              className="px-3 py-1.5 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1 shadow-xs whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ প্রকাশনী যোগ</span>
            </button>
          )}
        </div>
      </div>

      {/* Categories Grid */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredCategories.map((c) => (
            <div
              key={c.id}
              className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-xs text-gray-900">{c.name_bn}</div>
                <div className="text-[10px] text-gray-400">{c.name}</div>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-100 text-gray-600 uppercase">
                  {c.department || 'books'}
                </span>
              </div>
              {c.is_featured && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-[#0B6E4F] border border-emerald-200 font-bold">
                  Featured
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Authors / Brands Grid */}
      {activeTab === 'authors' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredAuthors.map((a) => (
            <div
              key={a.id}
              className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                {a.photo_url ? (
                  <img src={a.photo_url} alt={a.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-xs text-[#0B6E4F]">
                    {a.name[0]}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-gray-900 truncate">{a.name_bn}</div>
                <div className="text-[10px] text-gray-400 truncate">{a.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Publishers Grid */}
      {activeTab === 'publishers' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredPublishers.map((p) => (
            <div
              key={p.id}
              className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs"
            >
              <div className="font-bold text-xs text-gray-900">{p.name_bn}</div>
              <div className="text-[10px] text-gray-400">{p.name}</div>
              {p.website && (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#0B6E4F] hover:underline flex items-center gap-1 mt-1 font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>ওয়েবসাইট ভিজিট</span>
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ADD CATEGORY MODAL */}
      {showCatModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-[#0B6E4F]" />
                <span>নতুন ক্যাটাগরি তৈরি করুন</span>
              </h3>
              <button
                onClick={() => setShowCatModal(false)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">বিভাগ (Department)</label>
                <select
                  value={catDept}
                  onChange={(e) => setCatDept(e.target.value as Department)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 font-semibold text-gray-800 outline-none focus:border-[#0B6E4F]"
                >
                  <option value="books">বই ও সাহিত্য</option>
                  <option value="electronics">স্মার্ট ইলেকট্রনিক্স</option>
                  <option value="islamic">ইসলামিক ও আতর</option>
                  <option value="stationery">স্টেশনারি ও অফিস</option>
                  <option value="kids">কিডস জোন ও খেলনা</option>
                  <option value="gifts">গিফট ও লাইফস্টাইল</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">ক্যাটাগরি নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={catNameBn}
                  onChange={(e) => setCatNameBn(e.target.value)}
                  placeholder="যেমন: স্মার্টওয়াচ ও ব্যান্ড / সাইকোলজি"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">ক্যাটাগরি নাম (English)</label>
                <input
                  type="text"
                  value={catNameEn}
                  onChange={(e) => setCatNameEn(e.target.value)}
                  placeholder="e.g. Smartwatches / Psychology"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-gray-700 pt-1">
                <input
                  type="checkbox"
                  checked={catFeatured}
                  onChange={(e) => setCatFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#0B6E4F] rounded"
                />
                <span>হোমপেজ ফিচার্ড ক্যাটাগরি হিসেবে দেখান</span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCatModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold transition-colors shadow-xs"
                >
                  {loading ? 'সংরক্ষণ হচ্ছে...' : 'ক্যাটাগরি সেভ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD BRAND/AUTHOR MODAL */}
      {showAuthorModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0B6E4F]" />
                <span>নতুন লেখক বা অফিসিয়াল ব্র্যান্ড যুক্ত করুন</span>
              </h3>
              <button
                onClick={() => setShowAuthorModal(false)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAuthor} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={authorNameBn}
                  onChange={(e) => setAuthorNameBn(e.target.value)}
                  placeholder="যেমন: হায়লু / আল হারামাইন / হুমায়ূন আহমেদ"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">নাম (English)</label>
                <input
                  type="text"
                  value={authorNameEn}
                  onChange={(e) => setAuthorNameEn(e.target.value)}
                  placeholder="e.g. Haylou / Al Haramain / Humayun Ahmed"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">ছবি বা লোগো URL</label>
                <input
                  type="url"
                  value={authorPhoto}
                  onChange={(e) => setAuthorPhoto(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAuthorModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold transition-colors shadow-xs"
                >
                  {loading ? 'সংরক্ষণ হচ্ছে...' : 'ব্র্যান্ড/লেখক সেভ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PUBLISHER MODAL */}
      {showPubModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0B6E4F]" />
                <span>নতুন প্রকাশনী বা ভেন্ডর যুক্ত করুন</span>
              </h3>
              <button
                onClick={() => setShowPubModal(false)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePublisher} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">প্রকাশনী/ভেন্ডর নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={pubNameBn}
                  onChange={(e) => setPubNameBn(e.target.value)}
                  placeholder="যেমন: অনন্যা প্রকাশনী / রিম্যাক্স বিডি"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">প্রকাশনী/ভেন্ডর নাম (English)</label>
                <input
                  type="text"
                  value={pubNameEn}
                  onChange={(e) => setPubNameEn(e.target.value)}
                  placeholder="e.g. Ananya Prakashani / Remax BD"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">অফিসিয়াল ওয়েবসাইট URL</label>
                <input
                  type="url"
                  value={pubWebsite}
                  onChange={(e) => setPubWebsite(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowPubModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold transition-colors shadow-xs"
                >
                  {loading ? 'সংরক্ষণ হচ্ছে...' : 'প্রকাশনী সেভ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
