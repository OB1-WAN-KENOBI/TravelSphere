import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from '@/shared/lib/useTranslation';
import './ServicesPage.scss';

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export function ServicesPage() {
  const { t } = useTranslation();
  const services = t.servicesPage.services as Service[];

  return (
    <div className="services-page">
      <div className="container">
        <h1 className="services-page__title">{t.servicesPage.title}</h1>
        <p className="services-page__subtitle">{t.servicesPage.subtitle}</p>
        <div className="services-page__grid">
          {services.map((service) => (
            <Card key={service.id} className="services-page__card">
              <div className="services-page__icon">{service.icon}</div>
              <h2 className="services-page__card-title">{service.title}</h2>
              <p className="services-page__card-description">
                {service.description}
              </p>
              <Button variant="secondary" className="services-page__button">
                {t.servicesPage.details}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
