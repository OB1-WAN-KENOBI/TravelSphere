import ru from '@/shared/constants/i18n/ru.json';
import en from '@/shared/constants/i18n/en.json';

export type AppLanguage = 'ru' | 'en';

export type TranslationDictionary = typeof ru;

const translations: Record<AppLanguage, TranslationDictionary> = {
  ru,
  en,
};

const LANGUAGE_STORAGE_KEY = 'ts-language';

export const getInitialLanguage = (): AppLanguage => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === 'en' || saved === 'ru') {
      return saved;
    }
  }

  if (typeof document !== 'undefined') {
    const lang = document.documentElement.lang;
    if (lang === 'en' || lang === 'ru') {
      return lang;
    }
  }

  return 'ru';
};

export const persistLanguage = (language: AppLanguage) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
};

export const getTranslations = (
  language: AppLanguage
): TranslationDictionary => {
  return translations[language] ?? translations.ru;
};

export const syncDocumentLanguage = (language: AppLanguage) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
  }
};
