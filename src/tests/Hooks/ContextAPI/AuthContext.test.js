import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../../hooks/contextApi/AuthContext';

describe('AuthProvider', () => {
  it('should render children with default context values', () => {
    const TestComponent = () => {
      const { isLogin, role } = useAuth();
      return (
        <div>
          <span data-testid="isLogin">{`${isLogin}`}</span>
          <span data-testid="role">{role}</span>
        </div>
      );
    };

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByTestId('isLogin').textContent).toBe('false');
    expect(getByTestId('role').textContent).toBe('USER');
  });

  it('should update context values when login is called', () => {
    const TestComponent = () => {
      const { isLogin, role, login } = useAuth();
      return (
        <div>
          <span data-testid="isLogin">{`${isLogin}`}</span>
          <span data-testid="role">{role}</span>
          <button onClick={() => login('ADMIN')}>Login</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(getByText('Login'));

    expect(getByTestId('isLogin').textContent).toBe('true');
    expect(getByTestId('role').textContent).toBe('ADMIN');
  });

  it('should update context values when logout is called', () => {
    const TestComponent = () => {
      const { isLogin, role, login, logout } = useAuth();
      return (
        <div>
          <span data-testid="isLogin">{`${isLogin}`}</span>
          <span data-testid="role">{role}</span>
          <button onClick={() => logout()}>Logout</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(getByText('Logout'));

    expect(getByTestId('isLogin').textContent).toBe('false');
    expect(getByTestId('role').textContent).toBe('USER');
  });
});
