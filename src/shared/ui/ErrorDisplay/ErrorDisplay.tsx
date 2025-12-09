import { Button } from '@/shared/ui/Button';
import { useTranslation } from '@/shared/lib/useTranslation';
import './ErrorDisplay.scss';

interface ErrorDisplayProps {
  error: Error | unknown;
  onRetry?: () => void;
  title?: string;
  message?: string;
}

export const ErrorDisplay = ({
  error,
  onRetry,
  title,
  message,
}: ErrorDisplayProps) => {
  const { t } = useTranslation();
  const defaultTitle = t.errorDisplay.title;
  const defaultMessage = t.errorDisplay.message;
  const errorMessage =
    error instanceof Error ? error.message : t.errorDisplay.unknown;

  return (
    <div className="error-display">
      <div className="error-display__content">
        <h2 className="error-display__title">{title ?? defaultTitle}</h2>
        <p className="error-display__message">{message ?? defaultMessage}</p>
        {process.env.NODE_ENV === 'development' && (
          <details className="error-display__details">
            <summary>{t.errorDisplay.details}</summary>
            <pre>{errorMessage}</pre>
          </details>
        )}
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            {t.errorDisplay.retry}
          </Button>
        )}
      </div>
    </div>
  );
};
