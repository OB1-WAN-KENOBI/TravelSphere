import { Tag } from '@/shared/ui/Tag';
import { useTranslation } from '@/shared/lib/useTranslation';
import './TourMeta.scss';

interface TourMetaProps {
  country: string;
  duration: number;
  stars: number;
  visaRequired?: boolean;
}

export const TourMeta = ({
  country,
  duration,
  stars,
  visaRequired,
}: TourMetaProps) => {
  const { t } = useTranslation();

  return (
    <div className="tour-meta">
      <Tag label={country} />
      <Tag label={`${duration} ${t.tourMeta.days}`} />
      <Tag label={`${stars}★`} />
      {visaRequired && <Tag label={t.tourMeta.visaRequired} color="warning" />}
    </div>
  );
};
