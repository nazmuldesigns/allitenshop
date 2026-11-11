import { PaymentMethod } from '@/types';
import { BkashProvider } from './providers/bkash';
import { CashOnDeliveryProvider } from './providers/cod';
import { NagadProvider } from './providers/nagad';
import { SslCommerzProvider } from './providers/sslcommerz';
import { PaymentProvider } from './types';

const cod = new CashOnDeliveryProvider();
const bkash = new BkashProvider();
const nagad = new NagadProvider();
const sslcommerz = new SslCommerzProvider();

const providers: Record<PaymentMethod, PaymentProvider> = {
  cod,
  bkash,
  nagad,
  sslcommerz,
};

export function getPaymentProvider(method: PaymentMethod): PaymentProvider {
  return providers[method] || providers.cod;
}

export function getAllPaymentProviders(): PaymentProvider[] {
  return Object.values(providers);
}

export * from './types';

