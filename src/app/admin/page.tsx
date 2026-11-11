import React from 'react';
import Link from 'next/link';
import { getAdminStats } from '@/lib/data/storeService';
import {
  DollarSign,
  ShoppingBag,
  BookOpen,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  PlusCircle,
} from 'lucide-react';
import OrderStatusSelect from './OrderStatusSelect';

export const revalidate = 0; // Dynamic

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">অ্যাডমিন ড্যাশবোর্ড</h1>
          <p className="text-xs text-slate-500 mt-1">
            পাতাঘরের বিক্রয়, অর্ডার ও ইনভেন্টরি ট্র্যাকিং এক নজরে
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/books"
            className="px-4 py-2 rounded-xl bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>বই যোগ / CSV ইমপোর্ট</span>
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>সকল অর্ডার</span>
          </Link>
        </div>
      </div>

      {/* 4 Stats KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">মোট বিক্রয় (Revenue)</span>
            <span className="text-2xl font-black text-slate-900">
              ৳{stats.totalRevenue.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>সফল ডেলিভারি ও রানিং অর্ডার</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0B6E4F] flex items-center justify-center">
            <span className="text-xl font-black">৳</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">মোট অর্ডার (Orders)</span>
            <span className="text-2xl font-black text-slate-900">
              {stats.totalOrders}
            </span>
            <p className="text-[11px] text-slate-500 mt-1">গ্রাহকদের অর্ডারকৃত সংখ্যা</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Total Books */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">ক্যাটালগ বই (Books)</span>
            <span className="text-2xl font-black text-slate-900">
              {stats.totalBooks}
            </span>
            <p className="text-[11px] text-slate-500 mt-1">বাংলা ও ইংরেজি প্রকাশনা</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F4A300] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">কম স্টক অ্যালার্ট</span>
            <span className="text-2xl font-black text-amber-600">
              {stats.lowStockCount}
            </span>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">১৫ কপির নিচে মজুদ</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base text-slate-900">সাম্প্রতিক অর্ডারসমূহ (Recent Orders)</h2>
            <p className="text-xs text-slate-500 mt-0.5">অর্ডারের স্ট্যাটাস পরিবর্তন করুন সরাসরি এখান থেকেই</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#0B6E4F] hover:underline flex items-center gap-1"
          >
            <span>সকল অর্ডার দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">অর্ডার নং</th>
                <th className="py-3 px-4">ক্রেতার নাম ও ফোন</th>
                <th className="py-3 px-4">ঠিকানা</th>
                <th className="py-3 px-4">বই সংখ্যা</th>
                <th className="py-3 px-4">সর্বমোট</th>
                <th className="py-3 px-4">বর্তমান স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#0B6E4F]">
                    {ord.order_number}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{ord.customer_name}</div>
                    <div className="text-[11px] text-slate-400">{ord.customer_phone}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <div>{ord.shipping_district}, {ord.shipping_division}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-xs">{ord.shipping_street_address}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {ord.items?.length || 1}টি বই
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    ৳{ord.total_amount}
                  </td>
                  <td className="py-3 px-4">
                    <OrderStatusSelect orderId={ord.id} initialStatus={ord.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

