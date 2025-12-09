export interface FiltersState {
  country: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
  visaRequired: boolean | null;
  tourType: string | null;
  stars: number | null;
}

export type SortOption = 'price-asc' | 'price-desc' | 'duration';
