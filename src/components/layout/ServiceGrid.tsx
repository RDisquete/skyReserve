import { useState } from 'react';
import { useServices } from '../../hooks/useServices'; 
import { ServiceCard } from '../ui/ServiceCard';
import { ServiceModal } from '../ui/ServiceModal';
import { AlertCircle } from 'lucide-react';
import type { DroneService } from '../../types/types';

export const ServiceGrid = () => {
  const { services, loading, error } = useServices();
  const [selectedService, setSelectedService] = useState<DroneService | null>(null);

  // Estado de carga - mostrar directamente los servicios
  if (loading) {
    return null;
  }

  // 2. Estado de error: Elegante y funcional
  if (error) {
    return (
      <div className="max-w-xl mx-auto my-20 p-10 border border-text-primary/5 bg-brand-panel backdrop-blur-md rounded-sm text-center">
        <AlertCircle className="w-8 h-8 text-red-500/50 mx-auto mb-4" />
        <p className="text-text-secondary text-sm font-light leading-relaxed">
          Error de conexión. No se ha podido recuperar el listado de servicios activos.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 text-brand-accent text-[10px] font-bold tracking-widest uppercase border-b border-brand-accent/20 hover:border-brand-accent transition-all cursor-pointer"
        >
          Reintentar sincronización
        </button>
      </div>
    );
  }

  // 3. Renderizado final
  return (
    <section className="max-w-screen-2xl mx-auto">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service}
            onClick={() => setSelectedService(service)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedService && (
        <ServiceModal 
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};