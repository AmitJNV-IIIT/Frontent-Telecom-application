import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Tagline from '../../components/LandingComponent/Tagline';

describe('Tagline component', () => {
  test('TC1 : renders without errors', () => {
    render(
      <Router>
        {' '}
        {/* Wrap your component with Router */}
        <Tagline />
      </Router>
    );
  });

  test('TC2 : renders tagline text correctly', () => {
    const { getByText } = render(
      <Router>
        {' '}
        {/* Wrap your component with Router */}
        <Tagline />
      </Router>
    );

    // Check if tagline text is rendered correctly
    expect(getByText('Your internet is not just a goal,')).toBeInTheDocument();
    expect(getByText("it's our top priority")).toBeInTheDocument();
    expect(getByText(/Your internet is not just a goal,/)).toBeInTheDocument();

    // Check if button is rendered correctly
    expect(getByText('See all plans')).toBeInTheDocument();
  });

  test("TC-02: Scrolls to top when 'See all plans' button is clicked", () => {
    // Mock the scrollTo function
    window.scrollTo = jest.fn();

    render(
      <Router>
        <Tagline />
      </Router>
    );

    const button = screen.getByText('See all plans');
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
