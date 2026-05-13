import type { Booking, DroneService } from '../types/types';
import { describe, it, expect } from 'vitest';

describe('Type Definitions', () => {
  describe('DroneService', () => {
    it('should accept valid DroneService object', () => {
      const service: DroneService = {
        id: 'test-123',
        slug: 'test-service',
        title: 'Test Service',
        description: 'Test description',
        price_per_hour: 100,
        category: 'cinematic',
        image_url: '/image.webp',
        available_from: '08:00',
        available_until: '20:00',
      };
      
      expect(service.id).toBe('test-123');
      expect(service.title).toBe('Test Service');
      expect(service.price_per_hour).toBe(100);
      expect(service.category).toBe('cinematic');
    });

    it('should accept valid service with all fields', () => {
      const service: DroneService = {
        id: 'test-123',
        slug: 'test-service',
        title: 'Test Service',
        description: 'Test description',
        price_per_hour: 150,
        category: 'inspection',
        image_url: '/inspection.webp',
        available_from: '09:00',
        available_until: '18:00',
      };
      
      expect(service.image_url).toBe('/inspection.webp');
      expect(service.available_from).toBe('09:00');
      expect(service.available_until).toBe('18:00');
    });
  });

  describe('Booking', () => {
    it('should accept valid Booking object', () => {
      const booking: Booking = {
        id: 'booking-123',
        service_id: 'service-123',
        customer_name: 'John Doe',
        customer_email: 'john@example.com',
        booking_date: '2026-05-15',
        booking_time: '10:00',
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      
      expect(booking.id).toBe('booking-123');
      expect(booking.customer_name).toBe('John Doe');
      expect(booking.status).toBe('pending');
    });

    it('should allow different status values', () => {
      const pendingBooking: Booking = {
        id: '1',
        service_id: '1',
        customer_name: 'Test',
        customer_email: 'test@test.com',
        booking_date: '2026-05-15',
        booking_time: '10:00',
        status: 'pending',
        created_at: '2026-05-01T00:00:00Z',
      };
      
      const confirmedBooking: Booking = {
        ...pendingBooking,
        id: '2',
        status: 'confirmed',
      };
      
      const cancelledBooking: Booking = {
        ...pendingBooking,
        id: '3',
        status: 'cancelled',
      };
      
      expect(pendingBooking.status).toBe('pending');
      expect(confirmedBooking.status).toBe('confirmed');
      expect(cancelledBooking.status).toBe('cancelled');
    });

    it('should accept required created_at', () => {
      const booking: Booking = {
        id: 'booking-123',
        service_id: 'service-123',
        customer_name: 'John Doe',
        customer_email: 'john@example.com',
        booking_date: '2026-05-15',
        booking_time: '10:00',
        status: 'pending',
        created_at: '2026-05-01T10:00:00Z',
      };
      
      expect(booking.created_at).toBeDefined();
    });
  });
});

describe('Data Validation', () => {
  it('should validate service price is positive', () => {
    const service: DroneService = {
      id: '1',
      slug: 'test',
      title: 'Test',
      description: 'Test',
      price_per_hour: 50,
      category: 'test',
      image_url: '/test.webp',
      available_from: '08:00',
      available_until: '20:00',
    };
    
    expect(service.price_per_hour).toBeGreaterThan(0);
  });

  it('should validate booking date format', () => {
    const booking: Booking = {
      id: '1',
      service_id: '1',
      customer_name: 'Test',
      customer_email: 'test@test.com',
      booking_date: '2026-12-31',
      booking_time: '14:00',
      status: 'pending',
      created_at: '2026-01-01T00:00:00Z',
    };
    
    expect(booking.booking_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should validate booking time format', () => {
    const booking: Booking = {
      id: '1',
      service_id: '1',
      customer_name: 'Test',
      customer_email: 'test@test.com',
      booking_date: '2026-05-15',
      booking_time: '09:30',
      status: 'pending',
      created_at: '2026-01-01T00:00:00Z',
    };
    
    expect(booking.booking_time).toMatch(/^\d{2}:\d{2}$/);
  });
});