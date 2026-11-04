import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { WasteBankProvider } from './context/WasteBankContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WasteDepositModal } from './components/features/WasteDepositModal';
import { DepositDetailModal } from './components/features/DepositDetailModal';
import { Toast } from './components/ui/Toast';

import { HomePage } from './pages/Home/HomePage';
import { WasteBankPage } from './pages/WasteBank/WasteBankPage';
import { SmartSortingPage } from './pages/SmartSorting/SmartSortingPage';
import { EcoImpactPage } from './pages/EcoImpact/EcoImpactPage';
import { EcoAcademyPage } from './pages/EcoAcademy/EcoAcademyPage';
import { EcoChallengesPage } from './pages/EcoChallenges/EcoChallengesPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { WasteDepositPage } from './pages/WasteDeposit/WasteDepositPage';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <WasteBankProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased">
          {/* Skip link for keyboard accessibility */}
          <a href="#main-content" className="skip-link">
            Lewati ke Konten Utama
          </a>

          {/* Global Sticky Navigation */}
          <Navbar />

          {/* Main App Container */}
          <main id="main-content" className="flex-1 w-full pt-20">
            <Routes>
              {/* All Eight Primary Competition Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/bank-sampah" element={<WasteBankPage />} />
              <Route path="/pemilahan-pintar" element={<SmartSortingPage />} />
              <Route path="/dampak-ekologis" element={<EcoImpactPage />} />
              <Route path="/akademi" element={<EcoAcademyPage />} />
              <Route path="/tantangan" element={<EcoChallengesPage />} />
              <Route path="/kontak" element={<ContactPage />} />
              <Route path="/setor-sampah" element={<WasteDepositPage />} />

              {/* Stitch Route Aliases & Redirects */}
              <Route path="/akademi-dan-tantangan" element={<Navigate to="/akademi" replace />} />
              <Route path="/tentang-dan-kontak" element={<Navigate to="/kontak" replace />} />

              {/* Wildcard Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Global Modal & Notifications */}
          <WasteDepositModal />
          <DepositDetailModal />
          <Toast />
        </div>
      </BrowserRouter>
    </WasteBankProvider>
  );
};

export default App;
