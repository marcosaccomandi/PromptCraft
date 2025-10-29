
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

type Language = 'it' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, rawSetLanguage] = useState<Language>('it');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    const browserLang = navigator.language.split('-')[0];
    
    if (storedLang && ['it', 'en'].includes(storedLang)) {
      rawSetLanguage(storedLang);
    } else if (browserLang === 'en') {
      rawSetLanguage('en');
    } else {
      rawSetLanguage('it'); // Default to Italian
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    rawSetLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };
  
  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
