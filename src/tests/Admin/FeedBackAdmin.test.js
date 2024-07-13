import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Feedback from '../../components/Admin/AdminPlan/FeedbackAdmin';

describe('Feedback component', () => {
  test('TC-01: Renders with provided props', () => {
    const name = 'John Doe';
    const description = 'This is a test feedback.';
    const rating = 4;

    render(<Feedback name={name} description={description} rating={rating} />);

    // Check if the name is rendered
    expect(screen.getByText(name)).toBeInTheDocument();

    // Check if the feedback text is rendered
    expect(screen.getByText(description)).toBeInTheDocument();

    // Check if the rating is rendered
    expect(screen.getByText(rating)).toBeInTheDocument();
  });

  test('TC-02: Expands feedback text when clicked', () => {
    const name = 'John Doe';
    const description = 'This is a test feedback for Excitle';
    const rating = 4;

    render(<Feedback name={name} description={description} rating={rating} />);

    // Click the feedback text to expand
    fireEvent.click(screen.getByText('This is a test feedback for Excitle'));

    // Check if the feedback text is expanded
    expect(
      screen.getByText('This is a test feedback for Excitle')
    ).toBeInTheDocument();
  });
});
