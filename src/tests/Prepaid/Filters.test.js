import React from 'react';
import { render, fireEvent, getAllByText } from '@testing-library/react';
import Filters from '../../components/Prepaid/Filters';

describe('Filters component', () => {
  test('TC1 : updates filter on button click', () => {
    const updateFilterMock = jest.fn();
    const { getByTestId, getAllByText } = render(
      <Filters updateFilter={updateFilterMock} />
    );

    // Initially, the filter panel should not be open
    expect(getAllByText('28')).toHaveLength(1); // Ensure there is one instances

    // Click on the filter button to open the panel
    fireEvent.click(getByTestId('filters-button'));

    // Now, the filter panel should be visible
    expect(getAllByText('28 Days')).toHaveLength(1); // Ensure there are still two instances

    // Click on a filter option
    fireEvent.click(getAllByText('28 Days')[0]); // Choose the first instance

    // Expect the updateFilter function to be called with the correct parameters
    expect(updateFilterMock).toHaveBeenCalledWith('days', 28);
  });

  test('TC2 : applies active class to selected filter', () => {
    const { queryAllByText } = render(<Filters />);

    // Initially, no filter should have the active class
    const filterElements = queryAllByText('28');
    expect(filterElements.length).toBeGreaterThan(0);
    expect(filterElements[0].parentElement).not.toHaveClass('active-filter');

    // Click on a filter option
    fireEvent.click(filterElements[0]);

    // Now, the selected filter should have the active class
    expect(filterElements[0].parentElement).toHaveClass('active-filter');
  });

  test('TC3: updates filter on mobile filter option click', () => {
    const updateFilterMock = jest.fn();
    const { getByText } = render(<Filters updateFilter={updateFilterMock} />);

    // Click on the mobile filter option for 56 Days
    fireEvent.click(getByText('56'));

    // Expect the updateFilter function to be called with the correct parameters
    expect(updateFilterMock).toHaveBeenCalledWith('days', 56);
  });

  test('TC4: updates filter on mobile filter option click for data', () => {
    const updateFilterMock = jest.fn();
    const { getByText } = render(<Filters updateFilter={updateFilterMock} />);

    // Click on the mobile filter option for 2 GB
    fireEvent.click(getByText('2 GB'));

    // Expect the updateFilter function to be called with the correct parameters
    expect(updateFilterMock).toHaveBeenCalledWith('data', 2);
  });

  test('TC5: updates filter on mobile filter option click for 84 Days', () => {
    const updateFilterMock = jest.fn();
    const { getByText } = render(<Filters updateFilter={updateFilterMock} />);

    // Click on the mobile filter option for 84 Days
    fireEvent.click(getByText('84'));

    // Expect the updateFilter function to be called with the correct parameters
    expect(updateFilterMock).toHaveBeenCalledWith('days', 84);
  });

  test('TC6: updates filter on mobile filter option click for 180 Days', () => {
    const updateFilterMock = jest.fn();
    const { getByText } = render(<Filters updateFilter={updateFilterMock} />);

    // Click on the mobile filter option for 180 Days
    fireEvent.click(getByText('180'));

    // Expect the updateFilter function to be called with the correct parameters
    expect(updateFilterMock).toHaveBeenCalledWith('days', 180);
  });

  test('TC7: updates filter on mobile filter option click for 1 GB', () => {
    const updateFilterMock = jest.fn();
    const { getByText } = render(<Filters updateFilter={updateFilterMock} />);

    // Click on the mobile filter option for 1 GB
    fireEvent.click(getByText('1 GB'));

    // Expect the updateFilter function to be called with the correct parameters
    expect(updateFilterMock).toHaveBeenCalledWith('data', 1);
  });

  test('TC8: updates filter on mobile filter option click for 3 GB', () => {
    const updateFilterMock = jest.fn();
    const { getByText } = render(<Filters updateFilter={updateFilterMock} />);

    // Click on the mobile filter option for 3 GB
    fireEvent.click(getByText('3 GB'));

    // Expect the updateFilter function to be called with the correct parameters
    expect(updateFilterMock).toHaveBeenCalledWith('data', 3);
  });

  test('TC9: updates filter on mobile filter option click for 4 GB', () => {
    const updateFilterMock = jest.fn();
    const { getByText } = render(<Filters updateFilter={updateFilterMock} />);

    // Click on the mobile filter option for 4 GB
    fireEvent.click(getByText('4 GB'));

    // Expect the updateFilter function to be called with the correct parameters
    expect(updateFilterMock).toHaveBeenCalledWith('data', 4);
  });

  test('TC10: updates filter on mobile filter option click for 5 GB', () => {
    const updateFilterMock = jest.fn();
    const { getByText } = render(<Filters updateFilter={updateFilterMock} />);

    // Click on the mobile filter option for 5 GB
    fireEvent.click(getByText('5 GB'));

    // Expect the updateFilter function to be called with the correct parameters
    expect(updateFilterMock).toHaveBeenCalledWith('data', 5);
  });

  test('TC11: updates filter on mobile filter option click for 6 GB', () => {
    const updateFilterMock = jest.fn();
    const { getByText } = render(<Filters updateFilter={updateFilterMock} />);

    // Click on the mobile filter option for 6 GB
    fireEvent.click(getByText('6 GB'));

    // Expect the updateFilter function to be called with the correct parameters
    expect(updateFilterMock).toHaveBeenCalledWith('data', 6);
  });
});
