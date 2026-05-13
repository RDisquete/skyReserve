import { create } from 'zustand';
import type { Booking, DroneService } from '../types/types';

interface AppState {
  selectedService: DroneService | null;
  bookings: Booking[];
  isAdmin: boolean;
  
  // Acciones
  setSelectedService: (service: DroneService | null) => void;
  setBookings: (bookings: Booking[]) => void;
  toggleAdmin: () => void;
  
  // Lógica de disponibilidad dinámica
  getAvailableSlots: (date: string, service: DroneService) => string[];
}

export const useStore = create<AppState>((set, get) => ({
  selectedService: null,
  bookings: [], 
  isAdmin: false,

  setSelectedService: (service) => set({ selectedService: service }),
  
  setBookings: (bookings) => set({ bookings }),

  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),

  getAvailableSlots: (date, service) => {
    // 1. Rango maestro de operación de la plataforma
    const masterSlots = [
      '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
      '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
    ];

    // 2. Filtramos según la ventana operativa específica del servicio contratado
    const serviceSlots = masterSlots.filter(slot => 
      slot >= service.available_from && slot <= service.available_until
    );

    // 3. Cruzamos con las reservas reales para evitar duplicados
    const bookedSlots = get().bookings
      .filter(b => 
        b.service_id === service.id && 
        b.booking_date === date && 
        b.status !== 'cancelled'
      )
      .map(b => b.booking_time);
    
    return serviceSlots.filter(slot => !bookedSlots.includes(slot));
  }
}));