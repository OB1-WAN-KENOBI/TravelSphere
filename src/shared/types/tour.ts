export interface Tour {
  id: string;
  title: string;
  destination: string;
  country: string;
  price: number;
  currency: string;
  duration: number;
  stars: number;
  image: string;
  description: string;
  departureDate: string;
  returnDate: string;
  visaRequired: boolean;
  tourType: string;
  included: string[];
  notIncluded: string[];
  program?: TourDay[];
  location?: {
    lat: number;
    lng: number;
  };
}

export interface TourDay {
  day: number;
  title: string;
  description: string;
}
