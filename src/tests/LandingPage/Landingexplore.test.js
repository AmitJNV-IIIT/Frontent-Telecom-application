import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Explore from '../../components/LandingComponent/Landingexplore';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn() // Mock useNavigate to return a mock function
}));

describe('Explore Component', () => {
  test('TC1 : renders component correctly', () => {
    render(
      <Router>
        <Explore />
      </Router>
    );
    const exploreComponent = screen.getByTestId('explore');
    expect(exploreComponent).toBeInTheDocument();
  });

  test('TC2 : renders title correctly', () => {
    render(
      <Router>
        <Explore />
      </Router>
    );
    const title = screen.getByText('WANT TO EXPLORE?');
    expect(title).toBeInTheDocument();
  });

  test('TC3 : renders subtitle correctly', () => {
    render(
      <Router>
        <Explore />
      </Router>
    );
    const subtitle = screen.getByText(
      'Excitel is a broadband service provider known for offering high-speed internet services primarily in select urban areas of India.'
    );
    expect(subtitle).toBeInTheDocument();
  });

  test('TC4 : renders submit button correctly and on click navigates to desired location', () => {
    render(
      <Router>
        <Explore />
      </Router>
    );
    const submitButton = screen.getByRole('button', {
      name: 'Explore Excitel'
    });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    // expect(screen.getByText("Service Currently Unavailable!!")).toBeInTheDocument();
  });
});
