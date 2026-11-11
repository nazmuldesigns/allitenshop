import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  FolderTree,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'অ্যাডমিন প্যানেল | Pataghor',
  description: 'পাতাঘর অ্যাডমিন কন্ট্রোল প্যানেল - অর্ডার, স্টক এবং বই ব্যবস্থাপনা',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Admin Topbar */}
      <header className="sticky top-0 z-40 bg-[#0B6E4F] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#F4A300]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight">পাতাঘর অ্যাডমিন</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4A300] text-slate-900">
                  Control Panel
                </span>
              </div>
              <p className="text-[10px] text-emerald-200">Pataghor Store Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>মূল ওয়েবসাইটে যান</span>
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="bg-[#074D37] border-t border-[#0B6E4F]">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 sm:gap-4 overflow-x-auto text-xs font-semibold py-1">
            <Link
              href="/admin"
              className="px-3 py-2 rounded-lg hover:bg-white/10 text-white flex items-center gap-1.5 whitespace-nowrap"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#F4A300]" />
              <span>ড্যাশবোর্ড (Dashboard)</span>
            </Link>
            <Link
              href="/admin/orders"
              className="px-3 py-2 rounded-lg hover:bg-white/10 text-white flex items-center gap-1.5 whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#F4A300]" />
              <span>অর্ডারসমূহ (Orders)</span>
            </Link>
            <Link
              href="/admin/books"
              className="px-3 py-2 rounded-lg hover:bg-white/10 text-white flex items-center gap-1.5 whitespace-nowrap"
            >
              <Package className="w-3.5 h-3.5 text-[#F4A300]" />
              <span>বই ও স্টক (Books)</span>
            </Link>
            <Link
              href="/admin/coupons"
              className="px-3 py-2 rounded-lg hover:bg-white/10 text-white flex items-center gap-1.5 whitespace-nowrap"
            >
              <Tag className="w-3.5 h-3.5 text-[#F4A300]" />
              <span>কুপন কোড (Coupons)</span>
            </Link>
            <Link
              href="/admin/categories"
              className="px-3 py-2 rounded-lg hover:bg-white/10 text-white flex items-center gap-1.5 whitespace-nowrap"
            >
              <FolderTree className="w-3.5 h-3.5 text-[#F4A300]" />
              <span>ক্যাটাগরি ও লেখক</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">{children}</main>
    </div>
  );
}

