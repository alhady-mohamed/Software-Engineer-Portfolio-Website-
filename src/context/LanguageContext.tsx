import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES, translations, LanguageOption } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations, fallback?: string) => string;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'portfolio_preferred_language_v2';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (saved && (saved === 'en' || saved === 'so' || saved === 'ar')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en'; // Default to English as the official language
  });

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const dir = currentOption.dir;
  const isRTL = dir === 'rtl';

  useEffect(() => {
    // Apply document direction and lang attributes
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
    if (isRTL) {
      document.documentElement.classList.add('rtl-mode');
    } else {
      document.documentElement.classList.remove('rtl-mode');
    }

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (e) {
      console.warn('Failed to save language preference:', e);
    }
  }, [language, dir, isRTL]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: keyof typeof translations, fallback?: string): string => {
    const entry = translations[key];
    if (!entry) return fallback || String(key);
    return entry[language] || entry.en || fallback || String(key);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dir,
        isRTL,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
