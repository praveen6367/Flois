'use server';

import {
  loginCustomer,
  logoutCustomer,
  registerCustomer,
  forgotPassword,
  getCustomerProfile
} from '@/lib/shopify/customers';

export async function loginCustomerAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const token = await loginCustomer(email, password);
    return { success: true, token };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function registerCustomerAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = (formData.get('firstName') as string) || undefined;
  const lastName = (formData.get('lastName') as string) || undefined;

  try {
    const customer = await registerCustomer({ email, password, firstName, lastName });
    let token = null;
    try {
      token = await loginCustomer(email, password);
    } catch {
      // If login immediately after register fails, client will prompt manual login
    }
    return { success: true, customer, token };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logoutCustomerAction(customerAccessToken: string) {
  try {
    const success = await logoutCustomer(customerAccessToken);
    return { success };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get('email') as string;

  try {
    await forgotPassword(email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getCustomerProfileAction(customerAccessToken: string) {
  try {
    const customer = await getCustomerProfile(customerAccessToken);
    return { success: true, customer };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
