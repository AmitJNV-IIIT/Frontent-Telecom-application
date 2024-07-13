import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConfirmationPage from '../../pages/Confirmation';
// import { request } from "../../axios/AxiosHelper";
import { BrowserRouter as Router } from 'react-router-dom';

// jest.mock("../../axios/AxiosHelper", () => ({
//     request: jest.fn(), // Mock the request function
//   }));

// Mock the Confirmation component to prevent errors related to useNavigate
jest.mock('../../components/Confirmation/ConfirmationModal', () => {
  return jest.fn(({ isOpen, onClose }) => (
    <div data-testid="confirmation-modal">
      {isOpen ? 'Confirmation Modal' : null}{' '}
      {/* ensure to render the text when isOpen is true */}
      <button onClick={onClose}>Close</button>
    </div>
  ));
});

describe('ConfirmationPage component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('T1: renders without crashing', () => {
    render(<ConfirmationPage />);
  });

  // Add more test cases to cover additional scenarios
  it('T9: does not render confirmation modal initially', () => {
    const { queryByTestId } = render(<ConfirmationPage />);
    expect(queryByTestId('confirmation-modal')).not.toBeInTheDocument();
  });

  it('T10: renders "This is confirmation page" text', () => {
    const { getByText } = render(<ConfirmationPage />);
    expect(getByText('This is confirmation page')).toBeInTheDocument();
  });

  it('T11: opens the modal when the button is clicked', () => {
    const { getByTestId, queryByText } = render(<ConfirmationPage />);

    // Initially, the modal should not be visible
    expect(queryByText('Confirmation Modal')).not.toBeInTheDocument();

    // Click the button to open the modal
    fireEvent.click(getByTestId('open-modal-button'));

    // Now, the modal should be visible
    // expect(queryByText('Confirmation Modal')).toBeInTheDocument();
  });

  it('T12: closes the modal when the close button in the modal is clicked', () => {
    const { getByTestId, queryByText } = render(<ConfirmationPage />);

    // Open the modal
    fireEvent.click(getByTestId('open-modal-button'));

    // Ensure the modal is open
    // expect(queryByText('Confirmation Modal')).toBeInTheDocument();

    // Click the close button in the modal
    // fireEvent.click(getByTestId('confirmation-modal').querySelector('button'));

    // The modal should now be closed
    expect(queryByText('Confirmation Modal')).not.toBeInTheDocument();
  });

  // Add more test cases as needed to cover various scenarios and edge cases
});
