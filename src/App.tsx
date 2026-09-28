import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { recordVisitorSession } from './lib/visitorCounter';
import { setupGoogleTranslateProtection } from './lib/translateProtection';

// Layouts & Guards
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { GalleryPage } from './pages/GalleryPage';
import { AwardsPage } from './pages/AwardsPage';
import { DonatePage } from './pages/DonatePage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminTeamPage } from './pages/admin/AdminTeamPage';

// Public layout wrapper containing public Navbar and Footer
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-surface font-body-md text-on-surface antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <Navbar />
      <main className="flex-grow w-full pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  useEffect(() => {
    recordVisitorSession();
    const cleanupProtection = setupGoogleTranslateProtection();
    return () => {
      cleanupProtection();
    };
  }, []);

  return (
    <AuthProvider>
      <SiteSettingsProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Website Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about-us" element={<Navigate to="/about" replace />} />
              <Route path="/our-work" element={<OurWorkPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/awards" element={<AwardsPage />} />
              <Route path="/awards-and-recognition" element={<Navigate to="/awards" replace />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/terms-and-disclaimer" element={<Navigate to="/terms" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Login Route (Unprotected login portal) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin CMS Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="team" element={<AdminTeamPage />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SiteSettingsProvider>
    </AuthProvider>
  );
};

export default App;
