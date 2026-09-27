import React, { useState } from 'react';
import { Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { EdenLogo } from '../../components/common/EdenLogo';

export const AdminLoginPage: React.FC = () => {
  const { user, login } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect to /admin or requested route
  if (user) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter your administrator email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      await login(trimmedEmail, password);
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      console.error('Login error:', firebaseError);

      if (
        firebaseError.code === 'auth/invalid-credential' ||
        firebaseError.code === 'auth/wrong-password' ||
        firebaseError.code === 'auth/user-not-found'
      ) {
        setError('Invalid email or password. Please verify your credentials.');
      } else if (firebaseError.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please wait a few moments and try again.');
      } else if (firebaseError.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError('Authentication failed. Please verify that your account exists in Firebase Authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col justify-between py-10 px-4 sm:px-6">
      {/* Top back navigation */}
      <div className="max-w-md w-full mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary text-[14px] font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Website</span>
        </Link>
      </div>

      {/* Main card */}
      <div className="max-w-md w-full mx-auto my-auto bg-surface rounded-3xl p-6 sm:p-10 shadow-xl border border-outline-variant/30">
        {/* Logo & Branding */}
        <div className="text-center flex flex-col items-center">
          <EdenLogo showText={false} className="h-14 w-14 mb-3" />
          <h1 className="font-headline-sm text-primary text-[24px] sm:text-[26px] font-bold tracking-tight">
            {settings.siteName}
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1 flex items-center justify-center gap-1.5 font-medium">
            <Shield className="w-3.5 h-3.5 text-secondary" />
            Content Management Portal Sign In
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-error-container/40 border border-error/30 text-on-error-container flex items-start gap-3 text-[13.5px]">
            <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{error}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2 font-semibold"
            >
              Administrator Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant/60">
                <Mail className="w-5 h-5" />
              </div>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@edenresourcehome.org.in"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 focus:border-secondary focus:bg-surface focus:outline-none transition-colors text-[15px]"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2 font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant/60">
                <Lock className="w-5 h-5" />
              </div>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 focus:border-secondary focus:bg-surface focus:outline-none transition-colors text-[15px]"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-[15px] shadow-md hover:bg-secondary active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In to CMS</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-5 border-t border-outline-variant/20 text-center">
          <p className="text-[12px] text-on-surface-variant/80">
            Protected area. Authorized personnel only. User accounts are managed directly via Firebase Authentication.
          </p>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="max-w-md w-full mx-auto text-center text-[12px] text-on-surface-variant/70 mt-6">
        &copy; {new Date().getFullYear()} {settings.siteName} &bull; Tallui Junction, Ukhrul, Manipur
      </div>
    </div>
  );
};
