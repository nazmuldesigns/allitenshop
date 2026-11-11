import { Order } from '@/types';
import { PaymentProvider, PaymentSessionResult, PaymentVerificationResult } from '../types';

export class SslCommerzProvider implements PaymentProvider {
  id = 'sslcommerz' as const;
  name = 'SSLCommerz Gateway';
  name_bn = 'এসএসএল কমার্জ (কার্ড/মোবাইল ব্যাংকিং)';
  description = 'Pay via Visa, Mastercard, American Express, or Internet Banking';
  description_bn = 'ভিসা, মাস্টারকার্ড, ইন্টারনেট ব্যাংকিং দিয়ে পেমেন্ট করুন';
  iconName = 'Globe';
  isEnabled = Boolean(process.env.STORE_ID && process.env.STORE_PASSWORD);

  async initiatePayment(order: Order): Promise<PaymentSessionResult> {
    if (!this.isEnabled) {
      return {
        success: false,
        requiresClientRedirect: false,
        errorMessage: 'SSLCommerz credentials not configured. Please use Cash on Delivery.',
      };
    }

    return {
      success: true,
      redirectUrl: `https://sandbox.sslcommerz.com/easycheckout.php?tran_id=${order.order_number}`,
      requiresClientRedirect: true,
    };
  }

  async verifyCallback(data: unknown): Promise<PaymentVerificationResult> {
    const payload = data as { val_id?: string; status?: string; amount?: number };
    return {
      isVerified: payload?.status === 'VALID',
      paymentMethod: 'sslcommerz',
      transactionId: payload?.val_id,
      amountPaid: payload?.amount,
    };
  }
}

