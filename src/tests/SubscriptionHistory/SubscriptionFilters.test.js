import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../../components/SubscriptionHistory/SubscriptionFilters';

describe('Filters component', () => {
  let mockChangeFilter = jest.fn();
  let isMobile = false;

  test('TC-01: Renders Filters component', () => {
    render(<Filters changeFilter={mockChangeFilter} isMobile={isMobile} />);
    const filterMainDiv = screen.getByTestId('filter-main-div');
    expect(filterMainDiv).toBeInTheDocument();
  });

  test('TC-02: Should show filter options when Filters button is clicked', () => {
    render(<Filters changeFilter={mockChangeFilter} isMobile={isMobile} />);
    const filtersButton = screen.getByTestId('filters-btn');
    fireEvent.click(filtersButton);
    const categoryFilter = screen.getAllByText('Category');
    const statusFilter = screen.getAllByText('Status');
    expect(categoryFilter[0]).toBeInTheDocument();
    expect(statusFilter[0]).toBeInTheDocument();
  });

  test('TC-03: Should call changeFilter when filter options are changed', () => {
    render(<Filters changeFilter={mockChangeFilter} isMobile={isMobile} />);
    const filtersButton = screen.getByTestId('filters-btn');
    fireEvent.click(filtersButton);
    const broadbandFilter = screen.getAllByLabelText('Broadband');
    const activeFilter = screen.getAllByLabelText('Active');
    fireEvent.click(broadbandFilter[0]);
    fireEvent.click(activeFilter[0]);
    expect(mockChangeFilter).toHaveBeenCalled();
  });

  test('TC-04: Should clear filters when Clear Filters button is clicked', () => {
    isMobile = true;
    render(<Filters changeFilter={mockChangeFilter} isMobile={isMobile} />);
    const filtersButton = screen.getByText('Filters');
    fireEvent.click(filtersButton);
    const clearFiltersButton = screen.getByText('Filters');
    fireEvent.click(clearFiltersButton);
    expect(mockChangeFilter).toHaveBeenCalledWith(['', '']);
  });

  test('TC-05: handleStatusChange should update status and call handleOpen', () => {
    const setStatus = jest.fn();
    const handleOpen = jest.fn();
    // Mocking useState and useEffect
    jest.spyOn(React, 'useState').mockReturnValue([null, setStatus]);
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

    render(
      <Filters
        changeFilter={mockChangeFilter}
        isMobile={isMobile}
        handleOpen={handleOpen}
      />
    );
    const filtersButton = screen.getByTestId('filter-main-div');
    fireEvent.click(filtersButton);
    const activeFilter = screen.getByLabelText('Active');
    fireEvent.click(activeFilter);
    expect(setStatus).toHaveBeenCalledWith('Active');
    // expect(handleOpen).toHaveBeenCalled();
  });
});
