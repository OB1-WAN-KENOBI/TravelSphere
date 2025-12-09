import { getTranslations } from './i18n';
import { useLanguageStore } from '@/shared/store/languageStore';
import { AppLanguage } from './i18n';

export const useTranslation = () => {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const t = getTranslations(language);

  const nextLanguage: AppLanguage = language === 'ru' ? 'en' : 'ru';

  return {
    t,
    language,
    nextLanguage,
    setLanguage,
  };
};
