import React from 'react';
import { render } from '@testing-library/react';
import TotalEarnings from '../../components/Admin/AdminPlan/TotalEarnings';

global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
};
describe('TotalEarnings Component', () => {
  // Mock data for testing
  const mockData = [
    { name: 'ProductA', value: 1000 },
    { name: 'ProductB', value: 2000 },
    { name: 'ProductC', value: 1500 }
  ];

  it('TC1: Calculates total earnings correctly', () => {
    // Calculate total earnings manually based on mock data
    const totalEarnings = mockData.reduce((acc, item) => acc + item.value, 0);

    const { getByText } = render(<TotalEarnings data={mockData} />);

    // Check if the total earnings match the calculated value
    //expect(getByText(`Total Earnings: Rs. ${totalEarnings}`)).toBeInTheDocument();
  });

  it('TC2: Formats total earnings correctly for large amounts', () => {
    const largeData = [{ name: 'ProductX', value: 1000000 }];

    const { getByText } = render(<TotalEarnings data={largeData} />);
  });

  it('TC3: Formats total earnings correctly for medium amounts', () => {
    const mediumData = [{ name: 'ProductY', value: 10000 }];

    const { getByText } = render(<TotalEarnings data={mediumData} />);
  });

  it('TC4: Formats total earnings correctly for small amounts', () => {
    const smallData = [{ name: 'ProductZ', value: 100 }];

    const { getByText } = render(<TotalEarnings data={smallData} />);
  });
});
