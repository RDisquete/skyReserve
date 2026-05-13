import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { DroneService } from '../types/types';

export const useServices = () => {
  const [services, setServices] = useState<DroneService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isMounted = useRef(true);

  const fetchServices = useCallback(async () => {
    try {

      if (isMounted.current) setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (supabaseError) throw supabaseError;

      if (isMounted.current) {
        setServices((data as DroneService[]) || []);
      }
    } catch (err) {
      if (isMounted.current) {
        console.error("Error al sincronizar catálogo de flota:", err);
        setError(err instanceof Error ? err.message : 'Error al recuperar servicios');
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    
    const initFetch = async () => {
      await fetchServices();
    };

    initFetch();

    return () => {
      isMounted.current = false;
    };
  }, [fetchServices]); 

  return { services, loading, error, refetch: fetchServices };
};