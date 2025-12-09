import { Component, ReactNode } from 'react';
import { Button } from '@/shared/ui/Button';
import { logger } from '@/shared/lib/logger';
import { useLanguageStore } from '@/shared/store/languageStore';
import { getTranslations } from '@/shared/lib/i18n';
import './ErrorBoundary.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary компонент для обработки ошибок React
 * Перехватывает ошибки в дочерних компонентах и отображает fallback UI
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { language } = useLanguageStore.getState();
    const t = getTranslations(language);

    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h1 className="error-boundary__title">{t.errorBoundary.title}</h1>
            <p className="error-boundary__message">{t.errorBoundary.message}</p>
            {this.state.error && (
              <details className="error-boundary__details">
                <summary>{t.errorBoundary.details}</summary>
                <pre>{this.state.error.message}</pre>
              </details>
            )}
            <Button onClick={this.handleReset}>{t.errorBoundary.retry}</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
