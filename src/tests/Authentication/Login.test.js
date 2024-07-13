import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act
} from '@testing-library/react';
import Login from '../../pages/Login';
import { useAuth } from '../../hooks/contextApi/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { request, requestNoHeader } from '../../axios/AxiosHelper';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useNavigate: jest.fn() // Mock useNavigate
}));

jest.mock('../../hooks/contextApi/AuthContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn(),
  setAuthHeader: jest.fn(),
  requestNoHeader: jest.fn() // Mock requestNoHeader as well
}));
describe('Login component', () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  test('TC0: Renders login form correctly', () => {
    useAuth.mockReturnValue({}); // Mock useAuth hook
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText('Please enter mobile number')).toBeInTheDocument();
    expect(screen.getByText('Please enter your password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('TC1: Validates phone number field', async () => {
    useAuth.mockReturnValue({});
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Test when phone number is not entered
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(
        screen.getByText('Please enter mobile number')
      ).toBeInTheDocument();
    });

    // Test when phone number is less than 10 digits
    // fireEvent.change(screen.getByPlaceholderText("Please enter a mobile number."), {
    //   target: { value: "123456789" },
    // });
    fireEvent.click(screen.getByText('Login'));
    // await waitFor(() => {
    //   expect(
    //     screen.getByText("Phone number cannot start with digits 0-5.")
    //   ).toBeInTheDocument();
    // });

    // Test when phone number starts with digits 0-5
    // fireEvent.change(screen.getByPlaceholderText("Please enter a mobile number."), {
    //   target: { value: "0123456789" },
    // });
    // fireEvent.click(screen.getByText("Login"));
    // await waitFor(() => {
    //   expect(
    //     screen.getByText("Phone number cannot start with digits 0-5.")
    //   ).toBeInTheDocument();
    // });
  });

  test('TC2: Validates password field', async () => {
    useAuth.mockReturnValue({});
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Test when password is not entered
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  // test("TC3: Submits login form with valid credentials", async () => {
  //   useAuth.mockReturnValue({});
  //   const mockResponse = {
  //     status: "OK",
  //     response: "Auth_Token: wertyuiokjhfdxcvbnfd",
  //     message: "USER",
  //   };
  //   request.mockResolvedValueOnce(mockResponse);

  //   render(
  //     <MemoryRouter>
  //       <Login />
  //     </MemoryRouter>
  //   );

  //   fireEvent.change(screen.getByPlaceholderText('Please enter a mobile number.'), {
  //     target: { value: "+911234567890" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText("Please enter your password"), {
  //     target: { value: "Password123" },
  //   });

  //   // Wait for button to be clickable
  //   await waitFor(() => screen.getByText("Login"));

  //   fireEvent.click(screen.getByText("Login"));

  //   // await waitFor(() => {
  //   //   // Use toHaveBeenCalled to check if request is called
  //   //   expect(request).toHaveBeenCalled();
  //   //   expect(request).toHaveBeenCalledWith("POST", 'auth/login', {
  //   //     mobileNumber: "+911234567890",
  //   //     password: "Password123",
  //   //   });
  //   //   expect(screen.getByText("Login successful")).toBeInTheDocument();
  //   // });
  // });

  // test("TC4: Displays error message for invalid credentials", async () => {
  //   useAuth.mockReturnValue({});
  //   const errorMessage = "Bad credentials";
  //   request.mockRejectedValueOnce(new Error(errorMessage));

  //   render(
  //     <MemoryRouter>
  //       <Login />
  //     </MemoryRouter>
  //   );

  //   fireEvent.change(screen.getByPlaceholderText('Please enter a mobile number.'), {
  //     target: { value: "+911234567890" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Please enter your password'), {
  //     target: { value: "Password123" },
  //   });
  //   fireEvent.click(screen.getByText("Login"));

  //   // await waitFor(() => {
  //   //   expect(request).toHaveBeenCalledWith("POST", "/auth/login", {
  //   //     mobileNumber: "+911234567890",
  //   //     password: "Password123",
  //   //   });
  //   //   expect(screen.getByText("Login Failed: Invalid Credentials")).toBeInTheDocument();
  //   // });
  // });

  // test("TC5: Displays error message for server error", async () => {
  //   useAuth.mockReturnValue({});
  //   const errorMessage = "Server Error";
  //   request.mockRejectedValueOnce(new Error(errorMessage));

  //   render(
  //     <MemoryRouter>
  //       <Login />
  //     </MemoryRouter>
  //   );

  //   fireEvent.change(screen.getByPlaceholderText('Please enter a mobile number.'), {
  //     target: { value: "+911234567890" },
  //   });
  //   fireEvent.change(screen.getByPlaceholderText('Please enter your password'), {
  //     target: { value: "Password123" },
  //   });
  //   fireEvent.click(screen.getByText("Login"));

  //   // await waitFor(() => {
  //   //   expect(request).toHaveBeenCalledWith("POST", "/auth/login", {
  //   //     mobileNumber: "+911234567890",
  //   //     password: "Password123",
  //   //   });
  //   //   expect(screen.getByText("Login Failed: Invalid Credentials")).toBeInTheDocument();
  //   // });
  // });

  // test("TC6: Toggles password visibility", () => {
  //   useAuth.mockReturnValue({});
  //   render(
  //     <MemoryRouter>
  //       <Login />
  //     </MemoryRouter>
  //   );

  //   // Initial state: password field should be of type 'password'
  //   // expect(screen.getByPlaceholderText("Please enter your password")).toHaveAttribute(
  //   //   "type",
  //   //   "password"
  //   // );

  //   // Click on the toggle icon to show password
  //   fireEvent.click(screen.getByTestId("password-toggle-icon"));
  //   // After clicking: password field should be of type 'text'
  //   expect(screen.getByPlaceholderText("Please enter your password")).toHaveAttribute(
  //     "type",
  //     "password"
  //   );

  //   // Click again to hide password
  //   fireEvent.click(screen.getByTestId("password-toggle-icon"));
  //   // Password field should be of type 'password' again
  //   expect(screen.getByPlaceholderText("Please enter your password")).toHaveAttribute(
  //     "type",
  //     "password"
  //   );
  // });

  // test("TC8: Validates phone number field length", async () => {
  //   useAuth.mockReturnValue({});
  //   render(
  //     <MemoryRouter>
  //       <Login />
  //     </MemoryRouter>
  //   );

  //   // Test when phone number length is not 10 and not empty
  //   // fireEvent.change(screen.getByPlaceholderText("Please enter mobile number"), {
  //   //   target: { value: "123456789" },
  //   // });
  //   fireEvent.click(screen.getByText("Login"));
  //   await waitFor(() => {
  //     expect(
  //       screen.getByText("Phone number cannot start with digits 0-5.")
  //     ).toBeInTheDocument();
  //   });

  //   // Test when phone number length is exactly 10
  //   fireEvent.change(screen.getByPlaceholderText("Please enter mobile number"), {
  //     target: { value: "1234567890" },
  //   });
  //   fireEvent.click(screen.getByText("Login"));
  //   await waitFor(() => {
  //     expect(screen.queryByText(/Phone number must be exactly 10 digits long\./)).not.toBeInTheDocument();
  //   });

  //   // Test when phone number is empty
  //   fireEvent.change(screen.getByPlaceholderText("Please enter mobile number"), {
  //     target: { value: "" },
  //   });
  //   fireEvent.click(screen.getByText("Login"));
  //   await waitFor(() => {
  //     expect(screen.queryByText(/Phone number must be exactly 10 digits long\./)).not.toBeInTheDocument();
  //   });
  // });
});
