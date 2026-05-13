import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ServiceCard } from '../components/ui/ServiceCard';
import type { DroneService } from '../types/types';
import { BrowserRouter } from 'react-router-dom';

const mockService: DroneService = {
  id: 'test-123',
  slug: 'grabacion-cinematografica',
  title: 'Grabación Cinematográfica',
  description: 'Vídeo 4K HDR para producciones audiovisuales de alto nivel.',
  price_per_hour: 150,
  category: 'cinematic',
  image_url: '/services/cine.webp',
  available_from: '08:00',
  available_until: '22:00',
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ServiceCard', () => {
  it('should render service title', () => {
    renderWithRouter(<ServiceCard service={mockService} />);
    expect(screen.getByText('Grabación Cinematográfica')).toBeInTheDocument();
  });

  it('should render service price', () => {
    renderWithRouter(<ServiceCard service={mockService} />);
    expect(screen.getByText('€150')).toBeInTheDocument();
  });

  it('should render service category', () => {
    renderWithRouter(<ServiceCard service={mockService} />);
    expect(screen.getByText(/cinematic/i)).toBeInTheDocument();
  });

  it('should render price', () => {
    renderWithRouter(<ServiceCard service={mockService} />);
    expect(screen.getByText(/hora/)).toBeInTheDocument();
  });

  it('should render description', () => {
    renderWithRouter(<ServiceCard service={mockService} />);
    expect(screen.getByText(/Vídeo 4K HDR/)).toBeInTheDocument();
  });

  it('should handle service without image', () => {
    const serviceWithoutImage = { ...mockService, image_url: '' };
    renderWithRouter(<ServiceCard service={serviceWithoutImage} />);
    expect(screen.getByText('Grabación Cinematográfica')).toBeInTheDocument();
  });

  it('should handle service with different price', () => {
    const expensiveService = { ...mockService, price_per_hour: 500 };
    renderWithRouter(<ServiceCard service={expensiveService} />);
    expect(screen.getByText('€500')).toBeInTheDocument();
  });
});