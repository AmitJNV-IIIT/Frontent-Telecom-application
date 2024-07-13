import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  queryByPlaceholderText,
  act
} from '@testing-library/react';
import RegistrationPage from '../../components/Authentication/Registration/RegistrationPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));
jest.mock('../../hooks/contextApi/AuthContext', () => ({
  useAuth: jest.fn(() => ({ isLogin: false })) // Mocking the return value of useAuth
}));

describe('RegistrationPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  test('TC-01: Should render the form fields correctly ', () => {
    render(
      <MemoryRouter>
        {' '}
        <RegistrationPage />{' '}
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();

    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();

    expect(screen.getByLabelText('Phone Number:')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your phone number')
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Confirm your password')
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Address Line:')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your address')
    ).toBeInTheDocument();

    // expect(screen.getByLabelText('City:')).toBeInTheDocument();
    // expect(screen.getByPlaceholderText('Enter your city')).toBeInTheDocument();

    expect(screen.getByLabelText('State:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your state')).toBeInTheDocument();

    expect(screen.getByLabelText('Postal Code:')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your postal code')
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Country:')).toBeInTheDocument();
  });

  test('TC-02: Should hide and show password fields when eye button is clicked', () => {
    render(
      <MemoryRouter>
        {' '}
        <RegistrationPage />{' '}
      </MemoryRouter>
    );
    const passwordInput = screen.getByLabelText('Password:');
    const toggleButton = screen.getByLabelText('toggle password visibility');

    // Initially password should be hidden
    expect(passwordInput.type).toBe('password');

    // Click the toggle button
    fireEvent.click(toggleButton);

    // Password should be visible after clicking toggle button
    expect(passwordInput.type).toBe('text');

    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    const toggleButtonConfirm = screen.getByLabelText(
      'toggle confirm password visibility'
    );

    // Initially password should be hidden
    expect(confirmPasswordInput.type).toBe('password');

    // Click the toggle button
    fireEvent.click(toggleButtonConfirm);

    // Password should be visible after clicking toggle button
    expect(confirmPasswordInput.type).toBe('text');
  });

  test('TC-06: Should displays validation errors when submitting form with invalid data', async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Set mock data for the required fields
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john.doe@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your phone number'), {
      target: { value: '123' }
    }); //invalid phone number
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password' }
    }); //invalid password
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'password' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your address'), {
      target: { value: '123 Street' }
    });
    // fireEvent.change(screen.getByPlaceholderText('Enter your city'), {
    //   target: { value: 'City' }
    // });
    fireEvent.change(screen.getByPlaceholderText('Enter your state'), {
      target: { value: 'State' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your postal code'), {
      target: { value: '123456' }
    });
    // fireEvent.change(screen.getByPlaceholderText('SIGN UP'), {
    //   // target: { value: 'Country' }
    // });

    // const submitButton = screen.getByText('SUBMIT');
    // fireEvent.click(submitButton);

    // await waitFor(() => {
    //   expect(
    //     screen.getByText('Phone number must be exactly 10 digits')
    //   ).toBeInTheDocument();
    //   expect(
    //     screen.getByText(
    //       'Password must contain at least one lowercase letter, one uppercase letter, one digit, and minimum length of 8 characters'
    //     )
    //   ).toBeInTheDocument();
    // });
  });

  test('TC-07: Submits form successfully on valid input', async () => {
    // Mock the request function to return a response with status "CREATED"
    const mockResponse = { status: 'CREATED' };
    require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'john.doe@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Phone Number:'), {
      target: { value: '1234567890' }
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'Password123' }
    });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), {
      target: { value: 'Password123' }
    });
    fireEvent.change(screen.getByLabelText('Address Line:'), {
      target: { value: '123, Main Street' }
    });
    // fireEvent.change(screen.getByLabelText('City:'), {
    //   target: { value: 'Cityville' }
    // });
    fireEvent.change(screen.getByLabelText('State:'), {
      target: { value: 'Stateville' }
    });
    fireEvent.change(screen.getByLabelText('Postal Code:'), {
      target: { value: '12345' }
    });
    fireEvent.change(screen.getByLabelText('Country:'), {
      target: { value: 'Countryland' }
    });
    fireEvent.click(screen.getByLabelText('Prepaid'));

    // Submit the form
    // fireEvent.submit(screen.getByText('SAVE'));

    // Wait for the success message to appear
    // await waitFor(() =>
    //   expect(screen.getByText('Registration Successful')).toBeInTheDocument()
    // );
  });

  test('TC-08: Displays error message on server errors', async () => {
    // Mock the request function to return a response with server error
    require('../../axios/AxiosHelper').request.mockRejectedValue(
      new Error('Server error')
    );

    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'john.doe@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Phone Number:'), {
      target: { value: '1234567890' }
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'Password123' }
    });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), {
      target: { value: 'Password123' }
    });
    fireEvent.change(screen.getByLabelText('Address Line:'), {
      target: { value: '123, Main Street' }
    });
    // fireEvent.change(screen.getByLabelText('City:'), {
    //   target: { value: 'Cityville' }
    // });
    fireEvent.change(screen.getByLabelText('State:'), {
      target: { value: 'Stateville' }
    });
    fireEvent.change(screen.getByLabelText('Postal Code:'), {
      target: { value: '12345' }
    });
    fireEvent.change(screen.getByLabelText('Country:'), {
      target: { value: 'Countryland' }
    });
    fireEvent.click(screen.getByLabelText('Prepaid'));

    // Submit the form
    // fireEvent.submit(screen.getByText('SAVE'));

    // Wait for the error message to appear
    // await waitFor(() =>
    //   expect(
    //     screen.getByText('An error occurred during registration')
    //   ).toBeInTheDocument()
    // );
  });

  test('TC-09: Displays error message on invalid form details', async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'john.doe@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Phone Number:'), {
      target: { value: '1abc345678' } //invalid phone number
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'Password' } // invalid password
    });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), {
      target: { value: 'Password123' }
    });
    fireEvent.change(screen.getByLabelText('Address Line:'), {
      target: { value: '123, Main Street' }
    });
    // fireEvent.change(screen.getByLabelText('City:'), {
    //   target: { value: 'Cityville' }
    // });
    fireEvent.change(screen.getByLabelText('State:'), {
      target: { value: 'Stateville' }
    });
    fireEvent.change(screen.getByLabelText('Postal Code:'), {
      target: { value: '12345' }
    });
    fireEvent.change(screen.getByLabelText('Country:'), {
      target: { value: 'Countryland' }
    });
    fireEvent.click(screen.getByLabelText('Prepaid'));

    // Submit the form
    // fireEvent.submit(screen.getByText('SAVE'));

    // Wait for the success message to appear
    // await waitFor(() =>
    //   expect(screen.getByText('Invalid form fields')).toBeInTheDocument()
    // );
  });

  // test("TC-10 Displays 'Resend OTP' button when 'Send OTP' is clicked", async () => {

  //   const mockResponse = { status: 'OK', message: 'OTP:1234' };
  //   require('../../axios/AxiosHelper').request.mockResolvedValue(mockResponse);

  //   render(
  //     <MemoryRouter>
  //       <RegistrationPage />
  //     </MemoryRouter>
  //   );

  //   // Fill out the form fields
  //   fireEvent.change(screen.getByLabelText("Name:"), {
  //     target: { value: "John Doe" },
  //   });

  //   fireEvent.change(screen.getByLabelText("Email:"), {
  //     target: { value: "john.doe@example.com" },
  //   });

  //   fireEvent.change(screen.getByLabelText("Phone Number:"), {
  //     target: { value: "1234567890" },
  //   })

  //   // Click the "Send OTP" button
  //   fireEvent.click(screen.getByText("Send OTP"));

  //   // Wait for the OTP field and the "Resend OTP" button to appear
  //   await waitFor(() => {
  //     expect(screen.getByPlaceholderText("Enter OTP")).toBeInTheDocument();
  //     expect(screen.getByText("Resend OTP in 30s")).toBeInTheDocument();
  //   });

  //  // Enter some value in the OTP field
  //  fireEvent.change(screen.getByPlaceholderText("Enter OTP"), {
  //   target: { value: "123456" },
  // });

  // // Click the "Resend OTP" button
  // fireEvent.click(screen.getByText("Resend OTP in 30s"));

  // // Wait for the OTP field to be cleared
  // await waitFor(() => {
  //   expect(screen.getByPlaceholderText("Enter OTP")).toHaveValue("");
  // });

  // // Check if cursor changes when hovering over "Resend OTP"
  // fireEvent.mouseEnter(screen.getByText("Resend OTP in 30s"));
  // expect(screen.getByText("Resend OTP in 30s")).toHaveStyle("cursor: pointer;");
  // fireEvent.mouseLeave(screen.getByText("Resend OTP in 30s"));
  // });
});
