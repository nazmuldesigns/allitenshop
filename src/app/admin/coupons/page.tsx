'use client';

import React, { useState } from 'react';
import { SEED_COUPONS } from '@/lib/data/seedData';
import { Coupon, DiscountType } from '@/types';
import { Tag, Plus, CheckCircle2, Trash2 } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(SEED_COUPONS);
  const [showModal, setShowModal] = useState(false);

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<DiscountType>('percentage');
  const [discountValue, setDiscountValue] = useState('15');
  const [minOrder, setMinOrder] = useState('400');
  const [maxDiscount, setMaxDiscount] = useState('150');
  const [validUntil, setValidUntil] = useState('2027-12-31');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newCoupon: Coupon = {
      id: `cpn-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discount_type: discountType,
      discount_value: parseFloat(discountValue) || 10,
      min_order_amount: parseFloat(minOrder) || 0,
      max_discount_amount: maxDiscount ? parseFloat(maxDiscount) : null,
      valid_until: validUntil,
      times_used: 0,
      is_active: true,
    };

    setCoupons([newCoupon, ...coupons]);
    setShowModal(false);
    setCode('');
  };

  const handleToggleActive = (id: string) => {
    setCoupons(
      coupons.map((c) => (c.id === id ? { ...c, is_active: !c.is_active } : c))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">কুপন ও ডিসকাউন্ট কোড (Coupons)</h1>
          <p className="text-xs text-slate-500 mt-1">
            গ্রাহকদের জন্য বিশেষ ছাড় ও প্রোমো কোড পরিচালনা করুন
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কুপন কোড তৈরি করুন</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`bg-white p-5 rounded-2xl border transition-all shadow-sm relative overflow-hidden ${
              c.is_active ? 'border-slate-200' : 'border-red-200 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono font-black text-lg text-[#0B6E4F] tracking-wider px-2.5 py-1 bg-[#E8F5EE] rounded-lg">
                {c.code}
              </span>
              <button
                onClick={() => handleToggleActive(c.id)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  c.is_active
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {c.is_active ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয় (Inactive)'}
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
              <div className="flex justify-between">
                <span>ছাড়ের পরিমাণ:</span>
                <strong className="text-slate-900">
                  {c.discount_type === 'percentage'
                    ? `${c.discount_value}% ছাড়`
                    : `৳${c.discount_value} নির্দিষ্ট ছাড়`}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>নূন্যতম অর্ডার:</span>
                <span className="font-semibold">৳{c.min_order_amount}</span>
              </div>
              {c.max_discount_amount && (
                <div className="flex justify-between">
                  <span>সর্বোচ্চ ছাড়:</span>
                  <span className="font-semibold">৳{c.max_discount_amount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ব্যবহৃত হয়েছে:</span>
                <span className="font-semibold">{c.times_used} বার</span>
              </div>
            </div>

            <div className="pt-3 border-t text-[11px] text-slate-400">
              মেয়াদ: {c.valid_until || 'চলমান'}
            </div>
          </div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">নতুন কুপন কোড তৈরি করুন</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">কুপন কোড *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="উদা: EID25"
                  className="w-full uppercase font-mono font-bold border rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">ছাড়ের ধরন</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                    className="w-full border rounded-lg p-2 outline-none"
                  >
                    <option value="percentage">শতকরা (%)</option>
                    <option value="fixed">নির্দিষ্ট টাকা (৳)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">ছাড়ের মান *</label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">নূন্যতম অর্ডার (৳)</label>
                  <input
                    type="number"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">সর্বোচ্চ ছাড় (৳)</label>
                  <input
                    type="number"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    placeholder="ঐচ্ছিক"
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">মেয়াদ শেষ</label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full border rounded-lg p-2 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-50 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B6E4F] hover:bg-[#074D37] text-white rounded-lg font-bold shadow-sm"
                >
                  কুপন যোগ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
