import { Button } from '@/shared/ui/Button';
import { useTranslation } from '@/shared/lib/useTranslation';
import './EmptyState.scss';

interface EmptyStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState = ({
  title,
  message,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) => {
  const { t } = useTranslation();
  const resolvedTitle = title ?? t.emptyState.title;

  return (
    <div className="empty-state">
      {icon && <div className="empty-state__icon">{icon}</div>}
      <h3 className="empty-state__title">{resolvedTitle}</h3>
      <p className="empty-state__message">{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
