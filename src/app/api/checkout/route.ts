import { NextRequest, NextResponse } from 'next/server';
import { createOrder, validateCoupon } from '@/lib/data/storeService';
import { calculateDeliveryFee } from '@/lib/data/bangladeshLocations';
import { getPaymentProvider } from '@/lib/payments';
import { sendOrderConfirmationEmail } from '@/lib/email/resend';
import { OrderItem, PaymentMethod } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_division,
      shipping_district,
      shipping_upazila,
      shipping_street_address,
      payment_method = 'cod',
      coupon_code,
      notes,
      items,
    } = body;

    // Validation
    if (!customer_name || !customer_phone || !shipping_division || !shipping_district || !shipping_street_address) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required delivery details' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Cart items cannot be empty' },
        { status: 400 }
      );
    }

    // Calculate subtotal
    const orderItems: OrderItem[] = items.map((item: any) => ({
      book_id: item.book.id,
      book_title: item.book.title,
      book_title_bn: item.book.title_bn,
      book_cover_url: item.book.cover_url,
      unit_price: item.book.discount_price ?? item.book.price,
      quantity: item.quantity,
      total_price: (item.book.discount_price ?? item.book.price) * item.quantity,
    }));

    const subtotal = orderItems.reduce((sum, item) => sum + item.total_price, 0);

    // Validate coupon if provided
    let discountAmount = 0;
    if (coupon_code) {
      const couponRes = await validateCoupon(coupon_code, subtotal);
      if (couponRes.valid) {
        discountAmount = couponRes.discount;
      }
    }

    // Calculate delivery fee
    const deliveryFee = calculateDeliveryFee(shipping_division, shipping_district, subtotal);

    // Create the order
    const order = await createOrder(
      {
        customer_name,
        customer_email,
        customer_phone,
        shipping_division,
        shipping_district,
        shipping_upazila,
        shipping_street_address,
        payment_method: payment_method as PaymentMethod,
        coupon_code,
        discount_amount: discountAmount,
        delivery_fee: deliveryFee,
        notes,
      },
      orderItems
    );

    // Execute Payment Provider session initiation
    const provider = getPaymentProvider(payment_method as PaymentMethod);
    const paymentResult = await provider.initiatePayment(order);

    // Send asynchronous email confirmation (non-blocking)
    if (customer_email) {
      sendOrderConfirmationEmail(order).catch((err) => {
        console.error('Email sending error:', err);
      });
    }

    return NextResponse.json({
      success: true,
      order,
      paymentResult,
    });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    );
  }
}

