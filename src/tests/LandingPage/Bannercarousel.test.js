import React from 'react';
import { render, screen } from '@testing-library/react';
import Carousels from '../../components/LandingComponent/Bannercarousel';
import { MemoryRouter } from 'react-router-dom';

describe('Carousels component', () => {
  const slider = [
    { id: 1, title: 'Slide 1', description: 'Description 1' },
    { id: 2, title: 'Slide 2', description: 'Description 2' },
    { id: 3, title: 'Slide 3', description: 'Description 3' }
  ];

  test('TC-01: Renders carousel items correctly', () => {
    render(
      <MemoryRouter>
        <Carousels />
      </MemoryRouter>
    );
  });
});
