import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Tag } from '@/shared/ui/Tag';
import { useTranslation } from '@/shared/lib/useTranslation';
import { usePriceFormatter } from '@/shared/lib/formatPrice';
import { getAssetUrl } from '@/shared/lib/getAssetUrl';
import './PromotionsPage.scss';

type Promotion = {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
};

export function PromotionsPage() {
  const { t } = useTranslation();
  const { locale } = usePriceFormatter();
  const promotions = t.promotionsPage.promotions as Promotion[];

  return (
    <div className="promotions-page">
      <div className="container">
        <h1 className="promotions-page__title">{t.promotionsPage.title}</h1>
        <div className="promotions-page__grid">
              {promotions.map((promotion) => (
                <Card key={promotion.id} className="promotions-page__card">
                  <div className="promotions-page__image">
                    <img
                      src={getAssetUrl(promotion.image)}
                      alt={promotion.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="promotions-page__discount-badge">
                      -{promotion.discount}
                    </div>
                  </div>
              <div className="promotions-page__content">
                <h2 className="promotions-page__card-title">
                  {promotion.title}
                </h2>
                <p className="promotions-page__card-description">
                  {promotion.description}
                </p>
                <div className="promotions-page__footer">
                  <Tag
                    label={`${t.promotionsPage.validUntil} ${new Date(promotion.validUntil).toLocaleDateString(locale)}`}
                  />
                  <Button variant="secondary">
                    {t.promotionsPage.details}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
