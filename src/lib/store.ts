import { create } from 'zustand';
import type { Booking, DroneService } from '../types/types';

interface AppState {
  selectedService: DroneService | null;
  bookings: Booking[];
  isAdmin: boolean;
  
  setSelectedService: (service: DroneService | null) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'status'>) => void;
  toggleAdmin: () => void;
  getAvailableSlots: (date: string) => string[];
}

export const useStore = create<AppState>((set, get) => ({
  selectedService: null,
  bookings: [], 
  isAdmin: false,

  setSelectedService: (service) => set({ selectedService: service }),
  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),

  addBooking: (booking) => set((state) => ({
    bookings: [...state.bookings, {
      ...booking,
      id: crypto.randomUUID(),
      status: 'pending',
      created_at: new Date().toISOString() 
    } as Booking]
  })),

  getAvailableSlots: (date) => {
    const allSlots = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
    const bookedSlots = get().bookings
      .filter(b => b.booking_date === date && b.status !== 'cancelled')
      .map(b => b.booking_time);
    
    return allSlots.filter(slot => !bookedSlots.includes(slot));
  }
}));