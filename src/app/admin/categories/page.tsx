import React from 'react';
import { getAuthors, getCategories, getPublishers } from '@/lib/data/storeService';
import { FolderTree, Users, Building2 } from 'lucide-react';

export const revalidate = 0; // Dynamic

export default async function AdminCategoriesPage() {
  const [categories, authors, publishers] = await Promise.all([
    getCategories(),
    getAuthors(),
    getPublishers(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">ক্যাটাগরি, লেখক ও প্রকাশনী</h1>
        <p className="text-xs text-slate-500 mt-1">পাতাঘরের সকল সাহিত্য বিভাগ ও লেখক তালিকা</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[#0B6E4F]" />
            <span>বিষয় / ক্যাটাগরি ({categories.length})</span>
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-xs">
            {categories.map((c) => (
              <div key={c.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">{c.name_bn}</div>
                  <div className="text-[10px] text-slate-400">{c.name} ({c.slug})</div>
                </div>
                {c.is_featured && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-[#0B6E4F] font-bold">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Authors List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0B6E4F]" />
            <span>লেখকবৃন্দ ({authors.length})</span>
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-xs">
            {authors.map((a) => (
              <div key={a.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0">
                  {a.photo_url ? (
                    <img src={a.photo_url} alt={a.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-[10px]">
                      {a.name[0]}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 truncate">{a.name_bn}</div>
                  <div className="text-[10px] text-slate-400 truncate">{a.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publishers List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0B6E4F]" />
            <span>প্রকাশনীসমূহ ({publishers.length})</span>
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-xs">
            {publishers.map((p) => (
              <div key={p.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-semibold text-slate-800">{p.name_bn}</div>
                <div className="text-[10px] text-slate-400">{p.name}</div>
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[#0B6E4F] hover:underline block mt-0.5"
                  >
                    {p.website}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

