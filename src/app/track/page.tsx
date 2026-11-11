'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/context/LanguageContext';
import { Order, OrderStatus } from '@/types';
import {
  Truck,
  Search,
  CheckCircle2,
  Package,
  Clock,
  MapPin,
  AlertCircle,
  FileText,
} from 'lucide-react';

const STATUS_STEPS: { key: OrderStatus; labelBn: string; labelEn: string }[] = [
  { key: 'pending', labelBn: 'অপেক্ষমাণ', labelEn: 'Pending' },
  { key: 'confirmed', labelBn: 'নিশ্চিত', labelEn: 'Confirmed' },
  { key: 'processing', labelBn: 'প্যাকিং চলছে', labelEn: 'Processing' },
  { key: 'shipped', labelBn: 'কুরিয়ারে আছে', labelEn: 'Shipped' },
  { key: 'delivered', labelBn: 'ডেলিভার্ড', labelEn: 'Delivered' },
];

function TrackContent() {
  const searchParams = useSearchParams();
  const initialOrderNo = searchParams.get('orderNumber') || '';

  const { lang, t, formatPrice, formatDate } = useLanguage();

  const [orderNumber, setOrderNumber] = useState(initialOrderNo);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTracking = async (ordNo: string, ph?: string) => {
    if (!ordNo.trim()) return;

    setLoading(true);
    setError(null);

    try {
      let url = `/api/track?orderNumber=${encodeURIComponent(ordNo.trim())}`;
      if (ph) {
        url += `&phone=${encodeURIComponent(ph.trim())}`;
      }
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || t.tracking.orderNotFound);
        setOrder(null);
      } else {
        setOrder(data.order);
      }
    } catch {
      setError(t.tracking.orderNotFound);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNo) {
      fetchTracking(initialOrderNo);
    }
  }, [initialOrderNo]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(orderNumber, phone);
  };

  const getStepIndex = (status: OrderStatus) => {
    if (status === 'cancelled') return -1;
    return STATUS_STEPS.findIndex((s) => s.key === status);
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#0B6E4F] text-[#F4A300] flex items-center justify-center mx-auto mb-3 shadow-md">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
          {t.tracking.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.tracking.subtitle}</p>
      </div>

      {/* Tracking Search Input Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm mb-8">
        <form onSubmit={handleTrackSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {lang === 'bn' ? 'অর্ডার নম্বর' : 'Order Number'}
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                placeholder="PTG-XXXXX"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs uppercase outline-none focus:border-[#0B6E4F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {lang === 'bn' ? 'মোবাইল নম্বর (ঐচ্ছিক)' : 'Mobile Number (Optional)'}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01712345678"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#0B6E4F]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !orderNumber.trim()}
            className="w-full py-2.5 px-4 rounded-xl bg-[#0B6E4F] hover:bg-[#074D37] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'অনুসন্ধান চলছে...' : t.tracking.trackButton}</span>
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 mb-8">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tracking Details Display */}
      {order && (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-8 shadow-sm space-y-8">
          {/* Top Order Status Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400">ORDER:</span>
                <span className="text-xl font-extrabold text-[#0B6E4F]">
                  {order.order_number}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.tracking.orderDate} {formatDate(order.created_at)}
              </p>
            </div>

            <div className="px-3.5 py-1.5 rounded-full text-xs font-bold capitalize bg-[#E8F5EE] text-[#0B6E4F]">
              {order.status === 'pending' && t.tracking.statusPending}
              {order.status === 'confirmed' && t.tracking.statusConfirmed}
              {order.status === 'processing' && t.tracking.statusProcessing}
              {order.status === 'shipped' && t.tracking.statusShipped}
              {order.status === 'delivered' && t.tracking.statusDelivered}
              {order.status === 'cancelled' && t.tracking.statusCancelled}
            </div>
          </div>

          {/* Stepper Progress Bar */}
          {order.status !== 'cancelled' ? (
            <div>
              <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 w-full z-0" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#0B6E4F] transition-all duration-500 z-0"
                  style={{
                    width: `${(Math.max(0, currentStepIdx) / (STATUS_STEPS.length - 1)) * 100}%`,
                  }}
                />

                {STATUS_STEPS.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;
                  return (
                    <div
                      key={step.key}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone
                            ? 'bg-[#0B6E4F] text-white shadow-md'
                            : 'bg-gray-200 text-gray-500'
                        } ${isCurrent ? 'ring-4 ring-[#E8F5EE]' : ''}`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] mt-2 whitespace-nowrap font-medium ${
                          isDone ? 'text-[#0B6E4F] font-bold' : 'text-gray-400'
                        }`}
                      >
                        {lang === 'bn' ? step.labelBn : step.labelEn}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg font-semibold">
              ⚠️ {lang === 'bn' ? 'এই অর্ডারটি বাতিল করা হয়েছে।' : 'This order has been cancelled.'}
            </div>
          )}

          {/* Tracking Note */}
          {order.tracking_notes && (
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs">
              <span className="font-bold text-[#0B6E4F] block mb-0.5">
                {lang === 'bn' ? 'কুরিয়ার / ট্র্যাকিং নোট:' : 'Courier / Tracking Note:'}
              </span>
              <p className="text-gray-700">{order.tracking_notes}</p>
            </div>
          )}

          {/* Delivery Address & Customer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <span className="font-bold text-gray-700 block mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0B6E4F]" />
                <span>{t.tracking.deliveryTo}</span>
              </span>
              <p className="font-semibold text-gray-800">{order.customer_name}</p>
              <p className="text-gray-500">{order.shipping_street_address}</p>
              <p className="text-gray-500">
                {order.shipping_upazila}, {order.shipping_district}, {order.shipping_division}
              </p>
              <p className="text-gray-600 mt-1 font-medium">মোবাইল: {order.customer_phone}</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <span className="font-bold text-gray-700 block mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#0B6E4F]" />
                <span>{lang === 'bn' ? 'পেমেন্ট সারাংশ' : 'Payment Summary'}</span>
              </span>
              <div className="space-y-1 text-gray-600">
                <div className="flex justify-between">
                  <span>পদ্ধতি:</span>
                  <span className="font-semibold">{order.payment_method.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>স্ট্যাটাস:</span>
                  <span className="font-semibold capitalize">{order.payment_status}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 pt-1 border-t border-gray-200">
                  <span>সর্বমোট:</span>
                  <span className="text-[#0B6E4F]">{formatPrice(order.total_amount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Items List */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
              {t.tracking.itemsOrdered} ({order.items?.length || 0})
            </h4>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="p-3 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base">📖</span>
                    <span className="font-medium text-gray-800 truncate">
                      {lang === 'bn' ? item.book_title_bn : item.book_title}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-gray-500">
                      {item.quantity} × {formatPrice(item.unit_price)} ={' '}
                    </span>
                    <span className="font-bold text-gray-800">
                      {formatPrice(item.total_price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F5F7]">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <Suspense fallback={<div className="p-8 text-center text-xs">লোড হচ্ছে...</div>}>
          <TrackContent />
        </Suspense>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

