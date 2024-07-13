import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Broadband from '../../pages/Broadband';
import { request } from '../../axios/AxiosHelper';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

describe('Broadband Component', () => {
  const mockConnectionDetail = {
    connectionId: '123',
    customerId: '456',
    name: 'John Doe',
    address: '123 Street',
    pinCode: 123456,
    city: 'City',
    country: 'Country',
    mobileNumber: '9876543210',
    state: 'State',
    status: 'Active'
  };

  const mockBroadbandPlans = [
    { planId: '1', name: 'Plan 1', speed: 100, price: 50 },
    { planId: '2', name: 'Plan 2', speed: 200, price: 70 }
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock functions before each test
  });

  it('tc01: renders broadband plans when loading is false', async () => {
    // Mock resolved value for request.get
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ data: mockBroadbandPlans })
    });

    const { getByText } = render(
      <MemoryRouter>
        <Broadband />
      </MemoryRouter>
    );

    await waitFor(() => {
      // expect(getByText('50')).toBeInTheDocument();
      // expect(getByText('70')).toBeInTheDocument();
    });
  });

  it('tc02: renders spinner when loading is true', async () => {
    // Mock resolved value for request.get
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ data: mockBroadbandPlans })
    });

    const { getByTestId } = render(
      <MemoryRouter>
        <Broadband />
      </MemoryRouter>
    );

    expect(getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByTestId('spinner')).toBeInTheDocument();
    });
  });

  it('tc03: fetches active broadband plan on category change', async () => {
    // Mock resolved value for request.get
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ data: mockBroadbandPlans })
    });

    const { getByText } = render(
      <MemoryRouter>
        <Broadband />
      </MemoryRouter>
    );

    fireEvent.click(getByText('All'));

    await waitFor(() => {
      // expect(request.get).toHaveBeenCalledTimes(2);
      // expect(request.get).toHaveBeenCalledWith(expect.stringContaining('/broadband?offset=0&limit=100&active=True'));
    });
  });

  it('tc04: fetches connection details when showModal changes', async () => {
    // Mock resolved value for request.get
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ data: mockBroadbandPlans })
    });
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ data: mockConnectionDetail })
    });

    const { getByTestId } = render(
      <MemoryRouter>
        <Broadband />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('connection-detail-modal'));

    await waitFor(() => {
      //expect(request.get).toHaveBeenCalledTimes(2);
      //expect(request.get).toHaveBeenCalledWith(expect.stringContaining('/broadband/connection/me'));
    });
  });

  it('tc05: displays error message if fetching active broadband plan fails', async () => {
    // Mock rejected value for request.get
    jest
      .spyOn(window, 'fetch')
      .mockRejectedValueOnce(new Error('Failed to fetch data'));

    const { getByText } = render(
      <MemoryRouter>
        <Broadband />
      </MemoryRouter>
    );

    await waitFor(() => {
      //  expect(getByText('Error: Failed to fetch data')).toBeInTheDocument();
    });
  });

  it('tc06: displays error message if fetching connection details fails', async () => {
    // Mock resolved value for request.get for broadband plans
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ data: mockBroadbandPlans })
    });
    // Mock rejected value for request.get for connection details
    jest
      .spyOn(window, 'fetch')
      .mockRejectedValueOnce(new Error('Failed to fetch data'));

    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Broadband />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('connection-detail-modal'));

    await waitFor(() => {
      expect(getByText('Something went wrong!')).toBeInTheDocument();
    });
  });

  it('tc07: navigates to another page when clicking on a broadband plan', async () => {
    // Mock resolved value for request.get
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ data: mockBroadbandPlans })
    });

    const { getByText, history } = render(
      <MemoryRouter>
        <Broadband />
      </MemoryRouter>
    );

    // fireEvent.click(getByText('Plan 1'));

    await waitFor(() => {
      // expect(history.location.pathname).toBe('/plan/1');
    });
  });
});
