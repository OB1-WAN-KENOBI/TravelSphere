import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ErrorBoundary } from './app/ErrorBoundary';
import { logger } from './shared/lib/logger';
import App from './app/App';
import { theme } from './app/theme';
import './app/styles/index.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Глобальная обработка ошибок через подписку
queryClient.getQueryCache().subscribe((event) => {
  if (event?.type === 'updated' && event.query.state.error) {
    logger.error('Query error:', event.query.state.error);
    // Здесь можно добавить отправку в систему мониторинга (Sentry и т.д.)
  }
});

queryClient.getMutationCache().subscribe((event) => {
  if (event?.type === 'updated' && event.mutation.state.error) {
    logger.error('Mutation error:', event.mutation.state.error);
    // Здесь можно добавить отправку в систему мониторинга
  }
});

const rootElement = document.getElementById('root');
const basename =
  (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
          basename={basename}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
