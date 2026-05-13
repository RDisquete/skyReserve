import { useState } from 'react';
import { useAdminBookings } from '../hooks/useAdminBookings';
import { supabase } from '../lib/supabase';
import { Activity, Clock, Trash2, User, CheckCircle } from 'lucide-react';
import type { Booking } from '../types/types';

export default function AdminDashboard() {
  const { bookings, loading, refetch } = useAdminBookings();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const updateStatus = async (id: string, newStatus: string) => {
    console.log("Updating booking:", id, "to", newStatus);
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);
    
    if (error) {
      console.error("Error actualizando servicio:", error);
      setNotification({ message: 'Error: ' + error.message, type: 'error' });
    } else {
      if (newStatus === 'confirmed') {
        setNotification({ message: 'Servicio confirmado', type: 'success' });
      } else if (newStatus === 'cancelled') {
        setNotification({ message: 'Reserva cancelada', type: 'success' });
      }
      refetch();
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const deleteBooking = async (id: string) => {
    console.log("Deleting booking:", id);
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Error deleting:", error);
      setNotification({ message: 'Error: ' + error.message, type: 'error' });
    } else {
      setNotification({ message: 'Reserva eliminada', type: 'success' });
      refetch();
      setTimeout(() => setNotification(null), 4000);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-brand-accent animate-pulse tracking-[0.5em] text-xs uppercase font-black font-mono">
        Actualizando base de datos...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 sm:pt-24 px-4 sm:px-8 font-sans">
      {notification && (
        <div className={`fixed top-24 right-6 z-50 px-6 py-4 rounded-sm shadow-xl border-l-4 animate-fade-in ${
          notification.type === 'success' 
            ? 'bg-green-600 border-green-400 text-white' 
            : 'bg-red-600 border-red-400 text-white'
        }`}>
          <div className="flex items-center gap-3">
            <CheckCircle size={16} />
            <span className="text-[11px] font-bold uppercase tracking-wider">{notification.message}</span>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/5 pb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-accent mb-2">
              <Activity size={16} className="text-brand-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Panel Administrativo</span>
            </div>
            <h1 className="text-5xl font-light tracking-tighter italic uppercase">
              Gestión de <span className="font-bold">Reservas</span>
            </h1>
          </div>
          <div className="text-right font-mono text-[10px] text-white/40 uppercase tracking-widest">
            Flota Conectada // {new Date().toLocaleDateString()}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking: Booking) => (
            <div key={booking.id} className="bg-white/2 border border-white/5 p-6 rounded-sm relative overflow-hidden group hover:border-white/10 transition-all">
              {/* Indicador de estado lateral */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-500 ${
                booking.status === 'pending' ? 'bg-yellow-500' : 
                booking.status === 'confirmed' ? 'bg-brand-accent' : 'bg-red-900/50'
              }`} />

              <div className="flex justify-between mb-6">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-tighter">
                  REF-{booking.id.slice(0, 8)}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                  booking.status === 'confirmed' ? 'text-brand-accent' : 'text-white/60'
                }`}>
                  {booking.status}
                </span>
              </div>

              <h3 className="text-xl font-bold uppercase mb-2 tracking-tight italic text-text-primary">
                {booking.services?.title || 'Servicio General'}
              </h3>
              
              <div className="space-y-3 mb-8 text-white/60 text-[11px] uppercase tracking-wider font-light">
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-brand-accent"/> 
                  {booking.booking_date} <span className="text-white/20">//</span> {booking.booking_time}
                </div>
                <div className="flex items-center gap-2">
                  <User size={12} className="text-brand-accent"/> 
                  <span className="text-white font-medium">{booking.customer_name}</span>
                </div>
              </div>

              <div className="flex gap-2 border-t border-white/5 pt-6">
                {booking.status === 'pending' && (
                  <button 
                    onClick={() => updateStatus(booking.id, 'confirmed')}
                    className="flex-1 bg-white text-black text-[10px] font-black py-3 uppercase hover:bg-brand-accent hover:text-white transition-all cursor-pointer tracking-widest flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={14} /> Confirmar Reserva
                  </button>
                )}
                <button 
                  onClick={() => deleteBooking(booking.id)}
                  className="px-4 py-3 border border-white/10 text-white/40 hover:text-red-900 hover:border-red-900 transition-all cursor-pointer flex items-center justify-center"
                  title="Eliminar Reserva"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}