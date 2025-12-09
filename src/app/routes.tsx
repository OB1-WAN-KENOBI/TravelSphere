import { lazy } from 'react';

export const HomePage = lazy(() =>
  import('@/pages/home').then((module) => ({ default: module.HomePage }))
);

export const ToursPage = lazy(() =>
  import('@/pages/tours').then((module) => ({ default: module.ToursPage }))
);

export const TourPage = lazy(() =>
  import('@/pages/tour').then((module) => ({ default: module.TourPage }))
);

export const DestinationsPage = lazy(() =>
  import('@/pages/destinations').then((module) => ({
    default: module.DestinationsPage,
  }))
);

export const DestinationPage = lazy(() =>
  import('@/pages/destination').then((module) => ({
    default: module.DestinationPage,
  }))
);

export const ServicesPage = lazy(() =>
  import('@/pages/services').then((module) => ({
    default: module.ServicesPage,
  }))
);

export const PromotionsPage = lazy(() =>
  import('@/pages/promotions').then((module) => ({
    default: module.PromotionsPage,
  }))
);

export const AboutPage = lazy(() =>
  import('@/pages/about').then((module) => ({ default: module.AboutPage }))
);

export const ContactsPage = lazy(() =>
  import('@/pages/contacts').then((module) => ({
    default: module.ContactsPage,
  }))
);

export const ProfilePage = lazy(() =>
  import('@/pages/profile').then((module) => ({
    default: module.ProfilePage,
  }))
);
