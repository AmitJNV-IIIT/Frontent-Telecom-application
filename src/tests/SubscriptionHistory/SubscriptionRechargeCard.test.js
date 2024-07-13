import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SubscriptionRechargeCard from '../../components/SubscriptionHistory/SubscriptionRechargeCard';
import { request } from '../../axios/AxiosHelper';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

describe('SubscriptionRechargeCard component', () => {
  const mockData = [
    { status: 'active', plan: { planType: 'Broadband' } },
    { status: 'inactive', plan: { planType: 'Broadband' } },
    { status: 'active', plan: { planType: 'Prepaid' } },
    { status: 'inactive', plan: { planType: 'Prepaid' } }
  ];

  beforeEach(() => {
    request.mockResolvedValue({ status: 'OK', data: mockData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('TC-01: Renders loading spinner', async () => {
    render(<SubscriptionRechargeCard filters={{ category: '', status: '' }} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await act(() => Promise.resolve());
  });

  test('TC-02: Renders SubscriptionRechargeCard component and fetches data', async () => {
    render(<SubscriptionRechargeCard filters={{ category: '', status: '' }} />);
    await act(() => Promise.resolve());
    expect(request).toHaveBeenCalledWith('GET', '/subscriptions');
  });

  test('TC-03: Filters data according to filters', async () => {
    render(
      <SubscriptionRechargeCard
        filters={{ category: 'Broadband', status: 'active' }}
      />
    );
    await act(() => Promise.resolve());
    expect(
      screen.getByTestId('subscription-recharge-card')
    ).toBeInTheDocument();
  });

  test('TC-04: Applies filter for status when category is empty', async () => {
    render(
      <SubscriptionRechargeCard filters={{ category: '', status: 'active' }} />
    );
    await act(() => Promise.resolve());
    expect(screen.getAllByText('active').length).toBe(2); // Change this based on your mockData and filter
  });

  test('TC-05: Applies filter for Mobile Plans and status', async () => {
    render(
      <SubscriptionRechargeCard
        filters={{ category: 'Mobile Plans', status: 'inactive' }}
      />
    );
    await act(() => Promise.resolve());
    expect(screen.getAllByText('No History found').length).toBe(1); // Change this based on your mockData and filter
  });

  test('TC-06: Applies default filters when none are provided', async () => {
    render(<SubscriptionRechargeCard filters={null} />);
    await act(() => Promise.resolve());
    // Add assertions here based on your default filter behavior
  });

  // test('TC-07: Calls handleFeedbackChange when a subscription is clicked', async () => {
  //   render(<SubscriptionRechargeCard filters={{ category: '', status: '' }} />);
  //   await act(() => Promise.resolve());
  //   fireEvent.click(screen.getByText('active'));  // Change this based on your rendered data
  //   // Add assertions here to check if the feedback modal is opened
  // });

  // test('TC-08: Calls setIsModalOpen when a subscription is clicked', async () => {
  //   render(<SubscriptionRechargeCard filters={{ category: '', status: '' }} />);
  //   await act(() => Promise.resolve());
  //   fireEvent.click(screen.getByText('active')); // Change this based on your rendered data
  //   // Add assertions here to check if the confirmation modal is opened
  // });
});
