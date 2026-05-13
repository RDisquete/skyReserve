import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Navbar } from './components/layout/Navbar';
import { useThemeStore } from './store/themeStore';

// Code splitting con lazy loading
const Landing = lazy(() => import('./pages/Landing'));
const Booking = lazy(() => import('./pages/Booking'));
const MyBookings = lazy(() => import('./pages/MyBookings'));
const AdminDashboard = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
  </div>
);

// Componente para proteger rutas de admin
const ProtectedAdmin = () => {
  const { user, isAdmin, initialized } = useAuthStore();
  
  if (!initialized) return null;
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (!isAdmin) return <Navigate to="/" replace />;
  
  return <AdminDashboard />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const { isDark } = useThemeStore();
  const initAuth = useAuthStore((state) => state.initAuth);

useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <ScrollToTop />
      <div 
        className="min-h-screen flex flex-col bg-main text-text-primary transition-colors duration-300 font-sans selection:bg-brand-accent selection:text-white"
      >
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Suspense fallback={<PageLoader />}><Landing /></Suspense>} />
            <Route path="/contratar" element={<Suspense fallback={<PageLoader />}><Booking /></Suspense>} />
            <Route path="/bookings" element={<Suspense fallback={<PageLoader />}><MyBookings /></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
            <Route path="/services" element={<Suspense fallback={<PageLoader />}><Services /></Suspense>} />
            <Route path="/services/:slug" element={<Suspense fallback={<PageLoader />}><ServiceDetail /></Suspense>} />
            <Route path="/admin" element={<Suspense fallback={<PageLoader />}><ProtectedAdmin /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="py-8 border-t border-text-primary/5 bg-brand-panel/50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
            <div className="flex items-center gap-3">
              <img src="/skyreservelogo.webp" alt="SkyReserve" className="h-5 opacity-40" />
              <span className="text-[9px] text-text-secondary uppercase tracking-widest">
                © 2026 SkyReserve
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a 
                href="https://rdisquete.es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[9px] text-text-secondary hover:text-brand-accent transition-colors"
              >
                <img src="/Logo rojo claro.webp" alt="Rdisquete" className="h-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <span>Designed by</span>
                <span className="font-bold tracking-wider">Rdisquete</span>
              </a>
              
              <div className="flex items-center gap-4 border-l border-text-primary/10 pl-6">
                <a 
                  href="https://rdisquete.es" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand-accent transition-colors"
                  title="Portfolio"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/rafael-dorado-zamoro/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand-accent transition-colors"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a 
                  href="https://github.com/RDisquete" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand-accent transition-colors"
                  title="GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </Router>
  );
}