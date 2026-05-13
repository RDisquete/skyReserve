import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TimeGrid } from '../components/ui/TimeGrid';

describe('TimeGrid', () => {
  const defaultProps = {
    selectedTime: null,
    onSelect: () => {},
    bookedSlots: [],
    serviceFrom: '08:00',
    serviceUntil: '22:00',
  };

  it('should render available time slots', () => {
    render(<TimeGrid {...defaultProps} />);
    expect(screen.getByText('08:00')).toBeInTheDocument();
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('should render Ventana de Vuelo header', () => {
    render(<TimeGrid {...defaultProps} />);
    expect(screen.getByText(/Ventana de Vuelo/)).toBeInTheDocument();
  });

  it('should show Libre status for available slots', () => {
    render(<TimeGrid {...defaultProps} />);
    expect(screen.getAllByText('Libre').length).toBeGreaterThan(0);
  });

  it('should handle selected time', () => {
    render(<TimeGrid {...defaultProps} selectedTime="10:00" />);
    // Selected slot should show different styling (Inicio)
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('should handle booked slots', () => {
    render(<TimeGrid {...defaultProps} bookedSlots={['09:00', '10:00']} />);
    expect(screen.getAllByText('Ocupado').length).toBe(2);
  });

  it('should filter slots based on serviceFrom', () => {
    render(<TimeGrid {...defaultProps} serviceFrom="10:00" serviceUntil="18:00" />);
    expect(screen.queryByText('08:00')).not.toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('should handle duration display', () => {
    render(<TimeGrid {...defaultProps} selectedTime="08:00" duration={3} />);
    expect(screen.getByText('+2h')).toBeInTheDocument();
  });

  it('should not show duration for 1 hour', () => {
    render(<TimeGrid {...defaultProps} selectedTime="08:00" duration={1} />);
    expect(screen.queryByText(/\+0h/)).not.toBeInTheDocument();
  });
});