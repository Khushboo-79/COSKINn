import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Rate relative to 1 INR
}

export const CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.012 },
];

interface CurrencyContextType {
  currency: Currency;
  setCurrencyByCode: (code: string) => void;
  formatPrice: (inrAmount: number) => string;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const getSavedCurrency = (): Currency => {
  try {
    const saved = localStorage.getItem('coskinn_currency');
    if (saved) {
      const found = CURRENCIES.find(c => c.code === saved);
      if (found) return found;
    }
  } catch (_) {}
  return CURRENCIES[0]; // Default: INR
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(getSavedCurrency);

  const setCurrencyByCode = useCallback((code: string) => {
    const found = CURRENCIES.find(c => c.code === code);
    if (found) {
      setCurrency(found);
      try { localStorage.setItem('coskinn_currency', code); } catch (_) {}
    }
  }, []);

  const formatPrice = useCallback((inrAmount: number): string => {
    const converted = inrAmount * currency.rate;
    // Format with appropriate decimal places
    const formatted = currency.code === 'INR'
      ? Math.round(converted).toLocaleString('en-IN')
      : converted.toFixed(2);
    return `${currency.symbol}${formatted}`;
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencyByCode, formatPrice, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};
