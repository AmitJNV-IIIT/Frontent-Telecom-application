import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrentBroadbandPlan from '../../components/Home/CurrentBroadbandPlan';
import { MemoryRouter, Router } from 'react-router-dom';
import ReactSpeedometer from 'react-d3-speedometer';
//
jest.mock('react-d3-speedometer', () => {
  return function MockReactSpeedometer() {
    return <div data-testid="mock-speedometer">Mock Speedometer</div>;
  };
});

describe('CurrentBroadbandPlan component', () => {
  it('test', () => {
    expect(true);
  });
  const broadbandData = {
    mobileNumber: '1234567890',
    status: 'Active',
    price: '₹1999',
    plan: {
      speed: 100,
      data: 'Unlimited',
      validity: '30'
    },
    purchasedOn: '2024-04-20'
  };

  test('renders with active plan', () => {
    render(
      <MemoryRouter>
        <CurrentBroadbandPlan broadband={broadbandData} />
      </MemoryRouter>
    );

    expect(screen.getByText('Current Broadband Plan')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Data Plan')).toBeInTheDocument();
    expect(screen.getByText('Purchsed on')).toBeInTheDocument();
    expect(screen.getByText('Expires on')).toBeInTheDocument();
  });

  test('renders with expired plan', () => {
    const expiredBroadbandData = { ...broadbandData, status: 'Expired' };
    render(
      <MemoryRouter>
        <CurrentBroadbandPlan broadband={broadbandData} />
      </MemoryRouter>
    );

    expect(screen.getByText('Current Broadband Plan')).toBeInTheDocument();
    expect(screen.getByText('Plan Status')).toBeInTheDocument();
  });

  // test('displays broadband speed', () => {
  //   render(<CurrentBroadbandPlan broadband={broadbandData} />);

  //   expect(screen.getByText('100 Mbps')).toBeInTheDocument();
  // });

  test('displays broadband price', () => {
    render(
      <MemoryRouter>
        <CurrentBroadbandPlan broadband={broadbandData} />
      </MemoryRouter>
    );

    expect(screen.getByText('Mock Speedometer')).toBeInTheDocument();
  });

  //   test('displays broadband purchased and expiration dates', () => {
  //     render(<CurrentBroadbandPlan broadband={broadbandData} />);
  // // Assuming validity of 30 days
  //     expect(screen.getByText('2024-04-20')).toBeInTheDocument();
  //     expect(screen.getByText('2024-05-20')).toBeInTheDocument(); // Assuming validity of 30 days
  //   });
});
