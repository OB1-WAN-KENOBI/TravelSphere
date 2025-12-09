import { describe, it, expect } from 'vitest';
import { sortTours } from '@/shared/lib/sortTours';
import { Tour } from '@/shared/types/tour';

const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Тур 1',
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
    title: 'Тур 2',
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
  {
    id: '3',
    title: 'Тур 3',
    destination: 'Дубай',
    country: 'ОАЭ',
    price: 60000,
    currency: 'RUB',
    duration: 5,
    stars: 5,
    image: '',
    description: '',
    departureDate: '2024-08-01',
    returnDate: '2024-08-06',
    visaRequired: false,
    tourType: 'экскурсионный',
    included: [],
    notIncluded: [],
  },
];

describe('sortTours', () => {
  it('should sort by price ascending', () => {
    const result = sortTours(mockTours, 'price-asc');
    expect(result[0]?.price).toBe(50000);
    expect(result[1]?.price).toBe(60000);
    expect(result[2]?.price).toBe(80000);
  });

  it('should sort by price descending', () => {
    const result = sortTours(mockTours, 'price-desc');
    expect(result[0]?.price).toBe(80000);
    expect(result[1]?.price).toBe(60000);
    expect(result[2]?.price).toBe(50000);
  });

  it('should sort by duration', () => {
    const result = sortTours(mockTours, 'duration');
    expect(result[0]?.duration).toBe(5);
    expect(result[1]?.duration).toBe(7);
    expect(result[2]?.duration).toBe(10);
  });

  it('should not mutate original array', () => {
    const original = [...mockTours];
    sortTours(mockTours, 'price-asc');
    expect(mockTours).toEqual(original);
  });
});
