import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor
} from '@testing-library/react';
import Plans from '../../components/LandingComponent/Plans';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { request } from '../../axios/AxiosHelper';
import Swal from 'sweetalert2';

const trendingPlansUrl =
  'https://qf76c1kzcj.execute-api.us-east-1.amazonaws.com/v2-trending/excitel-bucket/trendingPlans.json';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('../../hooks/contextApi/AuthContext', () => ({
  useAuth: jest.fn(() => ({ isLogin: true })) // Mocking the return value of useAuth
}));

// Mocking the Axios request
jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mocking the request function
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        Prepaid: {
          status: 'OK',
          data: [
            {
              ott: ['disney', 'prime', 'netflix', 'spotify']
            }
          ]
        },
        Postpaid: {
          status: 'OK',
          data: [
            {
              ott: ['disney', 'netflix']
            }
          ]
        },
        Broadband: {
          status: 'OK',
          data: [
            {
              ott: ['None']
            }
          ]
        }
      })
  })
);
describe('Plans component', () => {
  test('TC-01: Renders Prepaid Trending Package correctly', () => {
    render(
      <MemoryRouter>
        <Plans />
      </MemoryRouter>
    );

    // Check if Prepaid Trending Package title is rendered
    expect(screen.getByText('Prepaid Trending Package')).toBeInTheDocument();

    // Check if Buy now button is rendered
    expect(screen.getAllByText('Buy now')[0]).toBeInTheDocument();
  });

  test('TC-02: Clicking Buy now button for Prepaid Trending Package navigates to login page', () => {
    // Mocking the window.scrollTo function
    window.scrollTo = jest.fn();

    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Plans />
      </MemoryRouter>
    );

    // Find and click the Buy now button for Prepaid Trending Package
    const buyNowButton = screen.getAllByText('Buy now');
    fireEvent.click(buyNowButton[0]);

    // Check if window.scrollTo function is called with (0, 0)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);

    // Check if navigation to login page is triggered
    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      state: { data: undefined, from: '/', isModalOpen: true }
    });
  });

  test('TC-03: Renders Postpaid Trending Package correctly', () => {
    render(
      <MemoryRouter>
        <Plans />
      </MemoryRouter>
    );

    // Check if Postpaid Trending Package title is rendered
    expect(screen.getByText('Postpaid Trending Package')).toBeInTheDocument();

    // Check if Buy now button is rendered
    expect(screen.getAllByText('Buy now')[1]).toBeInTheDocument();
  });

  test('TC-04: Clicking Buy now button for Postpaid Trending Package navigates to login page', () => {
    // Mocking the window.scrollTo function
    window.scrollTo = jest.fn();

    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Plans />
      </MemoryRouter>
    );

    // Find and click the Buy now button for Postpaid Trending Package
    const buyNowButton = screen.getAllByText('Buy now')[1];
    fireEvent.click(buyNowButton);

    // Check if window.scrollTo function is called with (0, 0)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);

    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      state: { data: undefined, from: '/', isModalOpen: true }
    });
  });

  test('TC-05: Renders Broadband Trending Package correctly', () => {
    render(
      <MemoryRouter>
        <Plans />
      </MemoryRouter>
    );

    // Check if Broadband Trending Package title is rendered
    expect(screen.getByText('Broadband Trending Package')).toBeInTheDocument();

    // Check if Buy now button is rendered
    expect(screen.getAllByText('Buy now')[2]).toBeInTheDocument();
  });

  test('TC-06: Clicking Buy now button for Broadband Trending Package navigates to login page', () => {
    // Mocking the window.scrollTo function
    window.scrollTo = jest.fn();

    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Plans />
      </MemoryRouter>
    );

    // Find and click the Buy now button for Broadband Trending Package
    const buyNowButton = screen.getAllByText('Buy now');
    fireEvent.click(buyNowButton[2]);

    // Check if window.scrollTo function is called with (0, 0)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);

    // Check if navigation to login page is triggered

    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      state: { data: undefined, from: '/', isModalOpen: true }
    });
  });

  test('TC-08: Fetches and processes trending plans data correctly', async () => {
    // Mock the fetch response
    const mockData = {
      Prepaid: {
        status: 'OK',
        data: [
          {
            ott: ['disney', 'prime', 'netflix', 'spotify']
          }
        ]
      },
      Postpaid: {
        status: 'OK',
        data: [
          {
            ott: ['disney', 'netflix']
          }
        ]
      },
      Broadband: {
        status: 'OK',
        data: [
          {
            ott: ['None']
          }
        ]
      }
    };

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData)
    });

    render(
      <MemoryRouter>
        <Plans />
      </MemoryRouter>
    );

    // Wait for the component to finish rendering after data fetching
    await waitFor(() => {
      // Check if the state is correctly updated after data fetching
      expect(screen.getByText('Prepaid Trending Package')).toBeInTheDocument();
      expect(screen.getByText('Postpaid Trending Package')).toBeInTheDocument();
      expect(
        screen.getByText('Broadband Trending Package')
      ).toBeInTheDocument();

      // // Check if the ott services are correctly processed and capitalized
      // expect(screen.getByText()).toBeInTheDocument();
      // // expect(screen.getByText("prime")).toBeInTheDocument();
      // // expect(screen.getByText("netflix")).toBeInTheDocument();
      // // expect(screen.getByText("spotify")).toBeInTheDocument();
      // // expect(screen.getByText("None")).toBeInTheDocument();
    });
  });
});
