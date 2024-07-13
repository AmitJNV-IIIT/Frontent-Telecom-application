import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PlanRating from '../../components/Admin/AdminPlan/PlanRating';
import AllFeedbacks from '../../components/Admin/AdminPlan/AllFeedbacks';
import Spinner from '../../components/Common/Spinner/Spinner';

jest.mock('../../components/Admin/AdminPlan/AllFeedbacks', () => ({
  __esModule: true,
  default: ({ handleClose }) => (
    <div data-testid="all-feedbacks">
      <button onClick={handleClose}>Close</button>
    </div>
  )
}));

jest.mock('../../components/Common/Spinner/Spinner', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>
}));

describe('PlanRating component', () => {
  test('TC-01: Renders with average rating', () => {
    const { getByText } = render(<PlanRating avgRating={4} />);

    // Check if the average rating is rendered
    expect(getByText('Average Rating')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
  });

  test('TC-02: Opens AllFeedbacks component when View All Feedbacks button is clicked', async () => {
    const setCurrentPlanRating = jest.fn();
    const { getByText, getByTestId } = render(
      <PlanRating setCurrentPlanRating={setCurrentPlanRating} />
    );

    // Click the "View All Feedbacks" button
    fireEvent.click(getByText('View All Feedbacks'));

    // Wait for AllFeedbacks component to be rendered
    await waitFor(() => {
      expect(getByTestId('all-feedbacks')).toBeInTheDocument();
    });
  });

  test('TC-03: Closes AllFeedbacks component when handleClose is called', async () => {
    const setCurrentPlanRating = jest.fn();
    const { getByText, queryByTestId } = render(
      <PlanRating setCurrentPlanRating={setCurrentPlanRating} />
    );

    // Click the "View All Feedbacks" button
    fireEvent.click(getByText('View All Feedbacks'));

    // Wait for AllFeedbacks component to be rendered
    await waitFor(() => {
      expect(queryByTestId('all-feedbacks')).toBeInTheDocument();
    });

    // Close the AllFeedbacks component
    fireEvent.click(getByText('Close'));

    // Check if AllFeedbacks component is closed
    expect(queryByTestId('all-feedbacks')).not.toBeInTheDocument();
  });
});
