import { Order, PaymentMethod } from '@/types';

export interface PaymentSessionResult {
  success: boolean;
  redirectUrl?: string;
  transactionId?: string;
  errorMessage?: string;
  requiresClientRedirect: boolean;
}

export interface PaymentVerificationResult {
  isVerified: boolean;
  transactionId?: string;
  amountPaid?: number;
  paymentMethod: PaymentMethod;
  rawResponse?: unknown;
  errorMessage?: string;
}

export interface PaymentProvider {
  id: PaymentMethod;
  name: string;
  name_bn: string;
  description: string;
  description_bn: string;
  iconName: string;
  isEnabled: boolean;

  /**
   * Initializes or initiates the payment flow for an order
   */
  initiatePayment(order: Order): Promise<PaymentSessionResult>;

  /**
   * Verifies an incoming webhook or gateway callback
   */
  verifyCallback(data: unknown): Promise<PaymentVerificationResult>;
}

