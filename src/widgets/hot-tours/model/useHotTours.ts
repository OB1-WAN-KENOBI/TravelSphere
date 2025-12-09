import { useMemo } from 'react';
import { useTours } from '@/shared/api';
import { Tour } from '@/shared/types/tour';

/**
 * Хук для получения и фильтрации горящих туров
 * Выносит бизнес-логику из UI компонента
 */
export const useHotTours = () => {
  const { data: tours, isLoading, isError, error } = useTours();

  const hotTours = useMemo(() => {
    if (!tours) return [];
    // Горящие туры - туры с ценой меньше 100000
    return tours.filter((tour: Tour) => tour.price < 100000);
  }, [tours]);

  return {
    hotTours,
    isLoading,
    isError,
    error,
  };
};
