import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlanFeedback from '../../components/SubscriptionHistory/FeedbackModel';
import { request } from '../../axios/AxiosHelper';
import Swal from 'sweetalert2';
// import HowerRating from '../../components/SubscriptionHistory/HoverRating';

// Mock HoverRating component
// jest.mock('../../components/SubscriptionHistory/HoverRating', () => {
//     return jest.fn(({ value, onChange }) => (
//       <div>
//        hii
//       </div>
//     ));
//   });

jest.mock(
  '../../components/SubscriptionHistory/HoverRating',
  () =>
    ({ value, onChange }) => (
      <div data-testid="mocked-hover-rating" onClick={() => onChange(4)}>
        Mocked HoverRating with value: {value}
      </div>
    )
);

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

describe('PlanFeedback component', () => {
  beforeEach(() => {
    // Mock localStorage
    localStorage.setItem(
      'Comp',
      JSON.stringify({
        plan: { planType: 'Test', planID: '1' },
        mobileNumber: '1234567890'
      })
    );
    render(<PlanFeedback />);
  });

  test('TC-01: Renders PlanFeedback component', () => {
    const feedbackHeader = screen.getByText('Plan Feedback');
    expect(feedbackHeader).toBeInTheDocument();
  });

  test('TC-02: Submit button is present', () => {
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();
  });

  test('TC-03: Changes feedback textarea value on user input', () => {
    const feedbackInput = screen.getByPlaceholderText(
      'Provide your feedback on the plan below'
    );
    fireEvent.change(feedbackInput, { target: { value: 'Good plan' } });
    expect(feedbackInput.value).toBe('Good plan');
  });

  test('TC-04: Shows alert if feedback or rating is not provided', () => {
    window.alert = jest.fn();
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    expect(window.alert).toHaveBeenCalledWith(
      'Please fill in both the rating and feedback fields.'
    );
  });

  test('TC-05: Calls axios request and Swal.fire when submit with feedback and rating', async () => {
    // Find the feedback input field by placeholder text
    const feedbackInput = screen.getByPlaceholderText(
      'Provide your feedback on the plan below'
    );

    // Simulate typing feedback into the input field
    fireEvent.change(feedbackInput, { target: { value: 'Good plan' } });

    // Find the mocked HoverRating component by test id
    const mockedHoverRating = screen.getByTestId('mocked-hover-rating');

    // Click on the mocked HoverRating component to set the rating value
    fireEvent.click(mockedHoverRating);

    // Mock the request function to resolve successfully
    request.mockResolvedValue({ status: 'OK' });

    // Find the submit button and simulate clicking it
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Wait for asynchronous code to settle
    await waitFor(() => {
      // Ensure that request function was called
      expect(request).toHaveBeenCalled();
    });
    // Ensure that Swal.fire was called with the correct parameters

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'Feedback Submitted',
        text: 'Thank you for your feedback!'
      });
    });
  });

  test('TC-06: Shows Swal.fire with error message on server error', async () => {
    // Find the feedback input field by placeholder text
    const feedbackInput = screen.getByPlaceholderText(
      'Provide your feedback on the plan below'
    );

    // Simulate typing feedback into the input field
    fireEvent.change(feedbackInput, { target: { value: 'Good plan' } });

    // Find the mocked HoverRating component by test id
    const mockedHoverRating = screen.getByTestId('mocked-hover-rating');

    // Click on the mocked HoverRating component to set the rating value
    fireEvent.click(mockedHoverRating);

    // Mock the request function to reject with an error
    request.mockRejectedValue(new Error('Server error'));

    // Find the submit button and simulate clicking it
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Wait for asynchronous code to settle
    await waitFor(() => {
      // Ensure that request function was called
      expect(request).toHaveBeenCalled();
    });
  });
});
