import { Link } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { LoadingSpinner, ErrorDisplay, EmptyState } from '@/shared/ui';
import { usePopularDestinations } from './model/usePopularDestinations';
import { useTranslation } from '@/shared/lib/useTranslation';
import { translateDestination } from '@/shared/lib/translateDestination';
import './PopularDestinations.scss';

export const PopularDestinations = () => {
  const { popularDestinations, isLoading, isError, error } =
    usePopularDestinations();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="popular-destinations">
        <div className="container">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="popular-destinations">
        <div className="container">
          <ErrorDisplay error={error} />
        </div>
      </section>
    );
  }

  if (popularDestinations.length === 0) {
    return (
      <section className="popular-destinations">
        <div className="container">
          <EmptyState message={t.popularDestinations.empty} />
        </div>
      </section>
    );
  }

  return (
    <section className="popular-destinations">
      <div className="container">
        <h2 className="popular-destinations__title">
          {t.popularDestinations.title}
        </h2>
        <div className="popular-destinations__grid">
          {popularDestinations.map((destination) => {
            const translated = translateDestination(
              destination,
              t.destinationsData
            );
            return (
              <Link
                key={translated.id}
                to={`/destinations/${translated.id}`}
                className="popular-destinations__card"
              >
                <Card>
                  <div className="popular-destinations__image">
                    <img
                      src={translated.image}
                      alt={translated.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="popular-destinations__content">
                    <h3 className="popular-destinations__name">
                      {translated.name}
                    </h3>
                    <p className="popular-destinations__description">
                      {translated.description}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
