import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { TourMeta } from '../TourMeta';
import { Tour } from '@/shared/types';
import { useTranslation } from '@/shared/lib/useTranslation';
import { usePriceFormatter } from '@/shared/lib/formatPrice';
import { translateTour } from '@/shared/lib/translateTour';
import { getAssetUrl } from '@/shared/lib/getAssetUrl';
import './TourCard.scss';

interface TourCardProps {
  tour: Tour;
  onBook?: (tourId: string) => void;
}

export const TourCard = ({ tour, onBook }: TourCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formatPrice } = usePriceFormatter();
  const translatedTour = translateTour(tour, t.toursData);

  const handleClick = useCallback(() => {
    navigate(`/tours/${tour.id}`);
  }, [navigate, tour.id]);

  const handleBookClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onBook?.(tour.id);
    },
    [onBook, tour.id]
  );

  return (
    <Card
      className="tour-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="tour-card__image">
        <img
          src={getAssetUrl(tour.image)}
          alt={translatedTour.title}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="tour-card__content">
        <h3 className="tour-card__title">{translatedTour.title}</h3>
        <TourMeta
          country={translatedTour.country}
          duration={translatedTour.duration}
          stars={translatedTour.stars}
        />
        <p className="tour-card__description">{translatedTour.description}</p>
        <div className="tour-card__footer">
          <div className="tour-card__price">
            {formatPrice(tour.price, tour.currency)}
          </div>
          <Button onClick={handleBookClick}>{t.tourCard.book}</Button>
        </div>
      </div>
    </Card>
  );
};
