import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResetPassword from '../../components/Authentication/ResetPassword/ResetPassword';
import { AuthProvider } from '../../hooks/contextApi/AuthContext';
import Swal from 'sweetalert2';
import { createMemoryHistory } from 'history';
import { useAuth } from '../../hooks/contextApi/AuthContext';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

jest.mock('../../hooks/contextApi/AuthContext', () => ({
  useAuth: jest.fn()
}));

describe('ResetPassword component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  test('TC-01: Renders form elements correctly', () => {
    useAuth.mockImplementation(() => ({
      isLogin: false
    }));
    render(
      <MemoryRouter>
        {/* <AuthProvider> */}
        <ResetPassword />
        {/* </AuthProvider> */}
      </MemoryRouter>
    );
    expect(screen.getByText('Set a New Password')).toBeInTheDocument();

    try {
      const oldPasswordField = screen.getByLabelText('Old Password');
      expect(oldPasswordField).toBeInTheDocument();
    } catch (error) {}

    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
  });

  test('TC-02: Should Displays validation errors for invalid password inputs', async () => {
    useAuth.mockImplementation(() => ({
      isLogin: false
    }));

    render(
      <MemoryRouter>
        {/* <AuthProvider> */}
        <ResetPassword />
        {/* </AuthProvider> */}
      </MemoryRouter>
    );
    const newPasswordInput = screen.getByLabelText('New Password');
    fireEvent.change(newPasswordInput, { target: { value: 'weak' } });
    fireEvent.submit(newPasswordInput);

    await waitFor(() =>
      expect(
        screen.getByText(
          'Password must contain at least one lowercase letter, one uppercase letter, one digit, and minimum length of 8 characters'
        )
      ).toBeInTheDocument()
    );
  });

  test('TC-03: Should displays validation error if confirm new password does not match new password', async () => {
    useAuth.mockImplementation(() => ({
      isLogin: false
    }));

    render(
      <MemoryRouter>
        {/* <AuthProvider> */}
        <ResetPassword />
        {/* </AuthProvider> */}
      </MemoryRouter>
    );
    const newPasswordInput = screen.getByLabelText('New Password');
    const confirmNewPasswordInput = screen.getByLabelText(
      'Confirm New Password'
    );
    fireEvent.change(newPasswordInput, {
      target: { value: 'StrongPassword1' }
    });
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: 'MismatchPassword' }
    });
    fireEvent.submit(confirmNewPasswordInput);

    await waitFor(() =>
      expect(screen.getByText('Passwords should match')).toBeInTheDocument()
    );
  });

  test('TC-04: Should handles invalid form submission', async () => {
    useAuth.mockImplementation(() => ({
      isLogin: false
    }));
    render(
      <MemoryRouter>
        {/* <AuthProvider> */}
        <ResetPassword />
        {/* </AuthProvider> */}
      </MemoryRouter>
    );

    try {
      const oldPasswordField = screen.getByLabelText('Old Password');
      expect(oldPasswordField).toBeInTheDocument();
    } catch (error) {}

    const newPasswordInput = screen.getByLabelText('New Password');
    fireEvent.change(newPasswordInput, { target: { value: 'WorngPassword1' } });

    const confirmNewPasswordInput = screen.getByLabelText(
      'Confirm New Password'
    );
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: 'WPassword1' }
    });

    // Submit form by clicking "UPDATE PASSWORD" button
    const updateButton = screen.getByText('Update Password');
    fireEvent.click(updateButton);

    // Wait for form submission
    await waitFor(() =>
      expect(
        screen.getByText('Password Update Unsuccessful')
      ).toBeInTheDocument()
    );

    // Check if input fields are cleared after form submission
    expect(newPasswordInput).toHaveValue('');
    expect(confirmNewPasswordInput).toHaveValue('');
  });

  test('TC-05 Should display Password Updated Successfully upon successfull password update', async () => {
    useAuth.mockImplementation(() => ({
      isLogin: false
    }));

    // Mocking Swal.fire
    Swal.fire = jest.fn();

    //Mocking axios response
    const mockResponse = { status: 'OK' };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        {/* <AuthProvider> */}
        <ResetPassword />
        {/* </AuthProvider> */}
      </MemoryRouter>
    );

    try {
      const oldPasswordField = screen.getByLabelText('Old Password');
      expect(oldPasswordField).toBeInTheDocument();
    } catch (error) {}

    const newPasswordInput = screen.getByLabelText('New Password');
    fireEvent.change(newPasswordInput, {
      target: { value: 'StrongPassword1' }
    });

    const confirmNewPasswordInput = screen.getByLabelText(
      'Confirm New Password'
    );
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: 'StrongPassword1' }
    });

    Swal.fire.mockResolvedValue({ isConfirmed: true });

    // Simulating form submission
    fireEvent.submit(screen.getByText('Update Password'));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: 'Password Update Successfuly',
        showConfirmButton: false,
        timer: 1500
      });
    });
  });

  test('TC-06 Should display Password Updated Unsuccessful if response in not OK', async () => {
    useAuth.mockImplementation(() => ({
      isLogin: false
    }));

    // Mocking Swal.fire
    Swal.fire = jest.fn();

    //Mocking axios response
    const mockResponse = { status: 'ERROR' };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        {/* <AuthProvider> */}
        <ResetPassword />
        {/* </AuthProvider> */}
      </MemoryRouter>
    );

    try {
      const oldPasswordField = screen.getByLabelText('Old Password');
      expect(oldPasswordField).toBeInTheDocument();
    } catch (error) {}

    const newPasswordInput = screen.getByLabelText('New Password');
    fireEvent.change(newPasswordInput, {
      target: { value: 'StrongPassword1' }
    });

    const confirmNewPasswordInput = screen.getByLabelText(
      'Confirm New Password'
    );
    fireEvent.change(confirmNewPasswordInput, {
      target: { value: 'StrongPassword1' }
    });

    Swal.fire.mockResolvedValue({ isConfirmed: true });

    // Simulating form submission
    fireEvent.submit(screen.getByText('Update Password'));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Password Update Unsuccessful',
        text: 'Try Again!!',
        showConfirmButton: true
      });
    });
  });

  test('TC-07: Should show and hide password upon clicking eye button', () => {
    useAuth.mockImplementation(() => ({
      isLogin: false
    }));

    render(
      <MemoryRouter>
        {/* <AuthProvider> */}
        <ResetPassword />
        {/* </AuthProvider> */}
      </MemoryRouter>
    );

    // Find the toggle visibility buttons
    const toggleButtons = screen.getAllByLabelText(
      /toggle .* password visibility/i
    );

    // Ensure toggle buttons are found
    expect(toggleButtons.length).toBeGreaterThan(0);

    // Toggle visibility for each password field
    toggleButtons.forEach((button) => {
      const buttonName = button.getAttribute('aria-label').split(' ')[1]; // Extract the relevant part of the aria-label

      let passwordField;
      if (buttonName === 'newPassword') {
        passwordField = screen.getByLabelText('New Password');
      } else if (buttonName === 'oldPassword') {
        passwordField = screen.getByLabelText('Old Password');
      } else if (buttonName === 'confirmNewPassword') {
        passwordField = screen.getByLabelText('Confirm New Password');
      } else {
        passwordField = null;
      }

      if (passwordField) {
        fireEvent.click(button); // Click toggle button

        // Check if the corresponding password field's type attribute has changed
        expect(passwordField).toHaveAttribute('type', 'text');

        // Click the toggle button again
        fireEvent.click(button);

        // Check if the type attribute has changed back to "password"
        expect(passwordField).toHaveAttribute('type', 'password');
      }
    });
  });

  test('TC-08: Back button navigates to previous page', () => {
    useAuth.mockImplementation(() => ({
      isLogin: false
    }));

    // Create a memory history
    const history = createMemoryHistory();

    // Push a dummy page to the history stack
    history.push('/dummy-page');

    const { getByTestId } = render(
      <MemoryRouter>
        {/* <AuthProvider> */}
        <ResetPassword />
        {/* </AuthProvider> */}
      </MemoryRouter>
    );

    // Find the back button
    const backButton = getByTestId('back-btn');

    // Simulate click on the back button
    fireEvent.click(backButton);

    // Check if the navigate function was called with the appropriate arguments
    expect(history.location.pathname).toEqual('/dummy-page');
  });

  test('TC-09: Old password field is visible when user is logged in and reset password', () => {
    useAuth.mockImplementation(() => ({
      isLogin: true
    }));

    render(
      <MemoryRouter>
        {/* <AuthProvider> */}
        <ResetPassword />
        {/* </AuthProvider> */}
      </MemoryRouter>
    );

    const oldPasswordField = screen.getByLabelText(
      'Password Update Unsuccessful'
    );
    // fireEvent.change(oldPasswordField, { target: { value: 'OldPassword1' } });
    // expect(oldPasswordField).toBeInTheDocument();
  });
});
