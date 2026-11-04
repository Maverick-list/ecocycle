import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { WasteBankProvider } from './context/WasteBankContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WasteDepositModal } from './components/features/WasteDepositModal';
import { DepositDetailModal } from './components/features/DepositDetailModal';
import { Toast } from './components/ui/Toast';
import { EcoChatbot } from './components/chat/EcoChatbot';
import { LoadingExperience } from './components/ui/LoadingExperience';
import { LeafPageTransition } from './components/ui/LeafPageTransition';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import { HomePage } from './pages/Home/HomePage';
import { WasteBankPage } from './pages/WasteBank/WasteBankPage';
import { SmartSortingPage } from './pages/SmartSorting/SmartSortingPage';
import { EcoImpactPage } from './pages/EcoImpact/EcoImpactPage';
import { EcoAcademyPage } from './pages/EcoAcademy/EcoAcademyPage';
import { EcoChallengesPage } from './pages/EcoChallenges/EcoChallengesPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { WasteDepositPage } from './pages/WasteDeposit/WasteDepositPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { AnalyticsPage } from './pages/Analytics/AnalyticsPage';
import { TutorialPage } from './pages/Tutorial/TutorialPage';
import { FAQPage } from './pages/FAQ/FAQPage';
import { SignInPage } from './pages/Auth/SignInPage';
import { SignUpPage } from './pages/Auth/SignUpPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';
import { EmailVerificationPage } from './pages/Auth/EmailVerificationPage';
import { AuthCallbackPage } from './pages/Auth/AuthCallbackPage';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main container that dynamically manages navbar offset
const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <main id="main-content" className={`flex-1 w-full ${isHome ? '' : 'pt-20'}`}>
      {children}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WasteBankProvider>
          <BrowserRouter>
            <ScrollToTop />
            
            {/* First-Visit Animated Introduction & Loading Experience */}
            <LoadingExperience />

            {/* Smooth Organic Leaf Navigation Page Transition */}
            <LeafPageTransition />

            <div className="min-h-screen flex flex-col bg-surface dark:bg-[#03140d] text-on-surface dark:text-white antialiased transition-colors duration-300">
              {/* Skip link for keyboard accessibility */}
              <a href="#main-content" className="skip-link">
                Lewati ke Konten Utama
              </a>

              {/* Global Sticky Navigation */}
              <Navbar />

              {/* Main App Container */}
              <MainContainer>
                <Routes>
                  {/* Public Platform Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/bank-sampah" element={<WasteBankPage />} />
                  <Route path="/pemilahan-pintar" element={<SmartSortingPage />} />
                  <Route path="/dampak-ekologis" element={<EcoImpactPage />} />
                  <Route path="/analitik" element={<AnalyticsPage />} />
                  <Route path="/akademi" element={<EcoAcademyPage />} />
                  <Route path="/tantangan" element={<EcoChallengesPage />} />
                  <Route path="/kontak" element={<ContactPage />} />
                  <Route path="/setor-sampah" element={<WasteDepositPage />} />
                  <Route path="/panduan" element={<TutorialPage />} />
                  <Route path="/faq" element={<FAQPage />} />

                {/* Authentication Routes */}
                <Route path="/masuk" element={<SignInPage />} />
                <Route path="/login" element={<Navigate to="/masuk" replace />} />
                <Route path="/daftar" element={<SignUpPage />} />
                <Route path="/register" element={<Navigate to="/daftar" replace />} />
                <Route path="/lupa-password" element={<ForgotPasswordPage />} />
                <Route path="/verifikasi-email" element={<EmailVerificationPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />

                {/* Protected User Dashboard Route */}
                <Route
                  path="/profil"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                {/* Navigation Aliases & Redirects */}
                <Route path="/dashboard" element={<Navigate to="/profil" replace />} />
                <Route path="/profile" element={<Navigate to="/profil" replace />} />
                <Route path="/analytics" element={<Navigate to="/analitik" replace />} />
                <Route path="/tutorial" element={<Navigate to="/panduan" replace />} />
                <Route path="/akademi-dan-tantangan" element={<Navigate to="/akademi" replace />} />
                <Route path="/tentang-dan-kontak" element={<Navigate to="/kontak" replace />} />

                {/* Wildcard Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              </MainContainer>

            {/* Global Footer */}
            <Footer />

            {/* Global Modals & Notifications */}
            <WasteDepositModal />
            <DepositDetailModal />
            <EcoChatbot />
            <Toast />
          </div>
        </BrowserRouter>
      </WasteBankProvider>
    </AuthProvider>
  </ThemeProvider>
);
};

export default App;
