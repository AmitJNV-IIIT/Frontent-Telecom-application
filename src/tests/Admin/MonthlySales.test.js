import React from 'react';
import { render, waitFor } from '@testing-library/react';
import MonthlySales from '../../components/Admin/AdminPlan/MonthlySales';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
}));

describe('MonthlySales Component', () => {
  it('TC0: renders MonthlySales component with data', async () => {
    const mockData = {
      data: {
        monthly_sales: {
          january: 100,
          february: 200,
          march: 150,
          april: 300,
          may: 250,
          june: 180,
          july: 220,
          august: 280,
          september: 210,
          october: 350,
          november: 320,
          december: 270
        }
      }
    };

    const request = require('../../axios/AxiosHelper').request;
    request.mockResolvedValue(mockData);

    const { getByText } = render(<MonthlySales />);

    expect(getByText('Monthly Sales')).toBeInTheDocument();
    expect(request).toHaveBeenCalledTimes(0);

    // You can add more assertions based on your component's behavior
  });

  // it("TC1: renders error message when data fetching fails", async () => {
  //   const errorMessage = "Failed to fetch data";

  //   const request = require("../../axios/AxiosHelper").request;
  //   request.mockRejectedValue(new Error(errorMessage));

  //   const { getByText } = render(<MonthlySales />);

  //   await waitFor(() => {
  //     expect(getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  //   });

  //   expect(request).toHaveBeenCalledTimes(1);
  // });

  it('TC2: renders MonthlySales component with data', async () => {
    const mockData = {
      data: {
        monthly_sales: {
          january: 100,
          february: 200,
          march: 150,
          april: 300,
          may: 250,
          june: 180,
          july: 220,
          august: 280,
          september: 210,
          october: 350,
          november: 320,
          december: 270
        }
      }
    };

    const request = require('../../axios/AxiosHelper').request;
    request.mockResolvedValue({ status: 'OK', data: mockData });

    const { getByText } = render(<MonthlySales />);

    expect(getByText('Monthly Sales')).toBeInTheDocument();
    expect(request).toHaveBeenCalledTimes(0);

    // You can add more assertions based on your component's behavior
  });
});
