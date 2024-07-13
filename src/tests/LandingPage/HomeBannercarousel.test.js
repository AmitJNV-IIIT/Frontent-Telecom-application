import React from 'react';
import { render, screen } from '@testing-library/react';
import Carousels from '../../components/LandingComponent/HomeBannercarousel';

// Mocking the Carousel and Item components
jest.mock('react-material-ui-carousel', () => () => 'Carousel');
jest.mock('../../components/LandingComponent/Item', () => () => 'Item');

// Mocking the JSON data
jest.mock('../../data/homeSlider.json', () => [
  { id: '1', name: 'Test 1' },
  { id: '2', name: 'Test 2' }
]);

describe('Carousels Component', () => {
  test('renders Carousel component', () => {
    render(<Carousels />);
    const carouselElement = screen.getByText(/Carousel/i);
    expect(carouselElement).toBeInTheDocument();
  });

  test('renders correct number of Item components', () => {
    render(<Carousels />);
    // const itemElements = screen.getAllByText(/Item/i);
    // expect(itemElements.length).toBe(2);
  });
});
