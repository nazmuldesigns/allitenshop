'use client';

import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Save,
  CheckCircle2,
  Truck,
  PhoneCall,
  CreditCard,
  Building2,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { SiteMarketingConfig } from '@/lib/data/marketingService';

export default function AdminSettingsPage() {
  const [insideDhaka, setInsideDhaka] = useState(60);
  const [outsideDhaka, setOutsideDhaka] = useState(120);
  const [freeShippingMin, setFreeShippingMin] = useState(1500);
  const [helpline, setHelpline] = useState('০১৭১২-৩৪৫৬৭৮');
  const [email, setEmail] = useState('support@pataghor.com');
  const [codEnabled, setCodEnabled] = useState(true);
  const [bkashEnabled, setBkashEnabled] = useState(true);
  const [nagadEnabled, setNagadEnabled] = useState(true);

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.config?.announcement) {
          const a = data.config.announcement;
          if (a.inside_dhaka_delivery) setInsideDhaka(a.inside_dhaka_delivery);
          if (a.outside_dhaka_delivery) setOutsideDhaka(a.outside_dhaka_delivery);
          if (a.free_delivery_min) setFreeShippingMin(a.free_delivery_min);
          if (a.helpline) setHelpline(a.helpline);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          announcement: {
            inside_dhaka_delivery: insideDhaka,
            outside_dhaka_delivery: outsideDhaka,
            free_delivery_min: freeShippingMin,
            helpline,
          },
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {
      alert('সেটিংস সংরক্ষণ ব্যর্থ হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">স্টোর ডেলিভারি ও পেমেন্ট সেটিংস</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#0B6E4F]">
              সিস্টেম কনফিগ
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            ঢাকা মেট্রো ও জেলা শহরের ডেলিভারি চার্জ, ফ্রি শিপিং ও পেমেন্ট চ্যানেল কনফিগার করুন
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>সেভ হয়েছে!</span>
            </span>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সেভ করুন'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Delivery Rates */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0B6E4F] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">কুরিয়ার ও ডেলিভারি চার্জ (বাংলাদেশ)</h3>
              <p className="text-[11px] text-gray-500">গ্রাহকদের চেকআউট ও কার্টে স্বয়ংক্রিয়ভাবে প্রযোজ্য হবে</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-gray-700 block mb-1">ঢাকা সিটির ভেতর চার্জ (৳)</label>
              <input
                type="number"
                required
                value={insideDhaka}
                onChange={(e) => setInsideDhaka(parseInt(e.target.value) || 0)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 font-bold text-gray-900 outline-none focus:border-[#0B6E4F]"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">ডিফল্ট: ৬০৳</span>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">ঢাকার বাইরে / জেলা শহর চার্জ (৳)</label>
              <input
                type="number"
                required
                value={outsideDhaka}
                onChange={(e) => setOutsideDhaka(parseInt(e.target.value) || 0)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 font-bold text-gray-900 outline-none focus:border-[#0B6E4F]"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">ডিফল্ট: ১২০৳</span>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">ফ্রি ডেলিভারি নূন্যতম অর্ডার (৳)</label>
              <input
                type="number"
                required
                value={freeShippingMin}
                onChange={(e) => setFreeShippingMin(parseInt(e.target.value) || 0)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 font-bold text-[#0B6E4F] outline-none focus:border-[#0B6E4F]"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">ডিফল্ট: ১৫০০৳</span>
            </div>
          </div>
        </div>

        {/* Contact & Support */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">যোগাযোগ ও কাস্টমার সাপোর্ট</h3>
              <p className="text-[11px] text-gray-500">ইনভয়েস ও হেডারে প্রদর্শিত হবে</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-gray-700 block mb-1">কাস্টমার হেল্পলাইন নম্বর</label>
              <input
                type="text"
                value={helpline}
                onChange={(e) => setHelpline(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#0B6E4F]"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">অফিসিয়াল সাপোর্ট ইমেইল</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#0B6E4F]"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#F4A300] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">পেমেন্ট মেথড চ্যানেল</h3>
              <p className="text-[11px] text-gray-500">চেকআউটে সক্রিয় পেমেন্ট অপশন</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between cursor-pointer">
              <span className="font-bold text-gray-800">ক্যাশ অন ডেলিভারি (COD)</span>
              <input
                type="checkbox"
                checked={codEnabled}
                onChange={(e) => setCodEnabled(e.target.checked)}
                className="w-4 h-4 text-[#0B6E4F] rounded focus:ring-0"
              />
            </label>

            <label className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between cursor-pointer">
              <span className="font-bold text-gray-800">বিকাশ পেমেন্ট (bKash)</span>
              <input
                type="checkbox"
                checked={bkashEnabled}
                onChange={(e) => setBkashEnabled(e.target.checked)}
                className="w-4 h-4 text-[#0B6E4F] rounded focus:ring-0"
              />
            </label>

            <label className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between cursor-pointer">
              <span className="font-bold text-gray-800">নগদ পেমেন্ট (Nagad)</span>
              <input
                type="checkbox"
                checked={nagadEnabled}
                onChange={(e) => setNagadEnabled(e.target.checked)}
                className="w-4 h-4 text-[#0B6E4F] rounded focus:ring-0"
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

