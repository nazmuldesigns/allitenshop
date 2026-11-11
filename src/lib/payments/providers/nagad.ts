import { Order } from '@/types';
import { PaymentProvider, PaymentSessionResult, PaymentVerificationResult } from '../types';

export class NagadProvider implements PaymentProvider {
  id = 'nagad' as const;
  name = 'Nagad Digital Payment';
  name_bn = 'নগদ ডিজিটাল পেমেন্ট';
  description = 'Pay with your Nagad account balance';
  description_bn = 'নগদ অ্যাপ বা ইউএসএসডি দিয়ে দ্রুত পেমেন্ট করুন';
  iconName = 'CreditCard';
  isEnabled = Boolean(process.env.NAGAD_MERCHANT_ID && process.env.NAGAD_PUBLIC_KEY);

  async initiatePayment(order: Order): Promise<PaymentSessionResult> {
    if (!this.isEnabled) {
      return {
        success: false,
        requiresClientRedirect: false,
        errorMessage: 'Nagad merchant credentials not configured. Please use Cash on Delivery.',
      };
    }

    return {
      success: true,
      redirectUrl: `https://api.mynagad.com/pay?order=${order.order_number}`,
      requiresClientRedirect: true,
    };
  }

  async verifyCallback(data: unknown): Promise<PaymentVerificationResult> {
    const payload = data as { payment_ref_id?: string; status?: string };
    return {
      isVerified: payload?.status === 'Success',
      paymentMethod: 'nagad',
      transactionId: payload?.payment_ref_id,
    };
  }
}

