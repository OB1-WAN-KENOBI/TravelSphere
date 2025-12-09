import { SortOption } from '../types/filters';
import { useTranslation } from '@/shared/lib/useTranslation';

export const useSortOptions = (): Record<SortOption, string> => {
  const { t } = useTranslation();
  return t.toursPage.sortOptions;
};
