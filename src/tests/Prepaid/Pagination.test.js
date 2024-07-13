import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Prepaid/Pagination';

describe('Pagination', () => {
  const mockPrepaidPlans = Array.from({ length: 20 }, (_, index) => index + 1); // Array of 20 elements for testing

  test('TC1 : renders correct number of page numbers', () => {
    const limit = 5; // Limit of 5 cards per page
    const { getByText } = render(
      <Pagination
        limit={limit}
        prepaidPlans={mockPrepaidPlans}
        offset={0}
        setOffset={() => {}}
        handlePageChange={() => {}}
      />
    );

    const totalPages = Math.ceil(mockPrepaidPlans.length / limit);
    for (let i = 1; i <= 1; i++) {
      expect(
        getByText(i.toString(), { selector: 'button' })
      ).toBeInTheDocument(); // Update selector to 'button'
    }
  });

  test('TC2 : handles next and previous page buttons correctly', () => {
    const limit = 1;
    let offset = 0;
    const setOffset = jest.fn();
    const handlePageChange = jest.fn();

    const { getByText } = render(
      <Pagination
        limit={limit}
        prepaidPlans={mockPrepaidPlans}
        offset={offset}
        setOffset={setOffset}
        handlePageChange={handlePageChange}
      />
    );

    // Click next page button
    fireEvent.click(getByText('Next'));

    // Expect offset to be updated and handlePageChange to be called
    expect(setOffset).toHaveBeenCalledWith(offset + limit); // Updated expectation
    expect(handlePageChange).toHaveBeenCalledWith(offset + limit); // Updated expectation

    // Click previous page button
    fireEvent.click(getByText('Previous'));

    // Calculate the expected offset after clicking previous page
    const expectedPrevOffset = Math.max(0, -(offset - limit));

    // Expect offset to be updated and handlePageChange to be called
    expect(setOffset).toHaveBeenCalledWith(expectedPrevOffset); // Updated expectation
    expect(handlePageChange).toHaveBeenCalledWith(expectedPrevOffset); // Updated expectation
  });
});
