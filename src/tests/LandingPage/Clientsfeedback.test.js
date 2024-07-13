import React from 'react';
import { render, screen } from '@testing-library/react';
import Clientsfeedback from '../../components/LandingComponent/Clientsfeedback';

// Mock the TestimonialCard component
// jest.mock('../../components/LandingComponent/TestimonialCard', () => {
//   return jest.fn(() => <div data-testid="mocked-testimonial-card">Mocked TestimonialCard Component</div>);
// });

jest.mock('../../components/LandingComponent/TestimonialCard', () => () => (
  <div data-testid="mocked-testimonial-card">
    Mocked TestimonialCard Component
  </div>
));

describe('Clientsfeedback component', () => {
  test('TC1 : renders without errors', () => {
    render(<Clientsfeedback />);
    expect(screen.getByTestId('clientfeedback')).toBeInTheDocument();
  });

  test('TC2 : renders Clientsfeedback component correctly', () => {
    render(<Clientsfeedback />);

    // Check if the main container with data-testid "clientfeedback" is rendered
    expect(screen.getByTestId('clientfeedback')).toBeInTheDocument();

    // Check if the mocked TestimonialCard component is rendered
    expect(screen.getByTestId('mocked-testimonial-card')).toBeInTheDocument();
  });
});
