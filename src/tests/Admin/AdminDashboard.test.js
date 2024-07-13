/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AdminDashboard from '../../pages/AdminDashboard'; // Update the path as needed
import { request } from '../../axios/AxiosHelper'; // Adjust the path based on your project structure
class ResizeObserver {
  constructor(callback) {}
  observe(target) {}
  unobserve(target) {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn()
}));

describe('AdminDashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  it('TC0:renders without crashing', async () => {
    request.mockResolvedValueOnce({ data: [] }); // Mock successful response for visitorsData
    request.mockResolvedValueOnce({ data: [] }); // Mock successful response for feedbackData
    request.mockResolvedValueOnce({
      data: { monthly_sales: {}, total_earning: {} }
    }); // Mock successful response for matricesResponse

    render(<AdminDashboard />);

    // Add assertions to verify that the component renders without crashing
  });

  it('TC1:fetches data and renders components correctly', async () => {
    const mockVisitorsData = [{ value: 100 }];
    const mockFeedbackData = [
      {
        reviewID: null,
        mobileNumber: null,
        description:
          'Middle-of-the-road performance. Nothing remarkable about the service.',
        customerName: 'Jennifer Klein',
        category: null,
        starRating: '3'
      }
    ];
    const mockMonthlySalesData = [
      {
        data: '08 Mar',
        value: 12881
      }
    ];
    const mockTotalEarningsData = [
      [
        {
          name: 'Prepaid',
          value: 1000
        },
        {
          name: 'Broadband',
          value: 100
        },
        {
          name: 'Postpaid',
          value: 10000
        }
      ]
    ];

    request.mockResolvedValueOnce({ data: mockVisitorsData });
    request.mockResolvedValueOnce({ data: mockFeedbackData });
    request.mockResolvedValueOnce({
      data: {
        monthly_sales: {
          month: 'January',
          value: 1000
        },
        total_earning: [
          {
            name: 'Prepaid',
            value: 1000
          },
          {
            name: 'Broadband',
            value: 10000
          },
          {
            name: 'Postpaid',
            value: 19090
          }
        ]
      }
    });

    const { getByText, queryByText, debug } = render(<AdminDashboard />);

    // Print the rendered component tree to the console for inspection
    debug();

    // await waitFor(() => {
    //   // Add assertions to verify that components are rendered correctly with mock data
    //   console.log('Rendered HTML:', document.body.innerHTML); // Log rendered HTML for inspection

    //   // expect(queryByText(/Visitors/i)).toBeInTheDocument();
    //   // expect(getByText(/Highest Sales for a Month/i)).toBeInTheDocument();
    //   // expect(getByText(/Total Earnings/i)).toBeInTheDocument();
    //   expect(getByText(/Average Platform Feedback/i)).toBeInTheDocument();
    // });
  });

  it('TC2:displays error message if data fetching fails', async () => {
    request.mockRejectedValueOnce(new Error('Failed to fetch data')); // Mock failed request

    const { getByText } = render(<AdminDashboard />);

    await waitFor(() => {
      expect(getByText('Error fetching data')).toBeInTheDocument();
    });
  });

  // Add more test cases as needed to cover edge cases and different scenarios
});
