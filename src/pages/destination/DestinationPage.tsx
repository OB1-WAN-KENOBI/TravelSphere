import { useParams } from 'react-router-dom';
import { useDestination, useTours } from '@/shared/api';
import { TourCard } from '@/entities/tour';
import { Tag } from '@/shared/ui/Tag';
import { LoadingSpinner, ErrorDisplay } from '@/shared/ui';
import { useTranslation } from '@/shared/lib/useTranslation';
import { translateDestination } from '@/shared/lib/translateDestination';
import { translateTour } from '@/shared/lib/translateTour';
import './DestinationPage.scss';

export function DestinationPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: destination,
    isLoading: isDestinationLoading,
    isError: isDestinationError,
    error: destinationError,
    refetch: refetchDestination,
  } = useDestination(id || '');
  const { data: tours } = useTours();
  const { t } = useTranslation();

  if (isDestinationLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isDestinationError) {
    return (
      <ErrorDisplay
        error={destinationError}
        onRetry={() => refetchDestination()}
        title={t.destinationPage.errorTitle}
        message={t.destinationPage.errorMessage}
      />
    );
  }

  if (!destination) {
    return (
      <ErrorDisplay
        error={new Error('Направление не найдено')}
        title={t.destinationPage.notFoundTitle}
        message={t.destinationPage.notFoundMessage}
      />
    );
  }

  const translatedDestination = translateDestination(
    destination,
    t.destinationsData
  );

  const destinationTours =
    tours
      ?.filter((tour) => translatedDestination.popularTours.includes(tour.id))
      .map((tour) => translateTour(tour, t.toursData)) || [];

  return (
    <div className="destination-page">
      <div className="container">
        <div className="destination-page__hero">
          <div className="destination-page__hero-image">
            <img
              src={translatedDestination.image}
              alt={translatedDestination.name}
            />
          </div>
          <div className="destination-page__hero-content">
            <h1 className="destination-page__title">
              {translatedDestination.name}
            </h1>
            <p className="destination-page__description">
              {translatedDestination.description}
            </p>
            <div className="destination-page__meta">
              <Tag label={translatedDestination.country} />
              {translatedDestination.visaRequired && (
                <Tag label={t.destinationPage.visaRequired} color="warning" />
              )}
            </div>
          </div>
        </div>

        {destinationTours.length > 0 && (
          <section className="destination-page__tours">
            <h2 className="destination-page__section-title">
              {t.destinationPage.popularTours} {translatedDestination.name}
            </h2>
            <div className="destination-page__tours-grid">
              {destinationTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
