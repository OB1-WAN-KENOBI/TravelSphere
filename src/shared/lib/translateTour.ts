import { Tour } from '@/shared/types';

type TourTranslation = Partial<
  Pick<
    Tour,
    | 'title'
    | 'description'
    | 'country'
    | 'destination'
    | 'included'
    | 'notIncluded'
  >
>;

export const translateTour = (
  tour: Tour,
  translations?: Record<string, TourTranslation>
): Tour => {
  const translation = translations?.[tour.id] as TourTranslation | undefined;
  if (!translation) return tour;

  return {
    ...tour,
    title: translation.title ?? tour.title,
    description: translation.description ?? tour.description,
    country: translation.country ?? tour.country,
    destination: translation.destination ?? tour.destination,
    included: translation.included ?? tour.included,
    notIncluded: translation.notIncluded ?? tour.notIncluded,
  };
};
