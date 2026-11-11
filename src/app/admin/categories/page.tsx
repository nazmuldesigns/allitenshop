import React from 'react';
import { getAuthors, getCategories, getPublishers } from '@/lib/data/storeService';
import { FolderTree, Users, Building2, Plus, Sparkles, ExternalLink } from 'lucide-react';
import CategoriesClient from './CategoriesClient';

export const revalidate = 0; // Dynamic

export default async function AdminCategoriesPage() {
  const [categories, authors, publishers] = await Promise.all([
    getCategories(),
    getAuthors(),
    getPublishers(),
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">ক্যাটাগরি, ব্র্যান্ড ও লেখক ব্যবস্থাপনা</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#0B6E4F]">
              মোট {categories.length}টি ক্যাটাগরি
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            বই, ইলেকট্রনিক্স, স্টেশনারি, আতর ও কিডস বিভাগের ক্যাটাগরি এবং অফিসিয়াল ব্র্যান্ডসমূহ পরিচালনা করুন
          </p>
        </div>
      </div>

      <CategoriesClient
        initialCategories={categories}
        initialAuthors={authors}
        initialPublishers={publishers}
      />
    </div>
  );
}
