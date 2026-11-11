import { NextRequest, NextResponse } from 'next/server';
import { getOrderByIdOrNumber } from '@/lib/data/storeService';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderNumber = searchParams.get('orderNumber');
    const phone = searchParams.get('phone') || undefined;

    if (!orderNumber) {
      return NextResponse.json({ success: false, message: 'Order number is required' }, { status: 400 });
    }

    const order = await getOrderByIdOrNumber(orderNumber, phone);

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Tracking failed' },
      { status: 500 }
    );
  }
}

