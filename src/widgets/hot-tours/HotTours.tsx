import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { TourCard } from '@/entities/tour';
import { LoadingSpinner, ErrorDisplay, EmptyState } from '@/shared/ui';
import { useHotTours } from './model/useHotTours';
import { useTranslation } from '@/shared/lib/useTranslation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HotTours.scss';

export const HotTours = () => {
  const { hotTours, isLoading, isError, error } = useHotTours();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="hot-tours">
        <div className="container">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="hot-tours">
        <div className="container">
          <ErrorDisplay error={error} />
        </div>
      </section>
    );
  }

  if (hotTours.length === 0) {
    return (
      <section className="hot-tours">
        <div className="container">
          <EmptyState message={t.hotTours.empty} />
        </div>
      </section>
    );
  }

  return (
    <section className="hot-tours">
      <div className="container">
        <h2 className="hot-tours__title">{t.hotTours.title}</h2>
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
          className="hot-tours__slider"
        >
          {hotTours.map((tour) => (
            <SwiperSlide key={tour.id}>
              <TourCard tour={tour} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
