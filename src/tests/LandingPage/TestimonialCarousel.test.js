import React from 'react';
import { render, screen } from '@testing-library/react';
import TestimonialCarousel from '../../components/LandingComponent/TestimonialCarousel';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Router } from 'react-router-dom';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn().mockResolvedValue([]) // mock the request function to resolve with an empty array
}));

describe('TestimonialCarousel component', () => {
  beforeEach(async () => {
    // make this function async
    await act(async () => {
      // wrap the render call in act and await it
      render(
        <MemoryRouter>
          <TestimonialCarousel />
        </MemoryRouter>
      );
    });
  });

  test('TC-01: Renders TestimonialCarousel component', async () => {
    expect(screen.getByTestId('postpaid-carousel-main')).toBeInTheDocument();
  });
});
