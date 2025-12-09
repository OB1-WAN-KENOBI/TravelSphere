import { usePartners } from '@/shared/api';

/**
 * Хук для получения партнеров
 * Выносит бизнес-логику из UI компонента
 */
export const usePartnersWidget = () => {
  const { data: partners, isLoading, isError, error } = usePartners();

  return {
    partners,
    isLoading,
    isError,
    error,
  };
};
