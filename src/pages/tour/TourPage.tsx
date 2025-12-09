import { useParams } from 'react-router-dom';
import { useTour, useTourReviews } from '@/shared/api';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { LoadingSpinner, ErrorDisplay } from '@/shared/ui';
import { TourMeta } from '@/entities/tour';
import { formatDateShort } from '@/shared/lib/formatDate';
import { Rating } from '@mui/material';
import { usePriceFormatter } from '@/shared/lib/formatPrice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TourPage.scss';
import { useTranslation } from '@/shared/lib/useTranslation';
import { translateTour } from '@/shared/lib/translateTour';
import { getAssetUrl } from '@/shared/lib/getAssetUrl';

export function TourPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: tour,
    isLoading: isTourLoading,
    isError: isTourError,
    error: tourError,
    refetch: refetchTour,
  } = useTour(id || '');
  const { data: reviews } = useTourReviews(id || '');
  const { formatPrice } = usePriceFormatter();
  const { t } = useTranslation();

  if (isTourLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isTourError) {
    return (
      <ErrorDisplay
        error={tourError}
        onRetry={() => refetchTour()}
        title={t.tourPage.errorTitle}
        message={t.tourPage.errorMessage}
      />
    );
  }

  if (!tour) {
    return (
      <ErrorDisplay
        error={new Error(t.tourPage.notFoundTitle)}
        title={t.tourPage.notFoundTitle}
        message={t.tourPage.notFoundMessage}
      />
    );
  }

  const translatedTour = translateTour(tour, t.toursData);
  const images: string[] = translatedTour.image
    ? [translatedTour.image]
    : [];
  const enableControls = images.length > 1;

  return (
    <div className="tour-page">
      <div className="container">
        <div className="tour-page__gallery">
          <Swiper
            modules={enableControls ? [Navigation, Pagination] : []}
            spaceBetween={10}
            slidesPerView={1}
            navigation={enableControls}
            pagination={enableControls ? { clickable: true } : false}
            className="tour-page__slider"
          >
            {images.map((img: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={getAssetUrl(img)}
                  alt={translatedTour.title}
                  loading="lazy"
                  decoding="async"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="tour-page__content">
          <div className="tour-page__main">
            <h1 className="tour-page__title">{translatedTour.title}</h1>
            <TourMeta
              country={translatedTour.country}
              duration={translatedTour.duration}
              stars={translatedTour.stars}
              visaRequired={translatedTour.visaRequired}
            />
            <p className="tour-page__description">
              {translatedTour.description}
            </p>

            {translatedTour.program && translatedTour.program.length > 0 && (
              <Card className="tour-page__program">
                <h2 className="tour-page__section-title">
                  {t.tourPage.program}
                </h2>
                <div className="tour-page__program-list">
                  {translatedTour.program.map((day, index) => (
                    <div key={index} className="tour-page__program-day">
                      <div className="tour-page__program-day-number">
                        {t.tourPage.day} {day.day}
                      </div>
                      <div className="tour-page__program-day-content">
                        <h3>{day.title}</h3>
                        <p>{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="tour-page__included">
              <Card className="tour-page__included-card">
                <h2 className="tour-page__section-title">
                  {t.tourPage.included}
                </h2>
                <ul className="tour-page__included-list">
                  {translatedTour.included.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Card>
              <Card className="tour-page__included-card">
                <h2 className="tour-page__section-title">
                  {t.tourPage.notIncluded}
                </h2>
                <ul className="tour-page__included-list">
                  {translatedTour.notIncluded.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Card>
            </div>

            {reviews && reviews.length > 0 && (
              <Card className="tour-page__reviews">
                <h2 className="tour-page__section-title">
                  {t.tourPage.reviews}
                </h2>
                <div className="tour-page__reviews-list">
                  {reviews.map((review) => (
                    <div key={review.id} className="tour-page__review">
                      <div className="tour-page__review-header">
                        <div className="tour-page__review-author">
                          {review.author}
                        </div>
                        <Rating value={review.rating} readOnly size="small" />
                      </div>
                      <p className="tour-page__review-comment">
                        {review.comment}
                      </p>
                      <div className="tour-page__review-date">
                        {formatDateShort(review.date)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <aside className="tour-page__sidebar">
            <Card className="tour-page__booking">
              <div className="tour-page__price">
                {formatPrice(translatedTour.price, translatedTour.currency)}
              </div>
              <Button className="tour-page__book-button" fullWidth>
                {t.tourPage.book}
              </Button>
            </Card>
          </aside>
        </div>
      </div>

      <div className="tour-page__fixed-cta">
        <div className="container">
          <div className="tour-page__fixed-cta-content">
            <div className="tour-page__fixed-cta-price">
              {formatPrice(translatedTour.price, translatedTour.currency)}
            </div>
            <Button className="tour-page__fixed-cta-button">
              {t.tourPage.book}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
