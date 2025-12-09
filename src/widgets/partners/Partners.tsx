import { LoadingSpinner, ErrorDisplay, EmptyState } from '@/shared/ui';
import { usePartnersWidget } from './model/usePartners';
import { useTranslation } from '@/shared/lib/useTranslation';
import './Partners.scss';

export const Partners = () => {
  const { partners, isLoading, isError, error } = usePartnersWidget();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="partners">
        <div className="container">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="partners">
        <div className="container">
          <ErrorDisplay error={error} />
        </div>
      </section>
    );
  }

  if (!partners || partners.length === 0) {
    return (
      <section className="partners">
        <div className="container">
          <EmptyState message={t.partners.empty} />
        </div>
      </section>
    );
  }

  return (
    <section className="partners">
      <div className="container">
        <h2 className="partners__title">{t.partners.title}</h2>
        <div className="partners__grid">
          {partners?.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partners__item"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                decoding="async"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
