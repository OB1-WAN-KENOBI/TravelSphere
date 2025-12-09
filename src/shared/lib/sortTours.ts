import { Tour } from '../types/tour';
import { SortOption } from '../types/filters';

/**
 * Сортирует массив туров по заданному критерию
 * @param tours - Массив туров для сортировки
 * @param sortBy - Критерий сортировки (price-asc, price-desc, duration)
 * @returns Отсортированный массив туров (не мутирует исходный)
 */
export const sortTours = (tours: Tour[], sortBy: SortOption): Tour[] => {
  const sorted = [...tours];

  switch (sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'duration':
      sorted.sort((a, b) => a.duration - b.duration);
      break;
    default:
      break;
  }

  return sorted;
};
