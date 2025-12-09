export const TOUR_TYPES = {
  BEACH: 'пляжный',
  EXCURSION: 'экскурсионный',
  ACTIVE: 'активный',
} as const;

export type TourType = (typeof TOUR_TYPES)[keyof typeof TOUR_TYPES];

export const TOUR_TYPE_LABELS: Record<TourType, string> = {
  [TOUR_TYPES.BEACH]: 'Пляжный',
  [TOUR_TYPES.EXCURSION]: 'Экскурсионный',
  [TOUR_TYPES.ACTIVE]: 'Активный',
};
