import React from 'react';
import { getAllOrders } from '@/lib/data/storeService';
import OrdersClient from './OrdersClient';

export const revalidate = 0; // Dynamic

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();
  return <OrdersClient initialOrders={orders} />;
}

