import { useQuery } from '@tanstack/react-query';
import { Tour } from '../types/tour';
import { fetchJson } from './fetchJson';

const fetchTours = () => fetchJson<Tour[]>('/data/tours.json');

/**
 * Хук для получения списка всех туров
 * @returns Query объект с данными туров, состоянием загрузки и ошибками
 */
export const useTours = () => {
  return useQuery<Tour[]>({
    queryKey: ['tours'],
    queryFn: fetchTours,
  });
};

/**
 * Хук для получения конкретного тура по ID
 * @param id - ID тура
 * @returns Query объект с данными тура (может быть undefined), состоянием загрузки и ошибками
 */
export const useTour = (id: string) => {
  return useQuery<Tour | undefined>({
    queryKey: ['tours', id],
    queryFn: async () => {
      const tours = await fetchTours();
      return tours.find((tour) => tour.id === id);
    },
    enabled: !!id,
  });
};
