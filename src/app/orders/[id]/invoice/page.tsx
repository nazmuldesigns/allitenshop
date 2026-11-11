'use client';

import React, { useEffect, useState, use } from 'react';
import { Order } from '@/types';
import { Printer, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await fetch(`/api/track?orderNumber=${id}`);
        const data = await res.json();
        if (data.success && data.order) {
          setOrder(data.order);
        }
      } catch {
        // Ignored
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-xs font-semibold text-gray-500">
        চালান প্রস্তুত হচ্ছে...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-base font-bold text-gray-800 mb-2">অর্ডার পাওয়া যায়নি</h2>
        <Link href="/" className="text-xs text-[#0B6E4F] hover:underline">
          হোমপেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8 text-slate-900 font-sans">
      {/* Control Toolbar (hidden when printing) */}
      <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          href={`/track?orderNumber=${order.order_number}`}
          className="text-xs font-bold text-[#0B6E4F] flex items-center gap-1.5 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ট্র্যাকিং পেজে ফিরে যান</span>
        </Link>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-[#0B6E4F] hover:bg-[#074D37] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>চালান প্রিন্ট করুন (Print Invoice)</span>
        </button>
      </div>

      {/* Invoice Sheet */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm print:shadow-none print:border-0 print:p-0">
        {/* Invoice Header */}
        <div className="flex items-start justify-between border-b-2 border-[#0B6E4F] pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#0B6E4F]">পাতাঘর (Pataghor)</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">পাতা ওল্টান, জীবন গড়ুন • Every page, delivered.</p>
            <p className="text-[11px] text-slate-400 mt-1">
              বাংলাবাজার ও ধানমন্ডি, ঢাকা, বাংলাদেশ | হটলাইন: 01700-000000
            </p>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-[#E8F5EE] text-[#0B6E4F] font-bold text-xs rounded-lg mb-1">
              ডেলিভারি চালান / INVOICE
            </span>
            <div className="text-xs font-mono font-bold text-slate-800">
              #{order.order_number}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              তারিখ: {new Date(order.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Courier COD Alert Box */}
        <div className="bg-[#FAF7F0] border-2 border-[#F4A300] rounded-xl p-4 mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-600 block">কুরিয়ার আদায়যোগ্য মূল্য (COD Amount):</span>
            <span className="text-2xl font-black text-[#0B6E4F]">
              ৳{order.total_amount}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold uppercase px-2.5 py-1 bg-[#0B6E4F] text-white rounded">
              {order.payment_method}
            </span>
            <p className="text-[10px] text-slate-500 mt-1">বই হাতে পেয়ে মূল্য পরিশোধ</p>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 text-xs space-y-1">
          <span className="font-bold text-[#0B6E4F] uppercase tracking-wider block mb-1">
            প্রাপকের ঠিকানা (Delivery Details):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-slate-400">নাম (Name):</p>
              <p className="font-bold text-slate-900 text-sm">{order.customer_name}</p>
            </div>
            <div>
              <p className="text-slate-400">ফোন (Mobile):</p>
              <p className="font-bold text-slate-900 text-sm">{order.customer_phone}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200 mt-2">
            <p className="text-slate-400">বিস্তারিত ঠিকানা (Address):</p>
            <p className="font-semibold text-slate-800">
              {order.shipping_street_address}, {order.shipping_upazila}, {order.shipping_district}, {order.shipping_division}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-xs text-left mb-6 border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
              <th className="py-2.5 px-3">ক্রমিক</th>
              <th className="py-2.5 px-3">বইয়ের নাম (Title)</th>
              <th className="py-2.5 px-3 text-center">পরিমাণ</th>
              <th className="py-2.5 px-3 text-right">একক মূল্য</th>
              <th className="py-2.5 px-3 text-right">মোট (৳)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {order.items?.map((item, index) => (
              <tr key={item.id || index}>
                <td className="py-2.5 px-3 text-slate-400">{index + 1}</td>
                <td className="py-2.5 px-3">
                  <div className="font-bold text-slate-900">{item.book_title_bn}</div>
                  <div className="text-[10px] text-slate-400">{item.book_title}</div>
                </td>
                <td className="py-2.5 px-3 text-center font-bold text-slate-800">
                  {item.quantity}
                </td>
                <td className="py-2.5 px-3 text-right text-slate-600">
                  ৳{item.unit_price}
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                  ৳{item.total_price}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-200 font-semibold text-slate-600">
              <td colSpan={4} className="py-2 px-3 text-right">উপমোট (Subtotal):</td>
              <td className="py-2 px-3 text-right">৳{order.subtotal}</td>
            </tr>
            {order.discount_amount > 0 && (
              <tr className="text-emerald-700 font-semibold">
                <td colSpan={4} className="py-1 px-3 text-right">ডিসকাউন্ট ({order.coupon_code || 'কুপন'}):</td>
                <td className="py-1 px-3 text-right">-৳{order.discount_amount}</td>
              </tr>
            )}
            <tr className="text-slate-600 font-semibold">
              <td colSpan={4} className="py-1 px-3 text-right">ডেলিভারি ফি (Delivery Charge):</td>
              <td className="py-1 px-3 text-right">৳{order.delivery_fee}</td>
            </tr>
            <tr className="text-base font-black text-slate-900 border-t-2 border-slate-300">
              <td colSpan={4} className="py-3 px-3 text-right">সর্বমোট প্রদেয় (Grand Total):</td>
              <td className="py-3 px-3 text-right text-[#0B6E4F]">৳{order.total_amount}</td>
            </tr>
          </tfoot>
        </table>

        {/* Customer Instruction & Signatures */}
        <div className="border-t border-slate-200 pt-6 mt-6">
          <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">
            * পার্সেল গ্রহণের পূর্বে ডেলিভারিম্যানের সামনে বই ঠিক আছে কিনা যাচাই করে নিন। কোনো সমস্যা থাকলে ডেলিভারিম্যানকে অবহিত করুন অথবা সরাসরি আমাদের হটলাইনে যোগাযোগ করুন।
          </p>

          <div className="flex justify-between items-end pt-8 text-[11px] text-slate-400">
            <div className="border-t border-slate-300 pt-1 text-center w-36">
              কর্তৃপক্ষের স্বাক্ষর
            </div>
            <div className="border-t border-slate-300 pt-1 text-center w-36">
              গ্রাহকের স্বাক্ষর
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

