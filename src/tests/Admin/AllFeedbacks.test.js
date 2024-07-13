import React from 'react';
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor
} from '@testing-library/react';
import AllFeedbacks from '../../components/Admin/AdminPlan/AllFeedbacks';

describe('AllFeedbacks Component', () => {
  const mockHandleClose = jest.fn();
  const mockSetCurrentPlanRating = jest.fn(); // Mock setCurrentPlanRating function
  const planFeedbacks = [
    { name: 'Test1', description: 'Description1', starRating: 4 },
    { name: 'Test2', description: 'Description2', starRating: 5 }
  ];

  test('TC-01: It renders without crashing', () => {
    render(
      <AllFeedbacks
        open={true}
        handleClose={mockHandleClose}
        planFeedbacks={planFeedbacks}
        setCurrentPlanRating={mockSetCurrentPlanRating} // Pass the mock function
        currPlanRating={3} // Mock current rating
      />
    );

    const dialogTitle = screen.getByText('All Feedbacks');
    expect(dialogTitle).toBeInTheDocument();
  });
  test('TC-02: It updates rating when Rating component is changed', async () => {
    render(
      <AllFeedbacks
        open={true}
        handleClose={mockHandleClose}
        planFeedbacks={planFeedbacks}
        setCurrentPlanRating={mockSetCurrentPlanRating}
        currPlanRating={3} // Mock current rating
      />
    );

    // Wait for the Rating component to be in the document
    const starIcons = await screen.findAllByRole('radio');

    // Make sure the fourth star icon is in the document
    const fourthStar = starIcons[3];

    // If the fourth star is not found, log the number of star icons found and fail the test
    if (!fourthStar) {
      console.log('Number of star icons found:', starIcons.length);
      fail('Fourth star icon not found');
    }

    // Simulate click event on the fourth star
    fireEvent.click(fourthStar);

    // Expect setCurrentPlanRating to be called with the new value
    expect(mockSetCurrentPlanRating).toHaveBeenCalledWith(4);
  });
});
