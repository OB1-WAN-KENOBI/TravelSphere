import { Destination } from '@/shared/types/destination';

type DestinationTranslation = Partial<
  Pick<Destination, 'name' | 'description' | 'country' | 'visaRequired'>
>;

export const translateDestination = (
  destination: Destination,
  translations?: Record<string, DestinationTranslation>
): Destination => {
  const translation = translations?.[destination.id] as
    | DestinationTranslation
    | undefined;

  if (!translation) return destination;

  return {
    ...destination,
    name: translation.name ?? destination.name,
    description: translation.description ?? destination.description,
    country: translation.country ?? destination.country,
    visaRequired:
      translation.visaRequired !== undefined
        ? translation.visaRequired
        : destination.visaRequired,
  };
};
