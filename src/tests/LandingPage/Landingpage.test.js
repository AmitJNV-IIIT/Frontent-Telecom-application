import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../../pages/Landingpage';

// Import the request function to mock it
import { request } from '../../axios/AxiosHelper';

// Mock the request function and dependent components
jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

jest.mock('../../components/LandingComponent/Bannercarousel', () => () => (
  <div>Bannercarousel</div>
));
jest.mock('../../components/LandingComponent/Plans', () => () => (
  <div>Plans</div>
));
jest.mock('../../components/LandingComponent/Testimonial2', () => () => (
  <div>Testimonial2</div>
));
jest.mock('../../components/LandingComponent/Testimonial', () => () => (
  <div>Testimonial</div>
));
jest.mock('../../components/LandingComponent/TestimonialCarousel', () => () => (
  <div>TestimonialCarousel</div>
));

describe('LandingPage component', () => {
  beforeEach(() => {
    // Setup the mock to return a promise
    request.mockResolvedValue({
      data: {
        subscriptions: [
          { id: 1, name: 'Subscription A' },
          { id: 2, name: 'Subscription B' }
        ]
      }
    });

    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
  });

  test('TC-01: Renders LandingPage component', () => {
    const landingPageElement = screen.getByTestId('landingpage');
    expect(landingPageElement).toBeInTheDocument();
  });

  test('TC-02: Renders Bannercarousel component', () => {
    expect(screen.getByText('Bannercarousel')).toBeInTheDocument();
  });

  test('TC-03: Renders Plans component', () => {
    expect(screen.getByText('Plans')).toBeInTheDocument();
  });

  test('TC-04: Renders Testimonial2 component', () => {
    expect(screen.getByText('Testimonial2')).toBeInTheDocument();
  });

  test('TC-05: Renders Testimonial component', () => {
    expect(screen.getByText('Testimonial')).toBeInTheDocument();
  });

  test('TC-06: Renders TestimonialCarousel component', () => {
    expect(screen.getByText('TestimonialCarousel')).toBeInTheDocument();
  });

  // Example test for async data loading
  test('TC-07: Handles fetched data correctly', async () => {
    await waitFor(() => {
      // Assume your component renders something based on fetched data
      expect(
        screen.getByText(
          'Explore our premier plans tailored for dedicated network access and optimal bandwidth.'
        )
      ).toBeInTheDocument();
    });
  });
});
