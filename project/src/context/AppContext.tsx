import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';

interface AppContextType {
  cart: ReturnType<typeof useCart>;
  favorites: ReturnType<typeof useFavorites>;
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cart = useCart();
  const favorites = useFavorites();
  const [language, setLanguage] = React.useState<'en' | 'ar'>('en');

  return (
    <AppContext.Provider value={{ cart, favorites, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};