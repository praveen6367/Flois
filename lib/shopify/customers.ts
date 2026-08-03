import { shopifyFetch } from './fetch';
import { Customer, CustomerAccessToken, CustomerOrder, MailingAddress } from '@/types/customer';

import { CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION } from '@/graphql/customer/access-token-create';
import { CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION } from '@/graphql/customer/access-token-renew';
import { CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION } from '@/graphql/customer/access-token-delete';
import { GET_CUSTOMER_QUERY } from '@/graphql/customer/get-customer';
import { CUSTOMER_CREATE_MUTATION } from '@/graphql/customer/customer-create';
import { CUSTOMER_RECOVER_MUTATION } from '@/graphql/customer/customer-recover';
import { CUSTOMER_RESET_MUTATION } from '@/graphql/customer/customer-reset';

function reshapeCustomer(customer: any): Customer {
  if (!customer) return null as any;

  return {
    ...customer,
    addresses: {
      edges: customer.addresses?.edges || [],
      nodes: customer.addresses?.edges?.map((e: any) => e.node) || [],
      pageInfo: customer.addresses?.pageInfo || { hasNextPage: false, hasPreviousPage: false }
    },
    orders: {
      edges: customer.orders?.edges || [],
      nodes: customer.orders?.edges?.map((e: any) => ({
        ...e.node,
        lineItems: {
          edges: e.node.lineItems?.edges || [],
          nodes: e.node.lineItems?.edges?.map((li: any) => li.node) || [],
          pageInfo: e.node.lineItems?.pageInfo || { hasNextPage: false, hasPreviousPage: false }
        }
      })) || [],
      pageInfo: customer.orders?.pageInfo || { hasNextPage: false, hasPreviousPage: false }
    }
  };
}

/**
 * Login customer and obtain customer access token.
 */
export async function loginCustomer(email: string, password: string): Promise<CustomerAccessToken> {
  const data = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken;
      customerUserErrors: any[];
    };
  }>({
    query: CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
    variables: { input: { email, password } },
    cache: 'no-store'
  });

  const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate;

  if (customerUserErrors && customerUserErrors.length > 0) {
    throw new Error(`[Customer Auth Error]: ${customerUserErrors[0].message}`);
  }

  return customerAccessToken;
}

/**
 * Renew customer access token.
 */
export async function refreshCustomerToken(customerAccessToken: string): Promise<CustomerAccessToken> {
  const data = await shopifyFetch<{
    customerAccessTokenRenew: {
      customerAccessToken: CustomerAccessToken;
      userErrors: any[];
    };
  }>({
    query: CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION,
    variables: { customerAccessToken },
    cache: 'no-store'
  });

  const { customerAccessToken: newToken, userErrors } = data.customerAccessTokenRenew;

  if (userErrors && userErrors.length > 0) {
    throw new Error(`[Token Refresh Error]: ${userErrors[0].message}`);
  }

  return newToken;
}

/**
 * Logout customer and invalidate access token.
 */
export async function logoutCustomer(customerAccessToken: string): Promise<boolean> {
  const data = await shopifyFetch<{
    customerAccessTokenDelete: {
      deletedAccessToken: string;
      userErrors: any[];
    };
  }>({
    query: CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION,
    variables: { customerAccessToken },
    cache: 'no-store'
  });

  return Boolean(data.customerAccessTokenDelete?.deletedAccessToken);
}

/**
 * Register a new customer.
 */
export async function registerCustomer(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  acceptsMarketing?: boolean;
}): Promise<{ id: string; email: string }> {
  const data = await shopifyFetch<{
    customerCreate: {
      customer: { id: string; email: string };
      customerUserErrors: any[];
    };
  }>({
    query: CUSTOMER_CREATE_MUTATION,
    variables: { input },
    cache: 'no-store'
  });

  const { customer, customerUserErrors } = data.customerCreate;

  if (customerUserErrors && customerUserErrors.length > 0) {
    throw new Error(`[Customer Register Error]: ${customerUserErrors[0].message}`);
  }

  return customer;
}

/**
 * Trigger forgot password email recovery.
 */
export async function forgotPassword(email: string): Promise<boolean> {
  const data = await shopifyFetch<{
    customerRecover: {
      customerUserErrors: any[];
    };
  }>({
    query: CUSTOMER_RECOVER_MUTATION,
    variables: { email },
    cache: 'no-store'
  });

  if (data.customerRecover?.customerUserErrors?.length > 0) {
    throw new Error(`[Forgot Password Error]: ${data.customerRecover.customerUserErrors[0].message}`);
  }

  return true;
}

/**
 * Reset customer password using reset URL token.
 */
export async function resetPassword(id: string, resetToken: string, password: string): Promise<CustomerAccessToken> {
  const data = await shopifyFetch<{
    customerReset: {
      customerAccessToken: CustomerAccessToken;
      customerUserErrors: any[];
    };
  }>({
    query: CUSTOMER_RESET_MUTATION,
    variables: { id, input: { resetToken, password } },
    cache: 'no-store'
  });

  const { customerAccessToken, customerUserErrors } = data.customerReset;

  if (customerUserErrors && customerUserErrors.length > 0) {
    throw new Error(`[Reset Password Error]: ${customerUserErrors[0].message}`);
  }

  return customerAccessToken;
}

/**
 * Get customer profile by token.
 */
export async function getCustomerProfile(customerAccessToken: string): Promise<Customer | null> {
  const data = await shopifyFetch<{ customer: any }>({
    query: GET_CUSTOMER_QUERY,
    variables: { customerAccessToken },
    cache: 'no-store'
  });

  return data.customer ? reshapeCustomer(data.customer) : null;
}

/**
 * Extract customer addresses.
 */
export function getCustomerAddresses(customer: Customer): MailingAddress[] {
  return customer.addresses?.nodes || customer.addresses?.edges?.map((e) => e.node) || [];
}

/**
 * Extract customer orders.
 */
export function getCustomerOrders(customer: Customer): CustomerOrder[] {
  return customer.orders?.nodes || customer.orders?.edges?.map((e) => e.node) || [];
}
