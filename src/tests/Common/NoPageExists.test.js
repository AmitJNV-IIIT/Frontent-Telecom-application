import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NoPageExists from '../../components/Common/NoPageExists';

test('renders NoPageExists component and checks content and button click', () => {
  const { getByText } = render(
    <Router>
      <NoPageExists />
    </Router>
  );

  // Check if the correct text is displayed
  expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  expect(
    screen.getByText("The page you are looking for doesn't exist!")
  ).toBeInTheDocument();

  // Check if button exists and simulate click event
  const button = getByText('Go to Home Page');
  expect(button).toBeInTheDocument();

  // Simulate a button click
  fireEvent.click(button);

  // You might want to test if the click event works as expected,
  // but this would require mocking the 'useNavigate' hook and is a bit more complex
});
