import { Order } from '@/types';
import { PaymentProvider, PaymentSessionResult, PaymentVerificationResult } from '../types';

export class BkashProvider implements PaymentProvider {
  id = 'bkash' as const;
  name = 'bKash Online Payment';
  name_bn = 'বিকাশ অনলাইন পেমেন্ট';
  description = 'Fast & secure mobile payment via bKash gateway';
  description_bn = 'বিকাশ ওয়ালেট বা পিন দিয়ে সহজে পেমেন্ট করুন';
  iconName = 'Smartphone';
  isEnabled = Boolean(process.env.BKASH_APP_KEY && process.env.BKASH_APP_SECRET);

  async initiatePayment(order: Order): Promise<PaymentSessionResult> {
    // When credentials are not yet configured in env, indicate ready for gateway
    if (!this.isEnabled) {
      return {
        success: false,
        requiresClientRedirect: false,
        errorMessage: 'bKash credentials not configured. Please use Cash on Delivery.',
      };
    }

    try {
      // Structure ready for bKash Checkout URL generation
      // POST to https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create
      return {
        success: true,
        redirectUrl: `https://sandbox.bka.sh/checkout?order=${order.order_number}&amount=${order.total_amount}`,
        requiresClientRedirect: true,
      };
    } catch (err: unknown) {
      return {
        success: false,
        requiresClientRedirect: false,
        errorMessage: err instanceof Error ? err.message : 'bKash initiation failed',
      };
    }
  }

  async verifyCallback(data: unknown): Promise<PaymentVerificationResult> {
    const payload = data as { paymentID?: string; status?: string };
    if (payload?.status === 'success') {
      return {
        isVerified: true,
        paymentMethod: 'bkash',
        transactionId: payload.paymentID,
      };
    }
    return {
      isVerified: false,
      paymentMethod: 'bkash',
      errorMessage: 'bKash payment failed or cancelled',
    };
  }
}

