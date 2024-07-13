import React from 'react';
import { render, screen } from '@testing-library/react';
import Testimonial2 from '../../components/LandingComponent/Testimonial2';
import { MemoryRouter, Router } from 'react-router-dom';

describe('Testimonial2 Component', () => {
  test('TC1 : renders Testimonial2 component correctly', () => {
    render(
      <MemoryRouter>
        <Testimonial2 />{' '}
      </MemoryRouter>
    );
    const testimonial2Component = screen.getByTestId('testimonial2');
    expect(testimonial2Component).toBeInTheDocument();
  });

  test('TC2 : renders text content correctly', () => {
    render(
      <MemoryRouter>
        <Testimonial2 />{' '}
      </MemoryRouter>
    );
    // Check for specific text content in the component
    expect(screen.getByText(/Get Spell Guarantee/i)).toBeInTheDocument();
    expect(screen.getByText(/No Risk On You/i)).toBeInTheDocument();
    expect(
      screen.getByText(/If our network and speed wizardry/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/in 2 weeks/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We will conjure up a full refund/i)
    ).toBeInTheDocument();
  });

  test('TC3 : renders logo image correctly', () => {
    render(
      <MemoryRouter>
        <Testimonial2 />{' '}
      </MemoryRouter>
    );
    const logoImage = screen.getByAltText('Your Image');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'couponlogo.png');
  });
});
