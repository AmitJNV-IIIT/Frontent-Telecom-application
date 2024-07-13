import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Feedback from '../../components/ExcitelFeedback/Feedback';
import { request } from '../../axios/AxiosHelper';
import Swal from 'sweetalert2';
import { MemoryRouter } from 'react-router-dom';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn().mockImplementation((method, url, data) => {
    return new Promise((resolve, reject) => {
      resolve({ status: 'OK' });
    });
  })
}));
describe('Feedback Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('TC1: renders correctly', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );
    const headings = getByText(/Share your Experience/i);
    // const ratingStars = getAllByRole('slider');
    // const categoryButtons = getAllByRole('button', { name: /category/i });
    const textArea = getByText(/write a feedback/i);
    const submitButton = getByText(/submit/i);

    expect(headings).toBeInTheDocument();
    // expect(ratingStars.length).toBe(3);
    // expect(categoryButtons.length).toBe(6);
    expect(textArea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('TC2: allows selecting categories', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );
    const categoryButton = getByRole('button', { name: /overall service/i });

    fireEvent.click(categoryButton);

    expect(categoryButton).toHaveClass('button-selected');
  });

  //   it('TC3: allows submitting feedback', async () => {
  //     const { getByRole, getByText } = render(<Feedback />);
  //     const textArea = getByRole('textbox');
  //     const submitButton = getByText(/submit/i);

  //     fireEvent.change(textArea, { target: { value: 'Test feedback' } });
  //     fireEvent.click(submitButton);

  //     // Wait for asynchronous operations to complete
  //     await waitFor(() => {
  //       expect(request).toHaveBeenCalledTimes(1);
  //       expect(request).toHaveBeenCalledWith('POST', '/subscriptions/excitelFeedback', {
  //         starRating: expect.any(Number),
  //         description: 'Test feedback',
  //         category: expect.any(String),
  //         customerName: 'Abhi Singh',
  //       });
  //     });

  // Check Swal.fire after waitFor to ensure the request has completed
  //     expect(Swal.fire).toHaveBeenCalledWith({
  //       icon: 'success',
  //       title: 'Feedback Posted Successfully',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   });

  it('TC4: shows error when submitting without feedback or category', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );
    const submitButton = getByText(/submit/i);

    fireEvent.click(submitButton);

    // Ensure SweetAlert2 is called with the correct error messages
    expect(Swal.fire).toHaveBeenCalledTimes(1);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Oops...',
      'Please select at least one category!',
      'error'
    );
  });

  it('TC5: shows error when submitting without feedback', async () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );
    const categoryButton = getByRole('button', { name: /overall service/i });
    const submitButton = getByText(/submit/i);

    fireEvent.click(categoryButton);
    fireEvent.click(submitButton);

    // Ensure SweetAlert2 is called with the correct error messages
    expect(Swal.fire).toHaveBeenCalledTimes(1);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Oops...',
      'Feedback cannot be empty!',
      'error'
    );
  });
});
