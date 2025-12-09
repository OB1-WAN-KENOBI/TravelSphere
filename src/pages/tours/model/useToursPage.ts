import { useState, useMemo } from 'react';
import { useTours } from '@/shared/api';
import { useFiltersStore } from '@/shared/store/filtersStore';
import { filterTours } from '@/shared/lib/filterTours';
import { sortTours } from '@/shared/lib/sortTours';
import { SortOption } from '@/shared/types/filters';

/**
 * Хук для управления страницей каталога туров
 * Выносит всю бизнес-логику из UI компонента
 */
export const useToursPage = () => {
  const { data: tours, isLoading, isError, error, refetch } = useTours();
  const filters = useFiltersStore();
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');

  const filteredAndSortedTours = useMemo(() => {
    if (!tours) return [];

    const filtered = filterTours(tours, filters);
    return sortTours(filtered, sortBy);
  }, [tours, filters, sortBy]);

  return {
    tours: filteredAndSortedTours,
    isLoading,
    isError,
    error,
    refetch,
    sortBy,
    setSortBy,
    totalCount: filteredAndSortedTours.length,
  };
};
