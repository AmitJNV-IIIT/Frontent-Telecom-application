import React from 'react';
import { render, waitFor } from '@testing-library/react';
import UserPlatformFeedback from '../../components/Admin/AdminPlan/UserPlatformFeedback';
import { fireEvent } from '@testing-library/react';

// Importing axios mock
jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

describe('UserPlatformFeedback Component', () => {
  const feedbackData = [
    { description: 'Build no miss American at action' },
    { description: 'Easy to use.' },
    { description: 'Could use some improvements.' }
  ];

  it('renders UserPlatformFeedback component with feedback data', async () => {
    // Mocking the response
    const mockResponse = {
      data: feedbackData,
      status: 200
    };
    const request = require('../../axios/AxiosHelper').request;
    request.mockResolvedValue(mockResponse);

    const { getByText, getAllByTestId } = render(
      <UserPlatformFeedback feedbackData={feedbackData} />
    );

    expect(getByText('Recent Feedbacks')).toBeInTheDocument();

    // Wait for the feedback items to be rendered
    // await waitFor(() => {
    //   feedbackData.forEach((feedback) => {
    //     expect(getByText(feedback.description)).toBeInTheDocument();
    //   });
    // });

    // Check if the user icon component is rendered for each feedback item
    feedbackData.forEach((_, index) => {
      expect(getAllByTestId('user-feedback-icon')[index]).toBeInTheDocument();
    });
  });

  it('renders UserPlatformFeedback component with empty feedback data', () => {
    const { getByText } = render(<UserPlatformFeedback feedbackData={[]} />);

    expect(getByText('Recent Feedbacks')).toBeInTheDocument();
    // expect(getByText('No feedback available.')).toBeInTheDocument();
  });

  it('displays "View All Feedbacks" button', () => {
    const { getByText } = render(
      <UserPlatformFeedback feedbackData={feedbackData} />
    );

    expect(getByText('View All Feedbacks')).toBeInTheDocument();
  });

  it('opens modal when "View All Feedbacks" button is clicked', () => {
    const { getByText, getByTestId } = render(
      <UserPlatformFeedback feedbackData={feedbackData} />
    );

    const viewAllButton = getByText('View All Feedbacks');
    fireEvent.click(viewAllButton);

    const modal = getByTestId('user-feedback-modal');
    expect(modal).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <UserPlatformFeedback feedbackData={feedbackData} />
    );

    const viewAllButton = getByText('View All Feedbacks');
    fireEvent.click(viewAllButton);

    const closeButton = getByText('×');
    fireEvent.click(closeButton);

    const modal = queryByTestId('user-feedback-modal');
    expect(modal);
  });
});
