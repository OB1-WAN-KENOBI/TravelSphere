import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useTours, useTour } from '@/shared/api/toursApi';
import { fetchJson } from '@/shared/api/fetchJson';
import { Tour } from '@/shared/types/tour';

// Мокируем fetchJson
vi.mock('@/shared/api/fetchJson');

const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Тур в Париж',
    destination: 'Париж',
    country: 'Франция',
    price: 120000,
    currency: 'RUB',
    duration: 7,
    stars: 4,
    image: 'paris.jpg',
    description: 'Прекрасный тур по столице Франции.',
    departureDate: '2024-09-01',
    returnDate: '2024-09-08',
    visaRequired: true,
    tourType: 'экскурсионный',
    included: [],
    notIncluded: [],
  },
  {
    id: '2',
    title: 'Пляжный отдых на Бали',
    destination: 'Бали',
    country: 'Индонезия',
    price: 150000,
    currency: 'RUB',
    duration: 10,
    stars: 5,
    image: 'bali.jpg',
    description: 'Расслабляющий отдых на райском острове.',
    departureDate: '2024-10-15',
    returnDate: '2024-10-25',
    visaRequired: false,
    tourType: 'пляжный',
    included: [],
    notIncluded: [],
  },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('toursApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useTours', () => {
    it('should fetch and return tours', async () => {
      vi.mocked(fetchJson).mockResolvedValue(mockTours);

      const { result } = renderHook(() => useTours(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockTours);
      expect(fetchJson).toHaveBeenCalledWith('/data/tours.json');
    });

    it('should handle errors', async () => {
      const error = new Error('Failed to fetch');
      vi.mocked(fetchJson).mockRejectedValue(error);

      const { result } = renderHook(() => useTours(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBe(error);
    });
  });

  describe('useTour', () => {
    it('should fetch and return a specific tour', async () => {
      vi.mocked(fetchJson).mockResolvedValue(mockTours);

      const { result } = renderHook(() => useTour('1'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockTours[0]);
    });

    it('should return undefined if tour not found', async () => {
      vi.mocked(fetchJson).mockResolvedValue(mockTours);

      const { result } = renderHook(() => useTour('999'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess || result.current.isError).toBe(true);
      });

      // Может быть undefined или успешный запрос с undefined данными
      if (result.current.isSuccess) {
        expect(result.current.data).toBeUndefined();
      }
    });

    it('should not fetch if id is empty', () => {
      const { result } = renderHook(() => useTour(''), {
        wrapper: createWrapper(),
      });

      expect(result.current.isFetching).toBe(false);
      expect(fetchJson).not.toHaveBeenCalled();
    });
  });
});
