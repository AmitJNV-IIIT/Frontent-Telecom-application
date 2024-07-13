import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../components/SubscriptionHistory/Pagination';

describe('Pagination component', () => {
  let limit, prepaidPlans, offset, setOffset, handlePageChange;

  test('TC-01: Renders Pagination component with initial state', () => {
    limit = 5; // initial limit value
    prepaidPlans = Array.from({ length: 20 }, (_, i) => ({ id: i })); // array of 20 prepaid plans
    offset = 0; // initial offset value
    setOffset = jest.fn();
    handlePageChange = jest.fn();
    render(
      <Pagination
        limit={limit}
        prepaidPlans={prepaidPlans}
        offset={offset}
        setOffset={setOffset}
        handlePageChange={handlePageChange}
      />
    );

    const prevButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test("TC-02: Clicking 'Next' button increments offset and current page", () => {
    limit = 5; // initial limit value
    prepaidPlans = Array.from({ length: 20 }, (_, i) => ({ id: i })); // array of 20 prepaid plans
    offset = 0; // initial offset value
    setOffset = jest.fn();
    handlePageChange = jest.fn();
    render(
      <Pagination
        limit={limit}
        prepaidPlans={prepaidPlans}
        offset={offset}
        setOffset={setOffset}
        handlePageChange={handlePageChange}
      />
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(setOffset).toHaveBeenCalledWith(offset + 1);
    expect(handlePageChange).toHaveBeenCalledWith(offset + 1);
  });

  test("TC-03: Clicking 'Previous' button decrements offset and current page", () => {
    offset = 1;
    render(
      <Pagination
        limit={limit}
        prepaidPlans={prepaidPlans}
        offset={offset}
        setOffset={setOffset}
        handlePageChange={handlePageChange}
      />
    );
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(setOffset).toHaveBeenCalledWith(offset - 1);
    expect(handlePageChange).toHaveBeenCalledWith(offset - 1);
  });
});
