import React from 'react';
import { render } from '@testing-library/react';
import ResetPassword from '../../pages/ResetPassword';
import ResetPasswordPage from '../../components/Authentication/ResetPassword/ResetPassword';

jest.mock('../../components/Authentication/ResetPassword/ResetPassword', () =>
  jest.fn(() => null)
);

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

describe('ResetPassword Component', () => {
  it('renders ResetPasswordPage', () => {
    render(<ResetPassword />);
    expect(ResetPasswordPage).toHaveBeenCalledTimes(1);
  });
});
