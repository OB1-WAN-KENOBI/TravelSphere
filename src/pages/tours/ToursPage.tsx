import { TourFilters } from '@/features/tour-filters';
import { MobileFilters } from '@/features/tour-filters/ui/MobileFilters';
import { TourCard } from '@/entities/tour';
import { useFiltersStore } from '@/shared/store/filtersStore';
import { SortOption } from '@/shared/types/filters';
import { useSortOptions } from '@/shared/constants/sortOptions';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LoadingSpinner, ErrorDisplay, EmptyState } from '@/shared/ui';
import { useTranslation } from '@/shared/lib/useTranslation';
import { useToursPage } from './model/useToursPage';
import './ToursPage.scss';

export function ToursPage() {
  const {
    tours: filteredAndSortedTours,
    isLoading,
    isError,
    error,
    refetch,
    sortBy,
    setSortBy,
    totalCount,
  } = useToursPage();
  const filters = useFiltersStore();
  const { t } = useTranslation();
  const SORT_OPTIONS = useSortOptions();

  if (isLoading) {
    return <LoadingSpinner  fullScreen />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={() => refetch()}
        title={t.toursPage.errorTitle}
        message={t.toursPage.errorMessage}
      />
    );
  }

  return (
    <div className="tours-page">
      <div className="container">
        <h1 className="tours-page__title">{t.toursPage.title}</h1>
        <div className="tours-page__content">
          <aside className="tours-page__sidebar">
            <TourFilters />
          </aside>
          <main className="tours-page__main">
            <div className="tours-page__mobile-filters">
              <MobileFilters />
            </div>
            <div className="tours-page__header">
              <div className="tours-page__count">
                {t.toursPage.found}: {totalCount}
              </div>
              <FormControl className="tours-page__sort">
                <InputLabel>{t.toursPage.sortLabel}</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  label={t.toursPage.sortLabel}
                >
                  {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="tours-page__grid">
              {filteredAndSortedTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
            {filteredAndSortedTours.length === 0 && (
              <EmptyState
                title={t.toursPage.emptyTitle}
                message={t.toursPage.emptyMessage}
                actionLabel={t.toursPage.emptyAction}
                onAction={() => filters.resetFilters()}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
