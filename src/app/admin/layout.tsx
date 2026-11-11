import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  FolderTree,
  ExternalLink,
  Megaphone,
  Sliders,
  Store,
  Sparkles,
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'অ্যাডমিন প্যানেল | Pataghor (পাতাঘর)',
  description: 'রকমারি-স্টাইল পাতাঘর ই-কমার্স অ্যাডমিন কন্ট্রোল প্যানেল - পণ্য, অর্ডার, সেলস রিপোর্ট ও ব্যানার ম্যানেজমেন্ট',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F7] text-[#1E293B]">
      {/* 1. Admin Topbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-[#0B6E4F] flex items-center justify-center text-white font-black text-lg shadow-xs group-hover:scale-102 transition-transform">
                পা
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-gray-900 tracking-tight">পাতাঘর অ্যাডমিন</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5EE] text-[#0B6E4F] border border-emerald-200">
                    রকমারি কন্ট্রোল
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">Mega E-Commerce Store Management</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6E4F] border border-emerald-200 font-medium text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>স্টোর লাইভ ও অ্যাক্টিভ</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold transition-colors flex items-center gap-1.5 border border-gray-200"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gray-600" />
              <span>লাইভ স্টোর প্রিভিউ</span>
            </Link>
          </div>
        </div>

        {/* 2. Admin Horizontal Navigation Ribbon */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs font-semibold py-1.5 scrollbar-thin">
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#0B6E4F] flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-[#0B6E4F]" />
              <span>ড্যাশবোর্ড ও বিক্রয়</span>
            </Link>

            <Link
              href="/admin/books"
              className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#0B6E4F] flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <Package className="w-4 h-4 text-blue-600" />
              <span>পণ্য ও ইনভেন্টরি</span>
            </Link>

            <Link
              href="/admin/orders"
              className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#0B6E4F] flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>অর্ডার ও ডেলিভারি</span>
            </Link>

            <Link
              href="/admin/categories"
              className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#0B6E4F] flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <FolderTree className="w-4 h-4 text-purple-600" />
              <span>ক্যাটাগরি ও ব্র্যান্ড</span>
            </Link>

            <Link
              href="/admin/coupons"
              className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#0B6E4F] flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <Tag className="w-4 h-4 text-[#F4A300]" />
              <span>ডিসকাউন্ট ও কুপন</span>
            </Link>

            <Link
              href="/admin/marketing"
              className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#0B6E4F] flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <Megaphone className="w-4 h-4 text-[#E11D48]" />
              <span>অ্যানাউন্সমেন্ট ও অ্যাড ডিজাইন</span>
            </Link>

            <Link
              href="/admin/settings"
              className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 hover:text-[#0B6E4F] flex items-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <Sliders className="w-4 h-4 text-slate-600" />
              <span>ডেলিভারি চার্জ ও সেটিংস</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">{children}</main>
    </div>
  );
}
