import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiArrowRight, FiUser, FiChevronDown } from 'react-icons/fi';
import { useServices } from '../hooks/useServices';
import { useAvailability } from '../hooks/useAvailability';
import { useAuthStore } from '../store/authStore';
import { TimeGrid } from '../components/ui/TimeGrid';
import { supabase } from '../lib/supabase';

export default function Booking() {
  const navigate = useNavigate();
  const { services, loading: servicesLoading, error: servicesError } = useServices();
  const { user } = useAuthStore();

  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmailInput, setCustomerEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasBooked = useRef(false);

  // Valor efectivo: usa el seleccionado por el usuario o el primero disponible como fallback
  const effectiveServiceId = selectedServiceId || services[0]?.id || '';

  // Use user's data if logged in, otherwise use the input fields
  const effectiveCustomerEmail = user?.email || customerEmailInput;
  const effectiveCustomerName = user?.user_metadata?.full_name || customerName || user?.email?.split('@')[0] || 'Cliente';

  const service = services.find((s) => s.id === effectiveServiceId);
  const { bookedSlots, loading: loadingSlots } = useAvailability(effectiveServiceId, selectedDate);
  const pricePerHour = service?.price_per_hour || 0;
  const totalPrice = pricePerHour * duration;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (hasBooked.current) return;
    
    if (!selectedTime) {
      setError('Por favor selecciona una hora');
      return;
    }
    
    if (!effectiveServiceId) {
      setError('Por favor selecciona un servicio');
      return;
    }
    
    if (!effectiveCustomerEmail || !effectiveCustomerName) {
      setError('Por favor completa tus datos');
      return;
    }
    
    hasBooked.current = true;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('bookings').insert([
        {
          service_id: effectiveServiceId,
          customer_name: effectiveCustomerName,
          customer_email: effectiveCustomerEmail,
          booking_date: selectedDate,
          booking_time: selectedTime,
          duration_hours: duration,
          status: 'pending'
        }
      ]);

      if (error) {
        hasBooked.current = false;
        throw error;
      }
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/bookings');
      }, 2000);
    } catch (err) {
      console.error("Error en la operación:", err);
      setError('Error al procesar la reserva');
      setIsSubmitting(false);
    }
  };

  if (servicesLoading) {
    return <div className="pt-40 text-center uppercase tracking-widest opacity-50">Sincronizando...</div>;
  }

  if (servicesError) {
    return <div className="pt-40 text-center uppercase tracking-widest opacity-50">Error: {servicesError}</div>;
  }

  if (services.length === 0) {
    return <div className="pt-40 text-center uppercase tracking-widest opacity-50">No hay servicios disponibles</div>;
  }

  if (!service && effectiveServiceId) {
    return <div className="pt-40 text-center uppercase tracking-widest opacity-50">Unidad no localizada</div>;
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-8 md:px-10 bg-main transition-colors duration-500">
      {showSuccess && (
        <div className="fixed top-24 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-sm shadow-xl border-l-4 border-green-400 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Solicitud de vuelo procesada correctamente
            </span>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-600/20 border border-red-500 text-red-400 text-[10px] uppercase tracking-widest">
            Error: {error}
          </div>
        )}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-brand-accent mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Módulo de Contratación</span>
            <FiArrowRight size={10} />
            <span className="text-[10px] text-text-secondary uppercase tracking-[0.4em]">{service?.category}</span>
          </div>
          <h1 className="text-5xl font-light text-text-primary tracking-tighter uppercase italic">
            Configurar <span className="font-bold">Unidad {service?.title}</span>
          </h1>
        </header>

        <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">

            {/* SECCIÓN CALENDARIO */}
            <div className="p-10 border border-text-primary/10 bg-brand-panel rounded-sm relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent opacity-50" />
              <h2 className="text-[11px] font-bold text-text-primary uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <FiCalendar className="text-brand-accent" /> Ventana Operativa
              </h2>

              <div className="mb-10">
                <label className="block text-[9px] uppercase text-text-secondary tracking-widest mb-3 italic">Fecha de Vuelo</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime(null);
                  }}
                  className="w-full md:w-1/2 bg-main border border-text-primary/10 p-4 text-sm text-text-primary focus:border-brand-accent outline-none font-mono transition-colors"
                  required
                />
              </div>

              {loadingSlots ? (
                <div className="py-12 text-center text-[10px] text-text-secondary animate-pulse uppercase tracking-[0.4em]">
                  Sincronizando disponibilidad...
                </div>
              ) : (
                <TimeGrid
                  selectedTime={selectedTime}
                  onSelect={(time: string) => setSelectedTime(time)}
                  bookedSlots={bookedSlots}
                  serviceFrom={service?.available_from || '08:00'}
                  serviceUntil={service?.available_until || '20:00'}
                  duration={duration}
                />
              )}

              {/* SELECTOR DE DURACIÓN */}
              {selectedTime && (
                <div className="mt-8 pt-8 border-t border-text-primary/5">
                  <label className="block text-[9px] uppercase text-text-secondary tracking-widest mb-4 italic">
                    Duración del Vuelo
                  </label>
                  <div className="flex gap-3 flex-wrap">
                    {[1, 2, 3, 4, 6, 8].map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setDuration(h)}
                        className={`px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all border
                          ${duration === h
                            ? 'bg-brand-accent text-white border-brand-accent'
                            : 'bg-main border-text-primary/10 text-text-secondary hover:border-brand-accent hover:text-text-primary'
                          }`}
                      >
                        {h}h
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-[9px] text-text-secondary italic tracking-widest">
                    Operación de {selectedTime} a{' '}
                    {(() => {
                      const [hh, mm] = selectedTime.split(':').map(Number);
                      const end = new Date(0, 0, 0, hh + duration, mm);
                      return `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;
                    })()}
                  </p>
                </div>
              )}
            </div>

            {/* SECCIÓN CLIENTE */}
            <div className="p-10 border border-text-primary/10 bg-brand-panel rounded-sm">
              <h2 className="text-[11px] font-bold text-text-primary uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <FiUser className="text-brand-accent" /> {user ? 'Datos de Enlace' : 'Identificación'}
              </h2>
              
              {!user ? (
                <div className="text-center py-8">
                  <p className="text-text-secondary text-sm mb-6">
                    Inicia sesión o regístrate para una mejor experiencia:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      type="button"
                      onClick={() => navigate('/login', { state: { from: '/contratar' } })}
                      className="px-6 py-3 text-[10px] font-black uppercase tracking-widest border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white transition-all"
                    >
                      Iniciar Sesión
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/login?signup=true', { state: { from: '/contratar' } })}
                      className="px-6 py-3 text-[10px] font-black uppercase tracking-widest bg-brand-accent text-white hover:bg-white hover:text-brand-accent transition-all"
                    >
                      Registrarse
                    </button>
                  </div>
                  <p className="text-text-secondary text-[10px] mt-6 italic">
                    También puedes continuar sin registrarte
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-sm">
                    <FiUser className="text-green-500" size={14} />
                    <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest">
                      Sesión iniciada
                    </span>
                  </div>
                  <p className="text-text-primary text-sm mt-3 font-mono">
                    {effectiveCustomerEmail}
                  </p>
                  {effectiveCustomerName && (
                    <p className="text-text-secondary text-xs mt-1">
                      {effectiveCustomerName}
                    </p>
                  )}
                </div>
              )}
              
              {!user && (
                <div className="mt-6 pt-6 border-t border-text-primary/5">
                  <p className="text-[9px] uppercase text-text-secondary tracking-widest mb-3 italic">O continúa como invitado</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="NOMBRE COMPLETO"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-main border border-text-primary/10 p-4 text-[11px] text-text-primary focus:border-brand-accent outline-none uppercase tracking-widest"
                      required
                    />
                    <input
                      type="email"
                      placeholder="EMAIL"
                      value={effectiveCustomerEmail}
                      onChange={(e) => setCustomerEmailInput(e.target.value)}
                      className="w-full bg-main border border-text-primary/10 p-4 text-[11px] text-text-primary focus:border-brand-accent outline-none uppercase tracking-widest"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR DE RESUMEN */}
          <aside className="lg:col-span-1">
            <div className="p-8 border border-text-primary/10 bg-brand-panel rounded-sm sticky top-32 space-y-6">

              {/* SELECTOR DE SERVICIO */}
              <div>
                <p className="text-[9px] uppercase text-text-secondary tracking-widest mb-2 italic">Unidad Activa</p>
                <div className="relative">
                  <select
                    value={selectedServiceId}
                    onChange={(e) => {
                      setSelectedServiceId(e.target.value);
                      setSelectedTime(null);
                      setDuration(1);
                    }}
                    className="w-full appearance-none bg-main border border-text-primary/10 p-4 text-[11px] font-bold text-text-primary uppercase tracking-widest focus:border-brand-accent outline-none cursor-pointer pr-10"
                  >
                    <option value="">Seleccionar unidad</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={12} />
                </div>
              </div>

              {/* TARIFA */}
              <div className="pt-4 border-t border-text-primary/5">
                <p className="text-[9px] uppercase text-text-secondary tracking-widest mb-1 italic">Tarifa Base</p>
                <p className="text-lg font-mono text-text-primary">
                  €{pricePerHour} <span className="text-xs opacity-30">/h</span>
                </p>
              </div>

              {/* TOTAL */}
              <div className="pt-4 border-t border-text-primary/5">
                <p className="text-[9px] uppercase text-text-secondary tracking-widest mb-1 italic">Total Estimado</p>
                <p className="text-3xl font-mono text-brand-accent">
                  €{totalPrice}
                  <span className="text-xs opacity-30 ml-1">{duration}h</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={!selectedTime || isSubmitting}
                className={`w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all
                  ${!selectedTime || isSubmitting
                    ? 'bg-text-primary/5 text-text-secondary cursor-not-allowed border border-text-primary/10'
                    : 'bg-brand-accent text-white hover:bg-white hover:text-black shadow-xl shadow-brand-accent/20 cursor-pointer'
                  }`}
              >
                {isSubmitting ? 'Transmitiendo...' : 'Confirmar Reserva'}
              </button>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};