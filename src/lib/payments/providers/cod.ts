import { Order } from '@/types';
import { PaymentProvider, PaymentSessionResult, PaymentVerificationResult } from '../types';

export class CashOnDeliveryProvider implements PaymentProvider {
  id = 'cod' as const;
  name = 'Cash on Delivery';
  name_bn = 'ক্যাশ অন ডেলিভারি';
  description = 'Pay cash when your parcel is delivered to your doorstep';
  description_bn = 'বই হাতে পেয়ে ডেলিভারিম্যানকে মূল্য পরিশোধ করুন';
  iconName = 'Truck';
  isEnabled = true;

  async initiatePayment(order: Order): Promise<PaymentSessionResult> {
    return {
      success: true,
      transactionId: `COD-${order.order_number}`,
      requiresClientRedirect: false,
    };
  }

  async verifyCallback(): Promise<PaymentVerificationResult> {
    return {
      isVerified: true,
      paymentMethod: 'cod',
    };
  }
}

