import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useReviews } from '@/shared/api';
import { Card } from '@/shared/ui/Card';
import { LoadingSpinner, ErrorDisplay, EmptyState } from '@/shared/ui';
import { formatDateShort } from '@/shared/lib/formatDate';
import { Rating } from '@mui/material';
import { useTranslation } from '@/shared/lib/useTranslation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ReviewsSlider.scss';

export const ReviewsSlider = () => {
  const { data: reviews, isLoading, isError, error } = useReviews();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="reviews-slider">
        <div className="container">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="reviews-slider">
        <div className="container">
          <ErrorDisplay error={error} />
        </div>
      </section>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <section className="reviews-slider">
        <div className="container">
          <EmptyState title={t.emptyState.title} message={t.emptyState.title} />
        </div>
      </section>
    );
  }

  return (
    <section className="reviews-slider">
      <div className="container">
        <h2 className="reviews-slider__title">{t.reviews.title}</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="reviews-slider__slider"
        >
          {reviews?.map((review) => (
            <SwiperSlide key={review.id}>
              <Card className="reviews-slider__card">
                <div className="reviews-slider__header">
                  <div className="reviews-slider__author">{review.author}</div>
                  <Rating value={review.rating} readOnly size="small" />
                </div>
                <p className="reviews-slider__comment">{review.comment}</p>
                <div className="reviews-slider__date">
                  {formatDateShort(review.date)}
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
