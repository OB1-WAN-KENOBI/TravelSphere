import { format, type Locale } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { logger } from './logger';
import { type AppLanguage } from './i18n';

const localeMap: Record<AppLanguage, Locale> = {
  ru,
  en: enUS,
};

const resolveLocale = (locale?: AppLanguage): Locale => {
  if (locale && localeMap[locale]) {
    return localeMap[locale];
  }

  if (typeof document !== 'undefined') {
    const docLang = document.documentElement.lang as AppLanguage;
    if (docLang && localeMap[docLang]) {
      return localeMap[docLang];
    }
  }

  return localeMap.ru;
};

/**
 * Форматирует дату в строку с использованием date-fns
 * @param date - Дата в виде строки или объекта Date
 * @param formatStr - Строка формата (по умолчанию 'dd MMMM yyyy')
 * @param locale - Локаль ('ru' | 'en'), по умолчанию ru
 * @returns Отформатированная строка даты
 */
export const formatDate = (
  date: string | Date,
  formatStr: string = 'dd MMMM yyyy',
  locale: AppLanguage = 'ru'
): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, formatStr, { locale: resolveLocale(locale) });
  } catch (error) {
    logger.error('Error formatting date:', error);
    return date.toString();
  }
};

/**
 * Форматирует дату в короткий формат (dd.MM.yyyy)
 * @param date - Дата в виде строки или объекта Date
 * @param locale - Локаль ('ru' | 'en'), по умолчанию ru
 * @returns Отформатированная строка даты в формате dd.MM.yyyy
 */
export const formatDateShort = (
  date: string | Date,
  locale: AppLanguage = 'ru'
): string => {
  return formatDate(date, 'dd.MM.yyyy', locale);
};
