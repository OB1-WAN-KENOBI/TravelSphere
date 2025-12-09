import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFiltersStore } from '@/shared/store/filtersStore';

/**
 * Хук для управления формой поиска в Hero секции
 * Выносит бизнес-логику из UI компонента
 */
export const useHeroSearch = () => {
  const navigate = useNavigate();
  const { setCountry, setDateRange } = useFiltersStore();
  const [searchCountry, setSearchCountry] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleSearch = useCallback(() => {
    if (searchCountry) {
      setCountry(searchCountry);
    }
    if (dateFrom && dateTo) {
      setDateRange(dateFrom, dateTo);
    }
    navigate('/tours');
  }, [searchCountry, dateFrom, dateTo, setCountry, setDateRange, navigate]);

  return {
    searchCountry,
    setSearchCountry,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    handleSearch,
  };
};
