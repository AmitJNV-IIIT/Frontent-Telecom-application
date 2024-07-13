import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SupportPage from '../../components/Support/Support';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SupportPage Component', () => {
  it('T1: renders Support component with correct props', () => {
    render(
      <Router>
        <SupportPage />
      </Router>
    );

    // Check if Support component is rendered with correct props
    expect(screen.getByTestId('support-component')).toBeInTheDocument();
  });

  it('T2: renders Support component in the document', () => {
    render(
      <Router>
        <SupportPage />
      </Router>
    );

    // Check if Support component is rendered in the document
    expect(screen.getByTestId('support-component')).toBeInTheDocument();
  });

  it('T3: displays support image', () => {
    render(
      <Router>
        <SupportPage />
      </Router>
    );

    // Check if the support image is displayed
    expect(screen.getByAltText('Right Image')).toBeInTheDocument();
  });

  it('T4: navigates to /service-unavailable when "Go" button is clicked', () => {
    render(
      <Router>
        <SupportPage />
      </Router>
    );

    // Simulate clicking the "Go" button
    fireEvent.click(screen.getByText('Go'));

    // Check if it navigates to the correct URL
    expect(window.location.pathname).toEqual('/service-unavailable');
  });

  // Add more test cases as needed to cover other scenarios and behaviors of the Support component
});
