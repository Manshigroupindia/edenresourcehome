import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { EdenLogo } from '../common/EdenLogo';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      navigate('/admin/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinks = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Global Settings', path: '/admin/settings', icon: Settings, end: false },
    { label: 'Gallery CMS', path: '/admin/gallery', icon: ImageIcon, end: false },
  ];

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col md:flex-row text-on-surface">
      {/* Mobile Header Bar */}
      <header className="md:hidden h-16 bg-primary text-on-primary px-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <Link to="/admin" className="flex items-center gap-2.5">
          <EdenLogo showText={false} className="h-8 w-8" />
          <div className="flex flex-col">
            <span className="font-headline-sm text-[16px] text-white font-bold leading-none">
              {settings.siteName}
            </span>
            <span className="text-[10px] text-primary-fixed tracking-wider uppercase font-semibold">
              CMS Portal
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-surface-container-lowest/15 text-white hover:bg-surface-container-lowest/25 transition-colors"
          aria-label={mobileSidebarOpen ? 'Close admin sidebar' : 'Open admin sidebar'}
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-primary/60 backdrop-blur-xs md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar: Desktop fixed & Mobile slide-out drawer */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-50 w-72 bg-primary text-on-primary flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-xl md:shadow-none h-screen`}
      >
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <Link
              to="/admin"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center gap-3"
            >
              <EdenLogo showText={false} className="h-9 w-9" />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[18px] text-white font-bold tracking-tight leading-tight">
                  {settings.siteName}
                </span>
                <span className="text-[11px] text-secondary-fixed font-semibold tracking-wide uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> CMS Admin
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-[14px] transition-all ${
                      isActive
                        ? 'bg-secondary text-white font-semibold shadow-xs'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer info & logout */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          {/* Public Site link */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/85 text-[13px] font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-secondary-fixed" />
              View Public Website
            </span>
          </Link>

          {/* User profile capsule */}
          <div className="px-3.5 py-2.5 rounded-xl bg-primary-container border border-white/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-[13px] shrink-0">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-white/60 uppercase font-semibold tracking-wider">
                Logged in as
              </span>
              <span className="text-[12px] text-white font-medium truncate" title={user?.email || 'Admin'}>
                {user?.email}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-error/15 text-error-container hover:bg-error hover:text-white text-[13.5px] font-semibold transition-all disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
