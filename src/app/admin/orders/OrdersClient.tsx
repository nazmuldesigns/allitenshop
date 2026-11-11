'use client';

import React, { useState } from 'react';
import { Order, OrderStatus } from '@/types';
import OrderStatusSelect from '../OrderStatusSelect';
import { Search, Filter, Truck, MapPin, Eye, Phone, Calendar } from 'lucide-react';

interface OrdersClientProps {
  initialOrders: Order[];
}

export default function OrdersClient({ initialOrders }: OrdersClientProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleExportCourierCsv = () => {
    const headers = ['Invoice', 'Recipient_Name', 'Recipient_Phone', 'Address', 'Thana_Upazila', 'District', 'COD_Amount', 'Note'];
    const rows = filteredOrders.map((o) => [
      `"${o.order_number}"`,
      `"${o.customer_name}"`,
      `"${o.customer_phone}"`,
      `"${o.shipping_street_address}"`,
      `"${o.shipping_upazila}"`,
      `"${o.shipping_district}"`,
      o.total_amount,
      `"${o.notes || 'Handle with care'}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `courier_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">অর্ডার ব্যবস্থাপনা (Order Management)</h1>
          <p className="text-xs text-slate-500 mt-1">
            মোট {orders.length}টি অর্ডার পাওয়া গেছে
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Courier Export Button */}
          <button
            onClick={handleExportCourierCsv}
            className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#0B6E4F] border border-[#0B6E4F]/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            title="Download CSV formatted for Pathao / Steadfast / RedX courier bulk upload"
          >
            <Truck className="w-4 h-4" />
            <span>কুরিয়ার CSV এক্সপোর্ট</span>
          </button>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="অর্ডার নং, নাম বা ফোন..."
              className="w-full bg-white border border-slate-300 rounded-xl py-2 pl-9 pr-3 text-xs outline-none focus:border-[#0B6E4F]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { key: 'all', label: 'সকল অর্ডার' },
          { key: 'pending', label: 'অপেক্ষমাণ (Pending)' },
          { key: 'confirmed', label: 'নিশ্চিত (Confirmed)' },
          { key: 'processing', label: 'প্যাকিং (Processing)' },
          { key: 'shipped', label: 'কুরিয়ারে (Shipped)' },
          { key: 'delivered', label: 'ডেলিভার্ড (Delivered)' },
          { key: 'cancelled', label: 'বাতিল (Cancelled)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              statusFilter === tab.key
                ? 'bg-[#0B6E4F] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">অর্ডার নং</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">ক্রেতার তথ্য</th>
                <th className="py-3 px-4">ডেলিভারি ঠিকানা</th>
                <th className="py-3 px-4">বই সংখ্যা</th>
                <th className="py-3 px-4">মোট টাকা</th>
                <th className="py-3 px-4">পেমেন্ট</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    কোনো অর্ডার পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#0B6E4F]">
                      {ord.order_number}
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(ord.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{ord.customer_name}</div>
                      <div className="text-[11px] text-slate-400">{ord.customer_phone}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>{ord.shipping_district}, {ord.shipping_division}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                        {ord.shipping_street_address}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {ord.items?.length || 1}টি বই
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      ৳{ord.total_amount}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                        {ord.payment_method}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <OrderStatusSelect orderId={ord.id} initialStatus={ord.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0B6E4F] hover:text-white transition-colors"
                        title="অর্ডার বিস্তারিত"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  অর্ডার: {selectedOrder.order_number}
                </h3>
                <p className="text-xs text-slate-400">
                  তারিখ: {new Date(selectedOrder.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-700 block mb-1">গ্রাহকের বিবরণ:</span>
                <p>নাম: <strong>{selectedOrder.customer_name}</strong></p>
                <p>ফোন: <strong>{selectedOrder.customer_phone}</strong></p>
                {selectedOrder.customer_email && <p>ইমেইল: {selectedOrder.customer_email}</p>}
                <p className="mt-1">
                  ঠিকানা: {selectedOrder.shipping_street_address}, {selectedOrder.shipping_upazila},{' '}
                  {selectedOrder.shipping_district}, {selectedOrder.shipping_division}
                </p>
                {selectedOrder.notes && (
                  <p className="text-amber-700 mt-1">নোট: {selectedOrder.notes}</p>
                )}
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-2">অর্ডারকৃত বইসমূহ:</span>
                <div className="space-y-2 border rounded-xl p-3 divide-y">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="pt-1.5 first:pt-0 flex justify-between">
                      <div>
                        <div className="font-semibold text-slate-800">{item.book_title_bn}</div>
                        <div className="text-[10px] text-slate-400">
                          {item.quantity} × ৳{item.unit_price}
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">৳{item.total_price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3 space-y-1 font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>উপমোট:</span>
                  <span>৳{selectedOrder.subtotal}</span>
                </div>
                {selectedOrder.discount_amount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>ডিসকাউন্ট:</span>
                    <span>-৳{selectedOrder.discount_amount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span>৳{selectedOrder.delivery_fee}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t">
                  <span>সর্বমোট:</span>
                  <span className="text-[#0B6E4F]">৳{selectedOrder.total_amount}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`/orders/${selectedOrder.order_number}/invoice`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-[#0B6E4F] hover:bg-[#074D37] text-white text-xs font-bold rounded-xl text-center shadow-sm"
              >
                🖨️ চালান প্রিন্ট করুন (Invoice)
              </a>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

