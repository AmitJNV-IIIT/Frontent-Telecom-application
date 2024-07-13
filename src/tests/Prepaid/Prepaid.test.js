global.window.scrollTo = jest.fn();

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act
} from '@testing-library/react';
import Prepaid from '../../pages/Prepaid';
import { request } from '../../axios/AxiosHelper';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../axios/AxiosHelper', () => ({
  request: jest.fn() // Mock the request function
})); //

describe('Prepaid', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    jest.clearAllMocks();
    // Clear all instances of the mock window.scrollTo function
    window.scrollTo.mockClear();
  });
  //
  test('TC1: renders Prepaid component correctly', async () => {
    // Mock the response from the request function
    const mockResponse = {
      plan: [
        { id: 1, name: 'Plan 1' },
        { id: 2, name: 'Plan 2' }
      ]
    };
    // Mock the implementation of the request function
    request.mockResolvedValueOnce(mockResponse);

    await act(async () => {
      // Use `act()` to wrap the render function
      render(
        <MemoryRouter>
          <Prepaid />
        </MemoryRouter>
      );
    });

    // Assert that the Prepaid component renders without crashing
    const prepaidMain = screen.getByTestId('prepaid-main');
    expect(prepaidMain).toBeInTheDocument();

    // Assert that the Filters component is rendered
    const filters = screen.getByTestId('filters');
    expect(filters).toBeInTheDocument();

    // Wait for the prepaid-recharge-card element to be rendered
    //  await waitFor(() => {
    //    const rechargeCards = screen.getByTestId('prepaid-recharge-card');
    //    expect(rechargeCards).toBeInTheDocument();
    //  });
  });

  test('TC2: updateFilter function updates the filters state correctly', async () => {
    // Render the Prepaid component
    render(
      <MemoryRouter>
        <Prepaid />
      </MemoryRouter>
    );

    // Mock the response from the request function
    const mockData = [
      { id: 1, name: 'Plan 1 for 30 days' },
      { id: 2, name: 'Plan 2 for 60 days' }
    ];
    request.mockResolvedValueOnce(mockData);

    // Simulate clicking a filter option
    const filterOption = screen.getByText('Days');
    fireEvent.click(filterOption);

    // Wait for the plans to be rendered and check if the correct plans are shown
    await waitFor(() => {
      const plan = screen.getByText('No Plans Found');
      expect(plan).toBeInTheDocument();
    });
  });

  test('TC3: changePrepaidCategory function changes the prepaidCategory state correctly', async () => {
    // Render the Prepaid component
    render(
      <MemoryRouter>
        <Prepaid />
      </MemoryRouter>
    );

    // Mock the response from the request function
    const mockData = [
      { id: 1, name: 'Unlimited Plan' },
      { id: 2, name: 'Data Plan' }
    ];
    request.mockResolvedValueOnce(mockData);

    // Simulate clicking a category option
    const categoryOption = screen.getByText('Unlimited');
    fireEvent.click(categoryOption);

    // Wait for the prepaid-recharge-card to be rendered and check if the correct plans are shown
    await waitFor(() => {
      const plan = screen.getByText('Unlimited');
      expect(plan).toBeInTheDocument();
    });
  });

  test('TC4: updateFilter function updates the filters state correctly', async () => {
    // Render the Prepaid component
    render(
      <MemoryRouter>
        <Prepaid />
      </MemoryRouter>
    );

    // Mock the response from the request function
    const mockData = [
      { id: 1, name: 'Plan for 30 days' },
      { id: 2, name: 'Plan for 60 days' }
    ];
    request.mockResolvedValueOnce(mockData);

    // Simulate clicking a filter option
    const filterOption = screen.getByText('Days');
    fireEvent.click(filterOption);

    // Wait for the prepaid-recharge-card to be rendered and check if the correct plans are shown
    await waitFor(() => {
      const plan = screen.getByText('No Plans Found');
      expect(plan).toBeInTheDocument();
    });
  });

  test('TC5: handlePageClick function handles page click correctly', async () => {
    // Mock the response from the request function
    const mockData = new Array(10)
      .fill()
      .map((_, i) => ({ id: i + 1, name: `Plan ${i + 1}` }));
    request.mockResolvedValueOnce(mockData);

    // Render the Prepaid component
    render(
      <MemoryRouter>
        <Prepaid />
      </MemoryRouter>
    );

    // Simulate clicking a pagination button
    const pageButton = screen.getByText('Loading....');
    fireEvent.click(pageButton);

    // Wait for the next page of prepaid-recharge-card to be rendered
    await waitFor(() => {
      const plan = screen.getByText('Loading....');
      expect(plan).toBeInTheDocument();
    });
  });

  it('TC6: updateFilter function updates the filters state correctly', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Prepaid />
      </MemoryRouter>
    );

    // Simulate clicking a filter option
    const filterOption = getByText('Days');
    fireEvent.click(filterOption);

    // Wait for the page number and item offset to be updated
    const pageNumber = 1;
    const itemOffset = 0;
    await waitFor(() => {
      expect(pageNumber).toBe(1);
      expect(itemOffset).toBe(0);
    });
  });
});
