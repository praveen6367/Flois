import { ShopifyMoney, ShopifyImage } from './shopify';
import { ProductVariant } from './product';

export interface CartAttribute {
  key: string;
  value: string;
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
    amountPerQuantity: ShopifyMoney;
    compareAtAmountPerQuantity?: ShopifyMoney | null;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: { name: string; value: string }[];
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage?: ShopifyImage | null;
    };
    price: ShopifyMoney;
    compareAtPrice?: ShopifyMoney | null;
    image?: ShopifyImage | null;
  };
  attributes: CartAttribute[];
}

export interface CartCost {
  totalAmount: ShopifyMoney;
  subtotalAmount: ShopifyMoney;
  totalTaxAmount?: ShopifyMoney | null;
  totalDutyAmount?: ShopifyMoney | null;
  checkoutUrl?: string;
}

export interface CartDiscountCode {
  code: string;
  applicable: boolean;
}

export interface CartBuyerIdentity {
  email?: string | null;
  phone?: string | null;
  customerAccessToken?: string | null;
  countryCode?: string | null;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: CartCost;
  discountCodes: CartDiscountCode[];
  attributes: CartAttribute[];
  buyerIdentity?: CartBuyerIdentity | null;
  note?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
  attributes?: CartAttribute[];
}

export interface CartLineUpdateInput {
  id: string;
  quantity: number;
  attributes?: CartAttribute[];
}
