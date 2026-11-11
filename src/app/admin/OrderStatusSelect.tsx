'use client';

import React, { useState } from 'react';
import { OrderStatus } from '@/types';

interface OrderStatusSelectProps {
  orderId: string;
  initialStatus: OrderStatus;
}

export default function OrderStatusSelect({
  orderId,
  initialStatus,
}: OrderStatusSelectProps) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus as OrderStatus);
      }
    } catch {
      // Revert on error
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (s: OrderStatus) => {
    switch (s) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'processing':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) => handleStatusChange(e.target.value)}
      className={`text-xs font-bold rounded-lg px-2.5 py-1 border outline-none cursor-pointer ${getStatusColor(
        status
      )} ${loading ? 'opacity-50' : ''}`}
    >
      <option value="pending">⏳ Pending (অপেক্ষমাণ)</option>
      <option value="confirmed">👍 Confirmed (নিশ্চিত)</option>
      <option value="processing">📦 Processing (প্যাকিং)</option>
      <option value="shipped">🚚 Shipped (কুরিয়ারে)</option>
      <option value="delivered">✅ Delivered (সম্পন্ন)</option>
      <option value="cancelled">❌ Cancelled (বাতিল)</option>
    </select>
  );
}

