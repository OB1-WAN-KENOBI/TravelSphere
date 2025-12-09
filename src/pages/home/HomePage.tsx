import { HeroSearch } from '@/widgets/hero-search';
import { PopularDestinations } from '@/widgets/popular-destinations';
import { HotTours } from '@/widgets/hot-tours';
import { Advantages } from '@/widgets/advantages';
import { CustomTourForm } from '@/widgets/custom-tour-form';
import { ReviewsSlider } from '@/widgets/reviews-slider';
import { Partners } from '@/widgets/partners';

export function HomePage() {
  return (
    <>
      <HeroSearch />
      <PopularDestinations />
      <HotTours />
      <Advantages />
      <CustomTourForm />
      <ReviewsSlider />
      <Partners />
    </>
  );
}
