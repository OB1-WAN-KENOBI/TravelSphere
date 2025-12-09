import { Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { LoadingSpinner } from '@/shared/ui';
import { pageVariants, pageTransition } from '@/shared/constants/animations';
import {
  HomePage,
  ToursPage,
  TourPage,
  DestinationsPage,
  DestinationPage,
  ServicesPage,
  PromotionsPage,
  AboutPage,
  ContactsPage,
  ProfilePage,
} from './routes';
import './App.scss';

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/tours" element={<ToursPage />} />
                <Route path="/tours/:id" element={<TourPage />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destinations/:id" element={<DestinationPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/promotions" element={<PromotionsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/profile/*" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
