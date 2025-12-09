import { useMemo } from 'react';
import { useDestinations } from '@/shared/api';

const POPULAR_COUNT = 6;

/**
 * Хук для получения популярных направлений
 * Выносит бизнес-логику из UI компонента
 */
export const usePopularDestinations = () => {
  const { data: destinations, isLoading, isError, error } = useDestinations();

  const popularDestinations = useMemo(() => {
    if (!destinations) return [];
    return destinations.slice(0, POPULAR_COUNT);
  }, [destinations]);

  return {
    popularDestinations,
    isLoading,
    isError,
    error,
  };
};
