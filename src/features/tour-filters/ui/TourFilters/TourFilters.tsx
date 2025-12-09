import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { TOUR_TYPES } from '@/shared/constants/tourTypes';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useTourFilters } from '../../model/useTourFilters';
import { useTranslation } from '@/shared/lib/useTranslation';
import './TourFilters.scss';

export const TourFilters = () => {
  const {
    country,
    dateFrom,
    dateTo,
    budgetMin,
    budgetMax,
    visaRequired,
    tourType,
    stars,
    setCountry,
    setDateRange,
    setBudget,
    setVisaRequired,
    setTourType,
    setStars,
    resetFilters,
  } = useTourFilters();
  const { t } = useTranslation();

  return (
    <div className="tour-filters">
      <h3 className="tour-filters__title">{t.tourFilters.title}</h3>
      <Input
        label={t.tourFilters.country}
        value={country || ''}
        onChange={(e) => setCountry(e.target.value || null)}
        fullWidth
      />
      <Input
        label={t.tourFilters.dateFrom}
        type="date"
        value={dateFrom || ''}
        onChange={(e) => setDateRange(e.target.value || null, dateTo)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Input
        label={t.tourFilters.dateTo}
        type="date"
        value={dateTo || ''}
        onChange={(e) => setDateRange(dateFrom, e.target.value || null)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Input
        label={t.tourFilters.budgetFrom}
        type="number"
        value={budgetMin || ''}
        onChange={(e) =>
          setBudget(e.target.value ? Number(e.target.value) : null, budgetMax)
        }
        fullWidth
      />
      <Input
        label={t.tourFilters.budgetTo}
        type="number"
        value={budgetMax || ''}
        onChange={(e) =>
          setBudget(budgetMin, e.target.value ? Number(e.target.value) : null)
        }
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>{t.tourFilters.type}</InputLabel>
        <Select
          value={tourType || ''}
          onChange={(e) => setTourType(e.target.value || null)}
          label={t.tourFilters.type}
        >
          <MenuItem value="">{t.tourFilters.typeAll}</MenuItem>
          {Object.values(TOUR_TYPES).map((type) => (
            <MenuItem key={type} value={type}>
              {t.tourFilters.typeLabels[type]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>{t.tourFilters.stars}</InputLabel>
        <Select
          value={stars || ''}
          onChange={(e) =>
            setStars(e.target.value ? Number(e.target.value) : null)
          }
          label={t.tourFilters.stars}
        >
          <MenuItem value="">{t.tourFilters.starsAll}</MenuItem>
          <MenuItem value={3}>3★</MenuItem>
          <MenuItem value={4}>4★</MenuItem>
          <MenuItem value={5}>5★</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={visaRequired === true}
            indeterminate={visaRequired === null}
            onChange={(e) => {
              if (e.target.checked) {
                setVisaRequired(true);
              } else {
                setVisaRequired(null);
              }
            }}
          />
        }
        label={t.tourFilters.visa}
      />
      <Button variant="secondary" onClick={resetFilters} fullWidth>
        {t.tourFilters.reset}
      </Button>
    </div>
  );
};
