import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Booking } from '../types/types';

export const useAdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      const { data, error: sbError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (sbError) throw sbError;
      setBookings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al sincronizar reservas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // FIX ESLint: Envolvemos la llamada inicial
    const initializeAdmin = async () => {
      await fetchBookings();
    };
    
    initializeAdmin();

    // 2. SUSCRIPCIÓN REALTIME
    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*', 
          schema: 'public',
          table: 'bookings',
        },
        (payload) => {
          console.log('Cambio detectado en el registro de reservas:', payload);
          // Al re-ejecutar fetchBookings, garantizamos que traemos los datos del JOIN
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchBookings]);

  return { bookings, loading, error, refetch: fetchBookings };
};