import React from 'react';
import { render, screen } from '@testing-library/react';
import Services from '../../components/LandingComponent/Services';

// Test case to check if the Services component renders without crashing
test('renders Services component without errors', () => {
  render(<Services />);
  const servicesCard = screen.getByTestId('services-card');
  expect(servicesCard).toBeInTheDocument();
});

// Test case to check if each service is rendered correctly
test('renders each service correctly', () => {
  render(<Services />);
  const service1 = screen.getByTestId('service1');
  const service2 = screen.getByTestId('service2');
  const service3 = screen.getByTestId('service3');
  const service4 = screen.getByTestId('service4');

  expect(service1).toBeInTheDocument();
  expect(service2).toBeInTheDocument();
  expect(service3).toBeInTheDocument();
  expect(service4).toBeInTheDocument();
});

// Test case to check if the images are loaded correctly for each service
test('images are loaded correctly for each service', () => {
  render(<Services />);
  const serviceImages = screen.getAllByAltText(/Service/);

  serviceImages.forEach((image) => {
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });
});
