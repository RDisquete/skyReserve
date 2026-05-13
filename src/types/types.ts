export interface DroneService {
  id: string;
  slug: string;
  title: string;
  description: string;
  price_per_hour: number;
  image_url: string;
  category: string;
  available_from: string;
  available_until: string;
}

export interface Booking {
  id: string;
  service_id: string;
  customer_name: string; 
  customer_email: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  services?: DroneService; 
}