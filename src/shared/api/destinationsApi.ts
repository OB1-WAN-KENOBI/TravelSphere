import { useQuery } from '@tanstack/react-query';
import { Destination } from '../types/destination';
import { fetchJson } from './fetchJson';

const fetchDestinations = () =>
  fetchJson<Destination[]>('/data/destinations.json');

export const useDestinations = () => {
  return useQuery<Destination[]>({
    queryKey: ['destinations'],
    queryFn: fetchDestinations,
  });
};

export const useDestination = (id: string) => {
  return useQuery<Destination | undefined>({
    queryKey: ['destinations', id],
    queryFn: async () => {
      const destinations = await fetchDestinations();
      return destinations.find((destination) => destination.id === id);
    },
    enabled: !!id,
  });
};
