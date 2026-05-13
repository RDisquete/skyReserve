import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import About from '../pages/About';

const renderPage = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Contact Page', () => {
  it('should render contact header', () => {
    renderPage(<Contact />);
    expect(screen.getByText(/Contacto/)).toBeInTheDocument();
  });

  it('should have inputs', () => {
    renderPage(<Contact />);
    expect(screen.getByPlaceholderText(/Tu nombre/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tu@email.com/)).toBeInTheDocument();
  });

  it('should have submit button', () => {
    renderPage(<Contact />);
    expect(screen.getByRole('button', { name: /Enviar/ })).toBeInTheDocument();
  });
});

describe('Login Page', () => {
  it('should render login header', () => {
    renderPage(<Login />);
    expect(screen.getByText(/Cuenta/)).toBeInTheDocument();
  });

  it('should have email input', () => {
    renderPage(<Login />);
    expect(screen.getByPlaceholderText(/EMAIL/)).toBeInTheDocument();
  });

  it('should have submit button', () => {
    renderPage(<Login />);
    expect(screen.getByRole('button', { name: /Iniciar/ })).toBeInTheDocument();
  });
});

describe('About Page', () => {
  it('should render about header', () => {
    renderPage(<About />);
    expect(screen.getByText(/About/)).toBeInTheDocument();
  });

  it('should have how I work section', () => {
    renderPage(<About />);
    expect(screen.getByText(/Cómo trabajo/)).toBeInTheDocument();
  });
});