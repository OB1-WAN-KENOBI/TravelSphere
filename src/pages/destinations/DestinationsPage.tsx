import { useDestinations } from '@/shared/api';
import { Card } from '@/shared/ui/Card';
import { LoadingSpinner, ErrorDisplay, EmptyState } from '@/shared/ui';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/shared/lib/useTranslation';
import { translateDestination } from '@/shared/lib/translateDestination';
import { getAssetUrl } from '@/shared/lib/getAssetUrl';
import './DestinationsPage.scss';

export function DestinationsPage() {
  const {
    data: destinations,
    isLoading,
    isError,
    error,
    refetch,
  } = useDestinations();
  const { t } = useTranslation();

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={() => refetch()}
        title={t.destinationsPage.errorTitle}
        message={t.destinationsPage.errorMessage}
      />
    );
  }

  return (
    <div className="destinations-page">
      <div className="container">
        <h1 className="destinations-page__title">{t.destinationsPage.title}</h1>
        {!destinations || destinations.length === 0 ? (
          <EmptyState
            title={t.destinationsPage.emptyTitle}
            message={t.destinationsPage.emptyMessage}
          />
        ) : (
          <div className="destinations-page__grid">
            {destinations.map((destination) => {
              const translated = translateDestination(
                destination,
                t.destinationsData
              );
              return (
                <Link
                  key={translated.id}
                  to={`/destinations/${translated.id}`}
                  className="destinations-page__card-link"
                >
                  <Card className="destinations-page__card">
                    <div className="destinations-page__image">
                      <img
                        src={getAssetUrl(translated.image)}
                        alt={translated.name}
                      />
                    </div>
                    <div className="destinations-page__content">
                      <h2 className="destinations-page__name">
                        {translated.name}
                      </h2>
                      <p className="destinations-page__description">
                        {translated.description}
                      </p>
                      <div className="destinations-page__meta">
                        {translated.visaRequired && (
                          <span className="destinations-page__visa">
                            {t.destinationsPage.visaRequired}
                          </span>
                        )}
                        <span className="destinations-page__tours">
                          {translated.popularTours.length}{' '}
                          {t.destinationsPage.toursCount}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
