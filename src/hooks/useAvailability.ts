import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useAvailability = (serviceId: string | undefined, selectedDate: string) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedDate || !serviceId) {
        setBookedSlots([]);
        return;
      }

      setLoading(true);
      setBookedSlots([]);

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('booking_time, duration_hours')
          .eq('service_id', serviceId)
          .eq('booking_date', selectedDate)
          .neq('status', 'cancelled');

        if (error) throw error;

        if (data) {
          const allBookedSlots: string[] = [];
          data.forEach(b => {
            const startHour = parseInt(b.booking_time.split(':')[0]);
            const duration = b.duration_hours || 1;
            for (let i = 0; i < duration; i++) {
              const hour = String(startHour + i).padStart(2, '0') + ':00';
              if (!allBookedSlots.includes(hour)) {
                allBookedSlots.push(hour);
              }
            }
          });
          setBookedSlots(allBookedSlots);
        }
      } catch (err) {
        console.error("Fallo crítico en sincronización de disponibilidad:", err);
        setBookedSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedDate, serviceId]);

  return { bookedSlots, loading };
};