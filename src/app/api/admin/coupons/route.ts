import { NextRequest, NextResponse } from 'next/server';
import { addCoupon, deleteCoupon, getCoupons, updateCoupon } from '@/lib/data/storeService';

export async function GET() {
  try {
    const coupons = await getCoupons();
    return NextResponse.json({ success: true, coupons });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const coupon = await addCoupon(body);
    return NextResponse.json({ success: true, coupon });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to create coupon' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...updates } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, message: 'Coupon ID required' }, { status: 400 });
    }
    const coupon = await updateCoupon(id, updates);
    return NextResponse.json({ success: true, coupon });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to update coupon' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Coupon ID required' }, { status: 400 });
    }
    const ok = await deleteCoupon(id);
    return NextResponse.json({ success: ok });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to delete coupon' },
      { status: 500 }
    );
  }
}

