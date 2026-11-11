'use client';

import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Eye,
  Sliders,
  Image as ImageIcon,
  ArrowRight,
  Truck,
  Sparkles,
  PhoneCall,
  Clock,
  ExternalLink,
  Layers,
  X,
} from 'lucide-react';
import { HeroSlide, SiteMarketingConfig } from '@/lib/data/marketingService';

const BG_COLOR_OPTIONS = [
  { label: 'রকমারি বন সবুজ (Forest Green)', value: 'bg-[#0B6E4F]' },
  { label: 'স্মার্ট রয়েল ব্লু (Royal Blue)', value: 'bg-[#1E3A8A]' },
  { label: 'ক্লাসিক ওউদ ব্রাউন (Amber Brown)', value: 'bg-[#78350F]' },
  { label: 'ধামাকা ক্রিসমন রেড (Crimson Red)', value: 'bg-[#991B1B]' },
  { label: 'প্রিমিয়াম পার্পল (Deep Purple)', value: 'bg-[#581C87]' },
];

export default function AdminMarketingPage() {
  const [config, setConfig] = useState<SiteMarketingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Modal State for Adding/Editing Hero Banner
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [slideBadgeBn, setSlideBadgeBn] = useState('');
  const [slideBadgeEn, setSlideBadgeEn] = useState('');
  const [slideTitleBn, setSlideTitleBn] = useState('');
  const [slideTitleEn, setSlideTitleEn] = useState('');
  const [slideDescBn, setSlideDescBn] = useState('');
  const [slideDescEn, setSlideDescEn] = useState('');
  const [slideCtaLink, setSlideCtaLink] = useState('/catalog');
  const [slideCtaTextBn, setSlideCtaTextBn] = useState('এখনই কেনাকাটা করুন');
  const [slideCtaTextEn, setSlideCtaTextEn] = useState('Shop Now');
  const [slideBgColor, setSlideBgColor] = useState('bg-[#0B6E4F]');

  // Load config
  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.config) {
          setConfig(data.config);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSaveGeneralConfig = async () => {
    if (!config) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          announcement: config.announcement,
          flashSale: config.flashSale,
          promoCards: config.promoCards,
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {
      alert('সংরক্ষণ ব্যর্থ হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  const handleOpenAddSlide = () => {
    setEditingSlide(null);
    setSlideBadgeBn('🎉 নতুন বিশেষ মেগা অফার');
    setSlideBadgeEn('Special Mega Offer');
    setSlideTitleBn('বই, গ্যাজেট ও লাইফস্টাইলের বিশাল আয়োজন');
    setSlideTitleEn('Books, Gadgets & Lifestyle under one roof');
    setSlideDescBn('সেরা ব্র্যান্ডের আকর্ষণীয় পণ্যে সর্বোচ্চ ৫০% পর্যন্ত বিশেষ ছাড়!');
    setSlideDescEn('Get up to 50% discount on all top collection items!');
    setSlideCtaLink('/catalog');
    setSlideCtaTextBn('এখনই কিনুন');
    setSlideCtaTextEn('Shop Now');
    setSlideBgColor('bg-[#0B6E4F]');
    setShowSlideModal(true);
  };

  const handleOpenEditSlide = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setSlideBadgeBn(slide.badge_bn);
    setSlideBadgeEn(slide.badge_en);
    setSlideTitleBn(slide.title_bn);
    setSlideTitleEn(slide.title_en);
    setSlideDescBn(slide.desc_bn);
    setSlideDescEn(slide.desc_en);
    setSlideCtaLink(slide.cta_link);
    setSlideCtaTextBn(slide.cta_text_bn);
    setSlideCtaTextEn(slide.cta_text_en);
    setSlideBgColor(slide.bg_color);
    setShowSlideModal(true);
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideTitleBn.trim()) return;

    const slideData: Omit<HeroSlide, 'id'> = {
      badge_bn: slideBadgeBn,
      badge_en: slideBadgeEn || slideBadgeBn,
      title_bn: slideTitleBn,
      title_en: slideTitleEn || slideTitleBn,
      desc_bn: slideDescBn,
      desc_en: slideDescEn || slideDescBn,
      cta_link: slideCtaLink,
      cta_text_bn: slideCtaTextBn,
      cta_text_en: slideCtaTextEn,
      bg_color: slideBgColor,
      accent_color: 'text-[#F4A300]',
      is_active: true,
    };

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: editingSlide ? 'update_slide' : 'add_slide',
          slideId: editingSlide?.id,
          slideData,
        }),
      });

      const data = await res.json();
      if (res.ok && data.slide) {
        if (config) {
          const updatedSlides = editingSlide
            ? config.heroSlides.map((s) => (s.id === editingSlide.id ? data.slide : s))
            : [...config.heroSlides, data.slide];
          setConfig({ ...config, heroSlides: updatedSlides });
        }
        setShowSlideModal(false);
      }
    } catch {
      alert('স্লাইড সংরক্ষণ ব্যর্থ হয়েছে');
    }
  };

  const handleDeleteSlide = async (id: string) => {
    if (!confirm('আপনি কি এই স্লাইডটি ডিলিট করতে চান?')) return;
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_slide', slideId: id }),
      });
      if (res.ok && config) {
        setConfig({
          ...config,
          heroSlides: config.heroSlides.filter((s) => s.id !== id),
        });
      }
    } catch {
      alert('ডিলিট ব্যর্থ হয়েছে');
    }
  };

  if (loading || !config) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-xs text-gray-500">
        লোডিং হচ্ছে...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header & Global Save Bar */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">হোমপেজ অ্যানাউন্সমেন্ট ও ব্যানার ডিজাইন</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#0B6E4F]">
              মার্কেটিং কন্ট্রোল
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            রকমারি-স্টাইল টপ নোটিশ বার, হিরো ব্যানার স্লাইডার এবং সাইড প্রোমো অ্যাড ডিজাইন পরিবর্তন করুন
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>সফলভাবে সেভ হয়েছে!</span>
            </span>
          )}

          <button
            onClick={handleSaveGeneralConfig}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তনসমূহ সেভ করুন'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Bar Announcement Editor */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0B6E4F] flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">টপ অ্যানাউন্সমেন্ট ও হেল্পলাইন বার</h3>
              <p className="text-[11px] text-gray-500">ওয়েবসাইটের একদম ওপরে সবুজ স্ট্রিপে প্রদর্শিত বার্তা</p>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-gray-700">
            <input
              type="checkbox"
              checked={config.announcement.enabled}
              onChange={(e) =>
                setConfig({
                  ...config,
                  announcement: { ...config.announcement, enabled: e.target.checked },
                })
              }
              className="w-4 h-4 text-[#0B6E4F] rounded focus:ring-0"
            />
            <span>অ্যানাউন্সমেন্ট সক্রিয় রাখুন</span>
          </label>
        </div>

        {/* Live Preview Strip */}
        <div className="bg-[#0B6E4F] text-white text-xs py-2 px-3.5 rounded-lg flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#F4A300]">📞</span>
            <span className="font-bold">হেল্পলাইন: {config.announcement.helpline}</span>
            <span className="opacity-40">|</span>
            <span className="truncate">{config.announcement.text_bn}</span>
          </div>
          <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded shrink-0">
            লাইভ প্রিভিউ
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">অ্যানাউন্সমেন্ট টেক্সট (বাংলা)</label>
            <input
              type="text"
              value={config.announcement.text_bn}
              onChange={(e) =>
                setConfig({
                  ...config,
                  announcement: { ...config.announcement, text_bn: e.target.value },
                })
              }
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#0B6E4F]"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">অ্যানাউন্সমেন্ট টেক্সট (English)</label>
            <input
              type="text"
              value={config.announcement.text_en}
              onChange={(e) =>
                setConfig({
                  ...config,
                  announcement: { ...config.announcement, text_en: e.target.value },
                })
              }
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#0B6E4F]"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">হেল্পলাইন ফোন নম্বর</label>
            <input
              type="text"
              value={config.announcement.helpline}
              onChange={(e) =>
                setConfig({
                  ...config,
                  announcement: { ...config.announcement, helpline: e.target.value },
                })
              }
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#0B6E4F]"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">ফ্রি ডেলিভারির নূন্যতম অর্ডার (৳)</label>
            <input
              type="number"
              value={config.announcement.free_delivery_min}
              onChange={(e) =>
                setConfig({
                  ...config,
                  announcement: {
                    ...config.announcement,
                    free_delivery_min: parseInt(e.target.value) || 0,
                  },
                })
              }
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#0B6E4F]"
            />
          </div>
        </div>
      </div>

      {/* 3. Hero Slider Banner Manager */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>হোমপেজ হিরো ব্যানার স্লাইডার ({config.heroSlides.length}টি স্লাইড)</span>
            </h3>
            <p className="text-[11px] text-gray-500">হোমপেজের মূল আকর্ষণীয় অফার ও ক্যাম্পেইন স্লাইডসমূহ</p>
          </div>

          <button
            onClick={handleOpenAddSlide}
            className="px-3.5 py-1.5 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ নতুন স্লাইড ব্যানার</span>
          </button>
        </div>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {config.heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`rounded-xl p-4 text-white ${slide.bg_color} shadow-xs flex flex-col justify-between min-h-[220px] relative overflow-hidden group`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold backdrop-blur-xs">
                    {slide.badge_bn}
                  </span>
                  <div className="flex items-center gap-1 bg-black/20 rounded p-1">
                    <button
                      onClick={() => handleOpenEditSlide(slide)}
                      className="p-1 hover:text-[#F4A300] transition-colors"
                      title="এডিট"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="p-1 hover:text-red-400 transition-colors"
                      title="ডিলিট"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="font-extrabold text-sm mb-1.5 line-clamp-2">{slide.title_bn}</h4>
                <p className="text-[11px] text-gray-100 line-clamp-2 leading-relaxed">
                  {slide.desc_bn}
                </p>
              </div>

              <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs mt-3">
                <span className="text-[10px] bg-[#F4A300] text-gray-900 font-bold px-2.5 py-1 rounded">
                  {slide.cta_text_bn}
                </span>
                <span className="text-[10px] font-mono opacity-80">{slide.cta_link}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Homepage Promotional Side Banners */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-4">
        <div>
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>হোমপেজ সাইড প্রোমো অ্যাড কার্ড (Side Promotional Ads)</span>
          </h3>
          <p className="text-[11px] text-gray-500">
            রকমারি-স্টাইলে হিরো ব্যানারের নিচে প্রদর্শিত ২টি দ্রুত অফার বক্স
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {config.promoCards.map((promo, idx) => (
            <div key={promo.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-3">
              <div className="flex items-center justify-between">
                <strong className="text-gray-900 font-bold">প্রোমো কার্ড #{idx + 1}</strong>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-gray-700 border">
                  ডিপার্টমেন্ট: {promo.department}
                </span>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">কার্ড শিরোনাম (বাংলা)</label>
                <input
                  type="text"
                  value={promo.title_bn}
                  onChange={(e) => {
                    const updated = [...config.promoCards];
                    updated[idx].title_bn = e.target.value;
                    setConfig({ ...config, promoCards: updated });
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">সাবটাইটেল / বিবরণ</label>
                <input
                  type="text"
                  value={promo.desc_bn}
                  onChange={(e) => {
                    const updated = [...config.promoCards];
                    updated[idx].desc_bn = e.target.value;
                    setConfig({ ...config, promoCards: updated });
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">টার্গেট লিঙ্ক (URL)</label>
                <input
                  type="text"
                  value={promo.link}
                  onChange={(e) => {
                    const updated = [...config.promoCards];
                    updated[idx].link = e.target.value;
                    setConfig({ ...config, promoCards: updated });
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ADD / EDIT SLIDE MODAL */}
      {showSlideModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#0B6E4F]" />
                <span>{editingSlide ? 'স্লাইড ব্যানার সম্পাদনা' : 'নতুন স্লাইড ব্যানার যোগ করুন'}</span>
              </h3>
              <button
                onClick={() => setShowSlideModal(false)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Live Preview Inside Modal */}
            <div className={`p-4 rounded-xl text-white ${slideBgColor} mb-4 shadow-2xs`}>
              <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-bold mb-1.5 inline-block">
                {slideBadgeBn || 'অফার ব্যাজ'}
              </span>
              <h4 className="font-extrabold text-sm mb-1">{slideTitleBn || 'ব্যানার শিরোনাম'}</h4>
              <p className="text-[11px] text-gray-100 mb-2">{slideDescBn || 'ব্যানারের সংক্ষিপ্ত বিবরণ'}</p>
              <button
                type="button"
                className="px-3 py-1 bg-[#F4A300] text-gray-900 font-bold text-[10px] rounded"
              >
                {slideCtaTextBn || 'এখনই কিনুন'}
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">কালার থিম ব্যাকগ্রাউন্ড</label>
                <select
                  value={slideBgColor}
                  onChange={(e) => setSlideBgColor(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 font-semibold text-gray-800 outline-none focus:border-[#0B6E4F]"
                >
                  {BG_COLOR_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">ব্যাজ টেক্সট (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={slideBadgeBn}
                    onChange={(e) => setSlideBadgeBn(e.target.value)}
                    placeholder="যেমন: 🎉 বিশেষ বৈশাখী মেগা অফার"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">ব্যাজ টেক্সট (English)</label>
                  <input
                    type="text"
                    value={slideBadgeEn}
                    onChange={(e) => setSlideBadgeEn(e.target.value)}
                    placeholder="e.g. Special Mega Offer"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">ব্যানার মূল শিরোনাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={slideTitleBn}
                  onChange={(e) => setSlideTitleBn(e.target.value)}
                  placeholder="যেমন: বই ও গ্যাজেটের সেরা কালেকশন"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 font-bold outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">ব্যানার বিবরণ (বাংলা)</label>
                <textarea
                  rows={2}
                  value={slideDescBn}
                  onChange={(e) => setSlideDescBn(e.target.value)}
                  placeholder="আকর্ষণীয় অফারের সংক্ষিপ্ত বিবরণ..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">বাটন টেক্সট</label>
                  <input
                    type="text"
                    value={slideCtaTextBn}
                    onChange={(e) => setSlideCtaTextBn(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">বাটন লিঙ্ক (URL)</label>
                  <input
                    type="text"
                    value={slideCtaLink}
                    onChange={(e) => setSlideCtaLink(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 outline-none focus:border-[#0B6E4F]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowSlideModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold transition-colors shadow-xs"
                >
                  স্লাইড সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

