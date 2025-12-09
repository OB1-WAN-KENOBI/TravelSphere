import { Tour } from '../types/tour';
import { FiltersState } from '../types/filters';

/**
 * Фильтрует массив туров по заданным критериям
 * @param tours - Массив туров для фильтрации
 * @param filters - Объект с критериями фильтрации
 * @returns Отфильтрованный массив туров
 */
export const filterTours = (tours: Tour[], filters: FiltersState): Tour[] => {
  return tours.filter((tour) => {
    if (filters.country) {
      const countryMatch = tour.country
        .toLowerCase()
        .includes(filters.country.toLowerCase());
      if (!countryMatch) return false;
    }

    if (filters.dateFrom) {
      if (tour.departureDate < filters.dateFrom) return false;
    }

    if (filters.dateTo) {
      if (tour.returnDate > filters.dateTo) return false;
    }

    if (filters.budgetMin !== null) {
      if (tour.price < filters.budgetMin) return false;
    }

    if (filters.budgetMax !== null) {
      if (tour.price > filters.budgetMax) return false;
    }

    if (filters.visaRequired !== null) {
      if (tour.visaRequired !== filters.visaRequired) return false;
    }

    if (filters.tourType) {
      if (tour.tourType !== filters.tourType) return false;
    }

    if (filters.stars !== null) {
      if (tour.stars !== filters.stars) return false;
    }

    return true;
  });
};
