import { create } from 'zustand';

interface FiltersState {
  country: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
  visaRequired: boolean | null;
  tourType: string | null;
  stars: number | null;
  setCountry: (country: string | null) => void;
  setDateRange: (from: string | null, to: string | null) => void;
  setBudget: (min: number | null, max: number | null) => void;
  setVisaRequired: (required: boolean | null) => void;
  setTourType: (type: string | null) => void;
  setStars: (stars: number | null) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  country: null,
  dateFrom: null,
  dateTo: null,
  budgetMin: null,
  budgetMax: null,
  visaRequired: null,
  tourType: null,
  stars: null,
  setCountry: (country) => set({ country }),
  setDateRange: (from, to) => set({ dateFrom: from, dateTo: to }),
  setBudget: (min, max) => set({ budgetMin: min, budgetMax: max }),
  setVisaRequired: (required) => set({ visaRequired: required }),
  setTourType: (type) => set({ tourType: type }),
  setStars: (stars) => set({ stars }),
  resetFilters: () =>
    set({
      country: null,
      dateFrom: null,
      dateTo: null,
      budgetMin: null,
      budgetMax: null,
      visaRequired: null,
      tourType: null,
      stars: null,
    }),
}));
