import { useFiltersStore } from '@/shared/store/filtersStore';

/**
 * Хук для управления фильтрами туров
 * Выносит работу с store из UI компонента
 */
export const useTourFilters = () => {
  const filtersStore = useFiltersStore();

  return {
    // Значения фильтров
    country: filtersStore.country,
    dateFrom: filtersStore.dateFrom,
    dateTo: filtersStore.dateTo,
    budgetMin: filtersStore.budgetMin,
    budgetMax: filtersStore.budgetMax,
    visaRequired: filtersStore.visaRequired,
    tourType: filtersStore.tourType,
    stars: filtersStore.stars,
    // Методы обновления
    setCountry: filtersStore.setCountry,
    setDateRange: filtersStore.setDateRange,
    setBudget: filtersStore.setBudget,
    setVisaRequired: filtersStore.setVisaRequired,
    setTourType: filtersStore.setTourType,
    setStars: filtersStore.setStars,
    resetFilters: filtersStore.resetFilters,
  };
};
