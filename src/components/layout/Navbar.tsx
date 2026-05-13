import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, LayoutGrid, ShieldCheck, LogOut, User, X } from 'lucide-react'; 
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const { user, isAdmin, signOut } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = (
    <>
      <Link 
        to="/about"
        className={`block py-2 text-[10px] font-black tracking-[0.3em] uppercase transition-colors hover:text-brand-accent ${
          location.pathname === '/about' ? 'text-brand-accent' : 'text-text-primary'
        }`}
      >
        About
      </Link>
      <Link 
        to="/services"
        className={`block py-2 text-[10px] font-black tracking-[0.3em] uppercase transition-colors hover:text-brand-accent ${
          location.pathname.startsWith('/services') ? 'text-brand-accent' : 'text-text-primary'
        }`}
      >
        Servicios
      </Link>
      <Link 
        to="/contratar"
        className={`block py-2 text-[10px] font-black tracking-[0.3em] uppercase transition-colors hover:text-brand-accent ${
          location.pathname === '/contratar' ? 'text-brand-accent' : 'text-text-primary'
        }`}
      >
        Contratar
      </Link>
      <Link 
        to="/contact"
        className={`block py-2 text-[10px] font-black tracking-[0.3em] uppercase transition-colors hover:text-brand-accent ${
          location.pathname === '/contact' ? 'text-brand-accent' : 'text-text-primary'
        }`}
      >
        Contacto
      </Link>
    </>
  );

  const authLinks = user ? (
    <div className="flex items-center gap-4">
      <Link 
        to="/bookings"
        className="flex items-center gap-2 py-2 text-[10px] font-black tracking-[0.3em] uppercase transition-colors hover:text-brand-accent"
      >
        <LayoutGrid size={12} />
        Mis Reservas
      </Link>
      {isAdmin && (
        <Link 
          to="/admin"
          className="flex items-center gap-2 py-2 text-[10px] font-black tracking-[0.3em] uppercase transition-colors hover:text-brand-accent"
        >
          <ShieldCheck size={12} />
          Admin
        </Link>
      )}
      <button 
        onClick={async () => {
          await signOut();
          navigate('/');
        }}
        className="flex items-center gap-2 py-2 text-[10px] font-black tracking-[0.3em] uppercase text-text-secondary hover:text-red-500 transition-colors cursor-pointer"
      >
        <LogOut size={12} />
        Salir
      </button>
      <button 
        onClick={toggleTheme}
        className="text-text-secondary hover:text-brand-accent transition-colors cursor-pointer p-2"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Link 
        to="/login"
        className="flex items-center gap-2 py-2 text-[10px] font-black tracking-[0.3em] uppercase transition-colors hover:text-brand-accent"
      >
        <User size={12} />
        Login
      </Link>
      <button 
        onClick={toggleTheme}
        className="text-text-secondary hover:text-brand-accent transition-colors cursor-pointer p-2"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isScrolled || mobileMenuOpen
            ? isDark 
              ? 'bg-[#121212]/95 backdrop-blur-md py-4 border-b border-white/10' 
              : 'bg-white/95 backdrop-blur-md py-4 border-b border-black/10'
            : 'bg-transparent py-8 border-b border-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="group flex items-center cursor-pointer">
            <img 
              src="/skyreservelogo.webp" 
              alt="SkyReserve" 
              className="h-6 md:h-8 w-auto object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(121,9,9,0.6)]"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks}
            {authLinks}
          </div>

          {/* Mobile: Theme + Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="text-text-primary" size={22} />
              ) : (
                <div className="flex flex-col gap-1.5">
                  <span className="w-6 h-0.5 bg-text-primary" />
                  <span className="w-6 h-0.5 bg-text-primary" />
                  <span className="w-4 h-0.5 bg-text-primary ml-auto" />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-brand-panel border border-text-primary/10 rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-3">
              {navLinks}
              <div className="h-px bg-text-primary/10 my-3" />
              {authLinks}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};