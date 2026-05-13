import { supabase } from '../lib/supabase';
import { FiCalendar, FiClock, FiMapPin, FiFileText } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import type { Booking } from '../types/types';
import { useNavigate } from 'react-router-dom';

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Si no hay usuario, redirigir a login
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setBookings(data as Booking[]);
      }
      setLoading(false);
    };
    fetchData();
  }, [user, navigate]);

  const getStatusStyles = (status: string) => {
    switch(status) {
      case 'pending': return 'border-yellow-500/50 text-yellow-500 bg-yellow-500/5';
      case 'confirmed': return 'border-brand-accent text-brand-accent bg-brand-accent/5';
      default: return 'border-text-primary/20 text-text-secondary bg-text-primary/5';
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-brand-accent animate-pulse tracking-[0.5em] text-[10px] uppercase font-black">
        Sincronizando Historial de Reservas...
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-10 py-20 sm:py-32 font-sans">
      <header className="mb-12 border-b border-text-primary/5 pb-8">
        <h1 className="text-4xl font-light text-text-primary tracking-tighter uppercase italic">
          Mis <span className="font-bold">Reservas</span>
        </h1>
        <p className="text-text-secondary text-[10px] uppercase tracking-[0.3em] mt-2">
          Gestión de servicios contratados — rdiquete
        </p>
      </header>

      {bookings.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-text-primary/10 rounded-sm">
          <p className="text-text-secondary text-[10px] uppercase tracking-widest font-mono italic">
            No se han encontrado registros de servicios contratados.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map(booking => (
            <div 
              key={booking.id}
              className="bg-brand-panel border border-text-primary/5 rounded-sm p-6 hover:border-brand-accent/30 transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-brand-accent/5 rounded-full flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-700">
                      <FiFileText size={20} />
                   </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight italic">
                      {booking.services?.title || 'Servicio Técnico'}
                    </h3>
                    <p className="text-[9px] font-mono text-text-secondary uppercase mt-1 tracking-widest">
                      REF-ORDEN: {booking.id.slice(0, 8)}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 border text-[9px] font-black uppercase tracking-widest self-start transition-colors ${getStatusStyles(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[10px] text-text-secondary uppercase tracking-[0.15em] mb-8 font-light">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-brand-accent" size={14} />
                  <span>{booking.booking_date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiClock className="text-brand-accent" size={14} />
                  <span>{booking.booking_time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-brand-accent" size={14} />
                  <span className="truncate">Ubicación a Designar</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}