import { create } from 'zustand';
import {
  type AppLanguage,
  getInitialLanguage,
  persistLanguage,
  syncDocumentLanguage,
} from '@/shared/lib/i18n';

interface LanguageState {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  setLanguage: (language) => {
    syncDocumentLanguage(language);
    persistLanguage(language);
    set({ language });
  },
}));
