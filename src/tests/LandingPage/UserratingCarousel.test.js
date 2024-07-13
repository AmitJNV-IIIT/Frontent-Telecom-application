import React from 'react';
import { render, screen } from '@testing-library/react';
import Userratingscarousel from '../../components/LandingComponent/UserRatingsCarousel';
import ratngslider from '../../data/clients-response.json';
import { MemoryRouter } from 'react-router-dom';

describe('Userratingscarousel component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Userratingscarousel />
      </MemoryRouter>
    );
  });

  test('TC-01: Renders Userratingscarousel component', () => {
    // const carouselElement = screen.getByRole('img');
    // expect(carouselElement).toBeInTheDocument();
  });
});
