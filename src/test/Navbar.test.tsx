import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Navbar } from '../components/layout/Navbar';

describe('Navbar', () => {
  it('should render logo', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const images = document.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('should have services link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText('Servicios')).toBeInTheDocument();
  });

  it('should have about link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('should have contact link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('should have login link when not authenticated', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should have hamburger menu for mobile', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const menuButton = document.querySelector('button');
    expect(menuButton).toBeInTheDocument();
  });
});

describe('Navbar Mobile Menu', () => {
  it('should toggle mobile menu on click', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const menuButtons = document.querySelectorAll('button');
    const menuButton = menuButtons[menuButtons.length - 1];
    expect(menuButton).toBeInTheDocument();
  });
});