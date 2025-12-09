import { useQuery } from '@tanstack/react-query';
import { Review } from '../types/review';
import { fetchJson } from './fetchJson';

const fetchReviews = () => fetchJson<Review[]>('/data/reviews.json');

export const useReviews = () => {
  return useQuery<Review[]>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });
};

export const useTourReviews = (tourId: string) => {
  return useQuery<Review[]>({
    queryKey: ['reviews', 'tour', tourId],
    queryFn: async () => {
      const reviews = await fetchReviews();
      return reviews.filter((review) => review.tourId === tourId);
    },
    enabled: !!tourId,
  });
};
