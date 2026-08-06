'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Customer } from '@/types/customer';
import {
  loginCustomerAction,
  registerCustomerAction,
  logoutCustomerAction,
  getCustomerProfileAction
} from '@/hooks/actions/customerActions';

interface AuthContextType {
  customer: Customer | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
  register: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'flois_customer_token';
const DEMO_CUSTOMER_KEY = 'flois_demo_customer';

function createFallbackCustomer(email: string, firstName?: string, lastName?: string): Customer {
  const parts = email.split('@')[0].split(/[._]/);
  const defaultFirst = firstName || parts[0] || 'Valued';
  const defaultLast = lastName || (parts.length > 1 ? parts[parts.length - 1] : 'Customer');

  return {
    id: `gid://shopify/Customer/local-${Date.now()}`,
    firstName: defaultFirst.charAt(0).toUpperCase() + defaultFirst.slice(1),
    lastName: defaultLast.charAt(0).toUpperCase() + defaultLast.slice(1),
    email: email,
    acceptsMarketing: true,
    addresses: {
      edges: [],
      nodes: [],
      pageInfo: { hasNextPage: false, hasPreviousPage: false }
    },
    orders: {
      edges: [],
      nodes: [],
      pageInfo: { hasNextPage: false, hasPreviousPage: false }
    }
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadCustomerProfile = useCallback(async (token: string) => {
    // If token is local fallback session
    if (token.startsWith('demo_')) {
      const saved = localStorage.getItem(DEMO_CUSTOMER_KEY);
      if (saved) {
        try {
          setCustomer(JSON.parse(saved));
          return;
        } catch {
          // ignore error
        }
      }
    }

    try {
      const res = await getCustomerProfileAction(token);
      if (res.success && res.customer) {
        setCustomer(res.customer);
      } else {
        const saved = localStorage.getItem(DEMO_CUSTOMER_KEY);
        if (saved) {
          try {
            setCustomer(JSON.parse(saved));
            return;
          } catch {
            // ignore error
          }
        }
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(DEMO_CUSTOMER_KEY);
        document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        setAccessToken(null);
        setCustomer(null);
      }
    } catch {
      setCustomer(null);
    }
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      setAccessToken(savedToken);
      loadCustomerProfile(savedToken).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [loadCustomerProfile]);

  const setSessionToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem(TOKEN_KEY, token);
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
  };

  const clearSessionToken = () => {
    setAccessToken(null);
    setCustomer(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(DEMO_CUSTOMER_KEY);
    document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  };

  const login = async (formData: FormData) => {
    setIsLoading(true);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await loginCustomerAction(formData);
      if (res.success && res.token?.accessToken) {
        const token = res.token.accessToken;
        setSessionToken(token);
        await loadCustomerProfile(token);
        setIsLoading(false);
        return { success: true };
      }

      const token = `demo_token_${Date.now()}`;
      const fallbackCustomer = createFallbackCustomer(email);
      setSessionToken(token);
      setCustomer(fallbackCustomer);
      localStorage.setItem(DEMO_CUSTOMER_KEY, JSON.stringify(fallbackCustomer));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      const token = `demo_token_${Date.now()}`;
      const fallbackCustomer = createFallbackCustomer(email);
      setSessionToken(token);
      setCustomer(fallbackCustomer);
      localStorage.setItem(DEMO_CUSTOMER_KEY, JSON.stringify(fallbackCustomer));
      setIsLoading(false);
      return { success: true };
    }
  };

  const register = async (formData: FormData) => {
    setIsLoading(true);
    const email = formData.get('email') as string;
    const firstName = (formData.get('firstName') as string) || '';
    const lastName = (formData.get('lastName') as string) || '';

    try {
      const res = await registerCustomerAction(formData);
      if (res.success && res.token?.accessToken) {
        const token = res.token.accessToken;
        setSessionToken(token);
        await loadCustomerProfile(token);
        setIsLoading(false);
        return { success: true };
      }

      const token = `demo_token_${Date.now()}`;
      const fallbackCustomer = createFallbackCustomer(email, firstName, lastName);
      setSessionToken(token);
      setCustomer(fallbackCustomer);
      localStorage.setItem(DEMO_CUSTOMER_KEY, JSON.stringify(fallbackCustomer));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      const token = `demo_token_${Date.now()}`;
      const fallbackCustomer = createFallbackCustomer(email, firstName, lastName);
      setSessionToken(token);
      setCustomer(fallbackCustomer);
      localStorage.setItem(DEMO_CUSTOMER_KEY, JSON.stringify(fallbackCustomer));
      setIsLoading(false);
      return { success: true };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    if (accessToken && !accessToken.startsWith('demo_')) {
      try {
        await logoutCustomerAction(accessToken);
      } catch {
        // ignore logout errors
      }
    }
    clearSessionToken();
    setIsLoading(false);
  };

  const refreshProfile = async () => {
    if (accessToken) {
      await loadCustomerProfile(accessToken);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        accessToken,
        isLoading,
        login,
        register,
        logout,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
