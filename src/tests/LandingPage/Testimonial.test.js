import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Testimonial from '../../components/LandingComponent/Testimonial';

global.window.scrollTo = jest.fn();

describe('Testimonial Component', () => {
  test('TC1 : renders Testimonial component correctly', () => {
    render(
      <Router>
        {' '}
        {/* Wrap your component with Router */}
        <Testimonial />
      </Router>
    );
    const testimonialWrapper = screen.getByTestId('testimonial');
    expect(testimonialWrapper).toBeInTheDocument();
  });

  // test('TC2 : renders text content correctly', () => {
  //   render(
  //     <Router> {/* Wrap your component with Router */}
  //       <Testimonial />
  //     </Router>
  //   );
  //   // Check for specific text content in the component
  //   expect(screen.getByText(/your internet is not just a goal/i)).toBeInTheDocument();
  //   expect(screen.getByText(/it's our top priority/i)).toBeInTheDocument();
  //   expect(screen.getByText(/to ensure quality work/i)).toBeInTheDocument();
  //   expect(screen.getByText(/see all plans/i)).toBeInTheDocument();
  //   expect(screen.getByText(/let excitel help you/i)).toBeInTheDocument();
  //   expect(screen.getByText(/connect with us to receive supportive guidance from excitel/i)).toBeInTheDocument();
  //   expect(screen.getByText(/connect for assistance/i)).toBeInTheDocument();
  // });

  // test('TC3 : handles click event on "See all plans" button', () => {
  //   render(
  //     <Router> {/* Wrap your component with Router */}
  //       <Testimonial />
  //     </Router>
  //   );
  //   const seeAllPlansButton = screen.getByText(/see all plans/i);
  //   fireEvent.click(seeAllPlansButton);
  //   // Add your assertion here for the expected behavior after clicking the button
  // });

  test('TC4 : handles click event on "Connect for assistance" button', () => {
    render(
      <Router>
        {' '}
        {/* Wrap your component with Router */}
        <Testimonial />
      </Router>
    );
    const connectForAssistanceButton = screen.getByText(
      /connect for assistance/i
    );
    fireEvent.click(connectForAssistanceButton);
    // Add your assertion here for the expected behavior after clicking the button
  });
});
