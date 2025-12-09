import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useHeroSearch } from './model/useHeroSearch';
import { useTranslation } from '@/shared/lib/useTranslation';
import './HeroSearch.scss';

export const HeroSearch = () => {
  const {
    searchCountry,
    setSearchCountry,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    handleSearch,
  } = useHeroSearch();
  const { t } = useTranslation();

  return (
    <section className="hero-search">
      <div className="container">
        <div className="hero-search__content">
          <h1 className="hero-search__title">{t.hero.title}</h1>
          <p className="hero-search__subtitle">{t.hero.subtitle}</p>
          <div className="hero-search__form">
            <Input
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              placeholder={t.hero.countryPlaceholder}
              className="hero-search__input"
            />
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder={t.hero.dateFromPlaceholder}
              className="hero-search__input"
            />
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder={t.hero.dateToPlaceholder}
              className="hero-search__input"
            />
            <Button onClick={handleSearch} className="hero-search__button">
              {t.hero.search}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
