import { useLanguageStore } from '@/shared/store/languageStore';
import { type AppLanguage } from './i18n';

const getLocale = (language: AppLanguage) =>
  language === 'en' ? 'en-US' : 'ru-RU';

export const usePriceFormatter = () => {
  const language = useLanguageStore((state) => state.language);
  const locale = getLocale(language);

  const formatPrice = (value: number, currency: string) => {
    return `${value.toLocaleString(locale)} ${currency}`;
  };

  return { formatPrice, locale, language };
};
