import { describe, it, expect } from 'vitest';
import { filterTours } from '@/shared/lib/filterTours';
import { Tour } from '@/shared/types/tour';
import { FiltersState } from '@/shared/types/filters';

const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Тур в Турцию',
    destination: 'Анталия',
    country: 'Турция',
    price: 50000,
    currency: 'RUB',
    duration: 7,
    stars: 5,
    image: '',
    description: '',
    departureDate: '2024-06-01',
    returnDate: '2024-06-08',
    visaRequired: false,
    tourType: 'пляжный',
    included: [],
    notIncluded: [],
  },
  {
    id: '2',
    title: 'Тур в Египет',
    destination: 'Хургада',
    country: 'Египет',
    price: 80000,
    currency: 'RUB',
    duration: 10,
    stars: 4,
    image: '',
    description: '',
    departureDate: '2024-07-01',
    returnDate: '2024-07-11',
    visaRequired: true,
    tourType: 'пляжный',
    included: [],
    notIncluded: [],
  },
];

describe('filterTours', () => {
  it('should return all tours when no filters applied', () => {
    const filters: FiltersState = {
      country: null,
      dateFrom: null,
      dateTo: null,
      budgetMin: null,
      budgetMax: null,
      visaRequired: null,
      tourType: null,
      stars: null,
    };

    const result = filterTours(mockTours, filters);
    expect(result).toHaveLength(2);
  });

  it('should filter by country', () => {
    const filters: FiltersState = {
      country: 'Турция',
      dateFrom: null,
      dateTo: null,
      budgetMin: null,
      budgetMax: null,
      visaRequired: null,
      tourType: null,
      stars: null,
    };

    const result = filterTours(mockTours, filters);
    expect(result).toHaveLength(1);
    expect(result[0]?.country).toBe('Турция');
  });

  it('should filter by budget', () => {
    const filters: FiltersState = {
      country: null,
      dateFrom: null,
      dateTo: null,
      budgetMin: 60000,
      budgetMax: null,
      visaRequired: null,
      tourType: null,
      stars: null,
    };

    const result = filterTours(mockTours, filters);
    expect(result).toHaveLength(1);
    expect(result[0]?.price).toBeGreaterThanOrEqual(60000);
  });

  it('should filter by visa requirement', () => {
    const filters: FiltersState = {
      country: null,
      dateFrom: null,
      dateTo: null,
      budgetMin: null,
      budgetMax: null,
      visaRequired: true,
      tourType: null,
      stars: null,
    };

    const result = filterTours(mockTours, filters);
    expect(result).toHaveLength(1);
    expect(result[0]?.visaRequired).toBe(true);
  });

  it('should filter by tour type', () => {
    const filters: FiltersState = {
      country: null,
      dateFrom: null,
      dateTo: null,
      budgetMin: null,
      budgetMax: null,
      visaRequired: null,
      tourType: 'пляжный',
      stars: null,
    };

    const result = filterTours(mockTours, filters);
    expect(result).toHaveLength(2);
  });

  it('should filter by stars', () => {
    const filters: FiltersState = {
      country: null,
      dateFrom: null,
      dateTo: null,
      budgetMin: null,
      budgetMax: null,
      visaRequired: null,
      tourType: null,
      stars: 5,
    };

    const result = filterTours(mockTours, filters);
    expect(result).toHaveLength(1);
    expect(result[0]?.stars).toBe(5);
  });

  it('should apply multiple filters', () => {
    const filters: FiltersState = {
      country: 'Турция',
      dateFrom: null,
      dateTo: null,
      budgetMin: 40000,
      budgetMax: 60000,
      visaRequired: false,
      tourType: 'пляжный',
      stars: 5,
    };

    const result = filterTours(mockTours, filters);
    expect(result).toHaveLength(1);
  });
});
