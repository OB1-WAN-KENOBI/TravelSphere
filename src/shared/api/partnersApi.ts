import { useQuery } from '@tanstack/react-query';
import { Partner } from '../types/partner';
import { fetchJson } from './fetchJson';

const fetchPartners = () => fetchJson<Partner[]>('/data/partners.json');

export const usePartners = () => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: fetchPartners,
  });
};
