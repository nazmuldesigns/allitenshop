import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/data/storeService';
import { OrderStatus } from '@/types';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status, tracking_notes } = await req.json();

    if (!status) {
      return NextResponse.json({ success: false, message: 'Status is required' }, { status: 400 });
    }

    const updated = await updateOrderStatus(id, status as OrderStatus, tracking_notes);

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 }
    );
  }
}

