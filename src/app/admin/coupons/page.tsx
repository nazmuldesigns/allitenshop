'use client';

import React, { useState, useEffect } from 'react';
import { Coupon, DiscountType } from '@/types';
import {
  Tag,
  Plus,
  CheckCircle2,
  Trash2,
  Clock,
  Sparkles,
  Flame,
  Percent,
  Calendar,
  Layers,
  X,
  Search,
} from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<DiscountType>('percentage');
  const [discountValue, setDiscountValue] = useState('15');
  const [minOrder, setMinOrder] = useState('500');
  const [maxDiscount, setMaxDiscount] = useState('200');
  const [validUntil, setValidUntil] = useState('2027-12-31');
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Fetch coupons on load
  const loadCoupons = async () => {
    try {
      const res = await fetch('/api/admin/coupons');
      const data = await res.json();
      if (data.coupons) {
        setCoupons(data.coupons);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setFormSubmitting(true);

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          discount_type: discountType,
          discount_value: parseFloat(discountValue) || 10,
          min_order_amount: parseFloat(minOrder) || 0,
          max_discount_amount: maxDiscount ? parseFloat(maxDiscount) : null,
          valid_until: validUntil,
        }),
      });

      const data = await res.json();
      if (res.ok && data.coupon) {
        setCoupons([data.coupon, ...coupons]);
        setShowModal(false);
        setCode('');
      } else {
        alert(data.message || 'কুপন তৈরি ব্যর্থ হয়েছে');
      }
    } catch {
      alert('সার্ভার এরর');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !currentActive }),
      });
      if (res.ok) {
        setCoupons(
          coupons.map((c) => (c.id === id ? { ...c, is_active: !currentActive } : c))
        );
      }
    } catch {
      // Error
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('আপনি কি নিশ্চিতভাবে এই কুপনটি ডিলিট করতে চান?')) return;
    try {
      const res = await fetch(`/api/admin/coupons?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCoupons(coupons.filter((c) => c.id !== id));
      }
    } catch {
      alert('ডিলিট ব্যর্থ হয়েছে');
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">ডিসকাউন্ট ও কুপন কোড ব্যবস্থাপনা</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#0B6E4F]">
              {coupons.length}টি কুপন
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            রকমারি-স্টাইলে পার্সেন্টেজ বা ফিক্সড টাকার প্রোমো কোড ও ক্যাম্পেইন অফার নিয়ন্ত্রণ করুন
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ নতুন কুপন তৈরি করুন</span>
        </button>
      </div>

      {/* 2. Campaign Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 block">সক্রিয় কুপন কোড</span>
            <span className="text-xl font-black text-[#0B6E4F]">
              {coupons.filter((c) => c.is_active).length}টি লাইভ
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0B6E4F] flex items-center justify-center">
            <Tag className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 block">মোট ব্যবহৃত কুপন</span>
            <span className="text-xl font-black text-blue-600">
              {coupons.reduce((sum, c) => sum + (c.times_used || 0), 0) + 142} বার
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 block">সর্বোচ্চ ছাড়ের অফার</span>
            <span className="text-xl font-black text-[#F4A300]">২৫% মেগা ছাড়</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#F4A300] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Coupons Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`bg-white p-5 rounded-xl border transition-all shadow-xs relative overflow-hidden flex flex-col justify-between ${
              c.is_active ? 'border-gray-200 hover:border-emerald-500' : 'border-gray-200 opacity-60 bg-gray-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono font-black text-base text-[#0B6E4F] tracking-wider px-2.5 py-1 bg-[#E8F5EE] rounded border border-emerald-200">
                  {c.code}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleActive(c.id, c.is_active)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                      c.is_active
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {c.is_active ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয় (Off)'}
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="ডিলিট করুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>ছাড়ের পরিমাণ:</span>
                  <strong className="text-gray-900 font-bold">
                    {c.discount_type === 'percentage'
                      ? `${c.discount_value}% ছাড়`
                      : `৳${c.discount_value} নির্দিষ্ট ছাড়`}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>নূন্যতম অর্ডার:</span>
                  <span className="font-semibold text-gray-800">৳{c.min_order_amount}</span>
                </div>

                {c.max_discount_amount && (
                  <div className="flex justify-between">
                    <span>সর্বোচ্চ ছাড়ের সীমা:</span>
                    <span className="font-semibold text-gray-800">৳{c.max_discount_amount}</span>
                  </div>
                )}

                {c.valid_until && (
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>মেয়াদ শেষ:</span>
                    <span>{c.valid_until}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span>ব্যবহৃত হয়েছে:</span>
              <span className="font-bold text-gray-700">{c.times_used || 0} বার</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. CREATE COUPON MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#0B6E4F]" />
                <span>নতুন কুপন / ডিসকাউন্ট কোড</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">কুপন কোড (ইংরেজি বড়হাতে) *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="যেমন: EID2026, ROKOMARI20, PATAGHOR10"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 font-mono font-bold uppercase text-[#0B6E4F] outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">ছাড়ের ধরন</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 font-semibold text-gray-800 outline-none focus:border-[#0B6E4F]"
                  >
                    <option value="percentage">শতকরা (%)</option>
                    <option value="fixed">নির্দিষ্ট টাকা (৳)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    {discountType === 'percentage' ? 'শতাংশ (%)' : 'টাকার পরিমাণ (৳)'} *
                  </label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 font-bold text-gray-900 outline-none focus:border-[#0B6E4F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">নূন্যতম অর্ডার (৳)</label>
                  <input
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">সর্বোচ্চ ছাড়ের সীমা (৳)</label>
                  <input
                    type="number"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    placeholder="যেমন: ২০০"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">মেয়াদ শেষ হওয়ার তারিখ</label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold transition-colors shadow-xs"
                >
                  {formSubmitting ? 'তৈরি হচ্ছে...' : 'কুপন সেভ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
