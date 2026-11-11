import { NextRequest, NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/data/storeService';

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = await req.json();
    if (!code) {
      return NextResponse.json({ valid: false, message: 'Coupon code is required' }, { status: 400 });
    }

    const result = await validateCoupon(code, Number(subtotal) || 0);
    return NextResponse.json(result);
  } catch (error: unknown) {
    return NextResponse.json(
      { valid: false, message: error instanceof Error ? error.message : 'Validation failed' },
      { status: 500 }
    );
  }
}

