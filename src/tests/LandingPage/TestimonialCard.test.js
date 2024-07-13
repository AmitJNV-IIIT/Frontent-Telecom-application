import React from 'react';
import { render, screen } from '@testing-library/react';
import TestimonialCard from '../../components/LandingComponent/TestimonialCard';

describe('TestimonialCard component', () => {
  const testimonial = {
    name: 'Test User',
    title: 'Test Title',
    description: 'test Testimonial',
    starRating: 5
  };

  beforeEach(() => {
    render(<TestimonialCard testimonial={testimonial} />);
  });

  test('TC-01: Renders TestimonialCard component with given testimonial', () => {
    expect(screen.getByText(testimonial.description)).toBeInTheDocument();
  });

  // test('TC-02: Renders TestimonialCard component with given name', () => {
  //   expect(screen.getByText(testimonial.name)).toBeInTheDocument();
  // });

  test('TC-03: Renders profile image', () => {
    const profileImage = screen.getByAltText('login');
    expect(profileImage).toBeInTheDocument();
  });

  test('TC-04: Renders correct number of star elements', () => {
    const starElements = screen.getAllByText('★'); // assuming '★' is the character for a star
    expect(starElements.length).toBe(testimonial.starRating);
  });
});
