import React from 'react';
import { render, act, waitFor, screen } from '@testing-library/react';
import { request } from '../../axios/AxiosHelper';
import Home from '../../pages/Home';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

jest.mock('../../hooks/contextApi/AuthContext', () => ({
  useAuth: jest.fn(() => ({ isLogin: true }))
}));

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

jest.mock('react-d3-speedometer', () => {
  return () => <div data-testid="mock-speedometer">Mock Speedometer</div>;
});

describe('UserHomePage', () => {
  // it('TC0: renders correctly', async () => {
  //   const mockUserInfo = {
  //     name: 'Test User',
  //     simType: 'prepaid',
  //   };
  //   const mockSubscriptions = [
  //     {
  //       planType: 'Prepaid',
  //     },
  //     {
  //       planType: 'Postpaid',
  //     },
  //   ];

  //   request.mockImplementation((method, url) => {
  //     if (method === 'GET' && url === '/auth/user') {
  //       return Promise.resolve({ data: mockUserInfo });
  //     }
  //     if (method === 'GET' && url === '/subscriptions') {
  //       return Promise.resolve({ data: mockSubscriptions });
  //     }
  //     // return Promise.reject(new Error('Unknown API endpoint'));
  //   });

  //   await act(async () => {
  //     render(
  //     <MemoryRouter>
  //     <Home />
  //     </MemoryRouter>);
  //   });

  //   expect(screen.getByText('Hi Test, Welcome to Excitel!')).toBeInTheDocument();
  //   expect(screen.getByText('Current Broadband Plan')).toBeInTheDocument();
  //   expect(screen.getByText('Oops!! No Broadband Plan Found')).toBeInTheDocument();
  //   // expect(screen.getByTestId('mock-speedometer')).toBeInTheDocument();
  // });

  it('TC1: renders spinner', async () => {
    request.mockImplementation(() => {
      return new Promise(() => {}); // Never-resolved promise to simulate loading state
    });

    render(<Home />);

    expect(screen.getByTestId('default-spinner')).toBeInTheDocument();
  });

  it('TC2: renders error message', async () => {
    request.mockImplementation(() => {
      return Promise.reject(new Error('Unknown API endpoint'));
    });

    await act(async () => {
      render(<Home />);
    });

    expect(screen.getByText(/Loading..../)).toBeInTheDocument();
  });
});
