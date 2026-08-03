import { ShopifyMoney, ShopifyConnection } from './shopify';

export interface MailingAddress {
  id: string;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  company?: string | null;
  country?: string | null;
  countryCodeV2?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  province?: string | null;
  provinceCode?: string | null;
  zip?: string | null;
  formatted?: string[];
}

export interface CustomerOrderLineItem {
  title: string;
  quantity: number;
  variantTitle?: string | null;
  originalTotalPrice: ShopifyMoney;
}

export interface CustomerOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus?: string | null;
  fulfillmentStatus: string;
  currentTotalPrice: ShopifyMoney;
  subtotalPrice?: ShopifyMoney | null;
  totalTax?: ShopifyMoney | null;
  totalShippingPrice?: ShopifyMoney | null;
  lineItems: ShopifyConnection<CustomerOrderLineItem>;
  shippingAddress?: MailingAddress | null;
}

export interface Customer {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  acceptsMarketing: boolean;
  defaultAddress?: MailingAddress | null;
  addresses: ShopifyConnection<MailingAddress>;
  orders: ShopifyConnection<CustomerOrder>;
}

export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}
