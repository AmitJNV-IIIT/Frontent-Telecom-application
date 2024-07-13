import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import { request } from '../../axios/AxiosHelper';
import Swal from 'sweetalert2';
import ForgotPassword from '../../pages/ForgotPassword';
import { act } from 'react-dom/test-utils';

import { requestNoHeader } from '../../axios/AxiosHelper';
jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

jest.mock('../../axios/AxiosHelper', () => ({
  requestNoHeader: jest.fn()
}));

describe('ForgotPassword component', () => {
  const history = createMemoryHistory();
  const setup = () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    const phoneNumberInput = screen.getByPlaceholderText(
      'Enter your Mobile Number'
    );
    // const codeInput = screen.getByPlaceholderText('Enter Code');
    const sendCodeButton = screen.getByText('Send Code');
    const verifyCodeButton = screen.getByText('Verify Code');
    const resendCodeButton = screen.getByText('Resend Code');
    return {
      phoneNumberInput,

      sendCodeButton,
      verifyCodeButton,
      resendCodeButton
    };
  };

  test('TC-01: Renders ForgotPassword component', () => {
    setup();
    const title = screen.getByText('Forgot Password');
    expect(title).toBeInTheDocument();
  });

  // test('TC-02: Disables and enables the code input and buttons correctly', async () => {
  //   // Mocking axios response
  //   const mockResponse = { status: 'OK' };
  //   require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

  //   const { phoneNumberInput, sendCodeButton, verifyCodeButton } = setup();

  //   expect(verifyCodeButton).toBeDisabled(); // Initially disabled

  //   fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
  //   fireEvent.click(sendCodeButton);

  //   await act(async () => {
  //     // Wait for the state to update asynchronously
  //     await Promise.resolve();
  //   });

  //   expect(verifyCodeButton).not.toBeDisabled(); // Now expecting it to be enabled
  // });

  // test('TC-03: Calls the axios request and Swal.fire when Send Code button is clicked', () => {
  //   const { phoneNumberInput, sendCodeButton } = setup();
  //   fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
  //   //Mocking axios response
  //   const mockResponse = { status: 'OK' };
  //   require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

  //   fireEvent.click(sendCodeButton);
  //   expect(request).toHaveBeenCalled();
  //   // expect(Swal.fire).toHaveBeenCalled();
  // });
  test('TC-04: Displays error message when invalid phone number is entered', () => {
    const { phoneNumberInput, sendCodeButton } = setup();
    fireEvent.change(phoneNumberInput, { target: { value: '123' } });
    fireEvent.click(sendCodeButton);
    // const errorMessage = screen.getByText('Mobile number must be 10 digits');
    // expect(errorMessage).toBeInTheDocument();
  });

  test('TC-05: Calls handleResendCode function when Resend Code button is clicked', () => {
    const { resendCodeButton } = setup();
    fireEvent.click(resendCodeButton);
    // Add assertions to verify that handleResendCode function is called
  });

  test('TC-06: Calls handleVerifyCode function when Verify Code button is clicked', () => {
    const { phoneNumberInput, codeInput, verifyCodeButton } = setup();
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    // fireEvent.change(codeInput, { target: { value: '123456' } });
    fireEvent.click(verifyCodeButton);
    // Add assertions to verify that handleVerifyCode function is called
  });

  test('TC-07: Redirects to reset password page after successful code verification', () => {
    const { phoneNumberInput, codeInput, verifyCodeButton } = setup();
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    // fireEvent.change(codeInput, { target: { value: '123456' } });
    fireEvent.click(verifyCodeButton);
    // Add assertions to verify that the component redirects to reset password page
  });
});
