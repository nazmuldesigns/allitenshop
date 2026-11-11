import React from 'react';
import Link from 'next/link';
import { getAdminStats } from '@/lib/data/storeService';
import {
  ShoppingBag,
  Package,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
  FileText,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  CreditCard,
  Building2,
  Tag,
  Megaphone,
} from 'lucide-react';
import OrderStatusSelect from './OrderStatusSelect';

export const revalidate = 0; // Dynamic

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const maxMonthlyRevenue = Math.max(...stats.monthlySales.map((m) => m.revenue));

  return (
    <div className="space-y-6">
      {/* 1. Welcome & Quick Action Header */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">অ্যাডমিন ড্যাশবোর্ড ও বিক্রয় কেন্দ্র</h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E8F5EE] text-[#0B6E4F] border border-emerald-200">
              লাইভ ডাটা
            </span>
          </div>
          <p className="text-xs text-gray-500">
            রকমারি-স্টাইল পাতাঘরের রিয়েল-টাইম বিক্রয়, অর্ডার প্রবাহ এবং ইনভেন্টরি ট্র্যাকিং
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/books"
            className="px-3.5 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>নতুন পণ্য যোগ করুন</span>
          </Link>

          <Link
            href="/admin/coupons"
            className="px-3.5 py-2 rounded-lg bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs flex items-center gap-1.5 transition-colors border border-gray-300"
          >
            <Tag className="w-4 h-4 text-[#F4A300]" />
            <span>নতুন কুপন / ছাড়</span>
          </Link>

          <Link
            href="/admin/marketing"
            className="px-3.5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center gap-1.5 transition-colors border border-gray-200"
          >
            <Megaphone className="w-4 h-4 text-[#E11D48]" />
            <span>হোমপেজ অ্যাড ও ব্যানার</span>
          </Link>
        </div>
      </div>

      {/* 2. Top 6 KPI Performance Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Revenue */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 block mb-1">মোট বিক্রয় (Revenue)</span>
          <div className="text-xl font-black text-gray-900">৳{stats.totalRevenue.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 mt-1 font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>+১৮% প্রবৃদ্ধি</span>
          </div>
        </div>

        {/* This Month's Sales */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 block mb-1">চলতি মাসের বিক্রয়</span>
          <div className="text-xl font-black text-[#0B6E4F]">৳২১৫,০০০</div>
          <div className="text-[10px] text-gray-500 mt-1">মোট ২৮৮টি সফল অর্ডার</div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 block mb-1">মোট অর্ডার (Orders)</span>
          <div className="text-xl font-black text-blue-600">{stats.totalOrders}</div>
          <div className="text-[10px] text-gray-500 mt-1">চলমান ও সম্পন্ন</div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 block mb-1">অপেক্ষমাণ অর্ডার</span>
          <div className="text-xl font-black text-amber-600">{stats.pendingOrders}</div>
          <div className="text-[10px] text-amber-700 mt-1">প্যাকিং প্রয়োজন</div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 block mb-1">ক্যাটালগ পণ্য সংখ্যা</span>
          <div className="text-xl font-black text-gray-900">{stats.totalBooks}</div>
          <div className="text-[10px] text-gray-500 mt-1">৬টি বিভাগে মোট আইটেম</div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 block mb-1">কম স্টক সতর্কতা</span>
          <div className="text-xl font-black text-red-600">{stats.lowStockCount}</div>
          <div className="text-[10px] text-red-500 mt-1 font-medium">১০টির কম মজুদ</div>
        </div>
      </div>

      {/* 3. Monthly Sales Analytics Chart & Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Monthly Sales Visual Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#0B6E4F]" />
                  <span>মাসিক বিক্রয় বিশ্লেষণ (Monthly Sales Trend)</span>
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  গত ১২ মাসের মোট বিক্রয় (টাকা) ও অর্ডারের তুলনামূলক চিত্র
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-[#0B6E4F] border border-emerald-200">
                চলতি বছর ২০২৬
              </span>
            </div>

            {/* Visual Bar Chart */}
            <div className="pt-4 pb-2">
              <div className="h-48 flex items-end gap-2 sm:gap-3 border-b border-gray-200 pb-2">
                {stats.monthlySales.map((m, idx) => {
                  const heightPercent = Math.max(15, Math.round((m.revenue / maxMonthlyRevenue) * 100));
                  const isPeak = m.revenue === maxMonthlyRevenue;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 bg-gray-900 text-white text-[10px] py-1 px-2 rounded pointer-events-none whitespace-nowrap shadow-md">
                        <div className="font-bold">৳{m.revenue.toLocaleString()}</div>
                        <div className="text-gray-300">{m.orders}টি অর্ডার</div>
                      </div>

                      {/* Bar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-md transition-all duration-300 group-hover:opacity-90 ${
                          isPeak
                            ? 'bg-[#0B6E4F]'
                            : idx >= 8
                            ? 'bg-emerald-600/80'
                            : 'bg-emerald-500/50'
                        }`}
                      />
                      <span className="text-[10px] font-semibold text-gray-600 truncate max-w-full">
                        {m.month_en}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend */}
              <div className="flex items-center justify-between pt-3 text-[11px] text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#0B6E4F]" />
                    <span>সর্বোচ্চ পিক সেল (ডিসেম্বর - ৳২১৫,০০০)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/50" />
                    <span>স্বাভাবিক সেলস ট্রেন্ড</span>
                  </div>
                </div>
                <div className="font-semibold text-gray-700">
                  বার্ষিক গড় বৃদ্ধি: <span className="text-emerald-700">+১২.৫%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Sales Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-1 flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span>বিভাগভিত্তিক বিক্রয় শেয়ার</span>
            </h3>
            <p className="text-[11px] text-gray-500 mb-4">৬টি প্রধান ডিপার্টমেন্টের অবদান</p>

            <div className="space-y-3.5">
              {stats.departmentSales.map((dept, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-gray-800">{dept.name_bn}</span>
                    <span className="text-gray-900 font-bold">
                      {dept.percentage}% <span className="text-gray-400 font-normal">({dept.count} বিক্রি)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${dept.percentage}%`, backgroundColor: dept.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <span>শীর্ষ বিভাগ:</span>
            <span className="font-bold text-[#0B6E4F]">বই ও সাহিত্য (৩৮%)</span>
          </div>
        </div>
      </div>

      {/* 4. Payment & Delivery Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0B6E4F] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-gray-900">ডেলিভারি জোন রেশিও (কুরিয়ার)</h4>
              <p className="text-[11px] text-gray-500">ঢাকা মেট্রো বনাম সারাদেশের ডেলিভারি</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-gray-500 block text-[10px]">ঢাকা সিটির ভেতরে (৬০৳)</span>
              <strong className="text-base text-gray-900 font-black">৫৮% অর্ডার</strong>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">২৪ ঘণ্টায় ডেলিভারি</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-gray-500 block text-[10px]">ঢাকার বাইরে / জেলা শহর (১২০৳)</span>
              <strong className="text-base text-gray-900 font-black">৪২% অর্ডার</strong>
              <p className="text-[10px] text-blue-600 font-medium mt-0.5">২-৩ দিনে পেপারফ্লাই/রেডেক্স</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#F4A300] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-gray-900">পেমেন্ট মেথড বিভাজন</h4>
              <p className="text-[11px] text-gray-500">গ্রাহকদের সবচেয়ে পছন্দের পেমেন্ট পদ্ধতি</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-gray-500 block text-[10px]">ক্যাশ অন ডেলিভারি (COD)</span>
              <strong className="text-base text-gray-900 font-black">৭৬% পেমেন্ট</strong>
              <p className="text-[10px] text-gray-500 font-medium mt-0.5">পণ্য হাতে পেয়ে পরিশোধ</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-gray-500 block text-[10px]">ডিজিটাল পেমেন্ট (বিকাশ / নগদ)</span>
              <strong className="text-base text-gray-900 font-black">২৪% পেমেন্ট</strong>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">ইনস্ট্যান্ট পেইড</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Recent Orders Table with Instant Status Selector */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#0B6E4F]" />
              <span>সাম্প্রতিক অর্ডারসমূহ (Recent Orders)</span>
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              সর্বশেষ আগত কাস্টমার অর্ডার ও ডেলিভারি স্ট্যাটাস দ্রুত পরিবর্তন করুন
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#0B6E4F] hover:underline flex items-center gap-1"
          >
            <span>সবগুলো অর্ডার ({stats.totalOrders})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">অর্ডার নম্বর</th>
                <th className="py-3 px-4">গ্রাহক ও ফোন</th>
                <th className="py-3 px-4">ঠিকানা</th>
                <th className="py-3 px-4">মোট বিল</th>
                <th className="py-3 px-4">পেমেন্ট</th>
                <th className="py-3 px-4">বর্তমান স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">ইনভয়েস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-gray-900">
                    <Link href={`/orders/${order.id}/invoice`} className="hover:text-[#0B6E4F] hover:underline">
                      {order.order_number}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{order.customer_name}</div>
                    <div className="text-[11px] text-gray-500 font-mono">{order.customer_phone}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    <div>{order.shipping_district}</div>
                    <div className="text-[10px] text-gray-400 truncate max-w-[150px]">
                      {order.shipping_upazila}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#0B6E4F]">
                    ৳{order.total_amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 uppercase">
                      {order.payment_method}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/orders/${order.id}/invoice`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-[11px] text-gray-600 hover:text-[#0B6E4F] font-semibold bg-gray-50 hover:bg-gray-100 px-2.5 py-1 rounded border border-gray-200 transition-colors"
                    >
                      <FileText className="w-3 h-3 text-[#0B6E4F]" />
                      <span>রসিদ</span>
                    </Link>
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
