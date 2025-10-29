import { useLanguage } from '../context/LanguageContext';
import it from '../locales/it.ts';
import en from '../locales/en.ts';

// FIX: Explicitly type `translations` to allow for string key indexing.
// This resolves the error on line 11 by ensuring TypeScript knows that `translations[language]`
// is an object that can be indexed by a string.
const translations: Record<'it' | 'en', Record<string, string>> = { it, en };

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string): string => {
    // The complex type assertion from the original code is no longer needed due to the fix above.
    return translations[language][key] || key;
  };

  return { t, language };
};
