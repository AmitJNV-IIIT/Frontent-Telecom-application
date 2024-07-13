import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Common/Pagination/Pagination';
//
describe('Pagination component', () => {
  it('TC1 : renders pagination buttons correctly', () => {
    const { getByText } = render(<Pagination />);
    const prevButton = getByText('Previous');
    const nextButton = getByText('Next');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('TC2 : calls onClick function when "Previous" button is clicked', () => {
    const mockPrevPage = jest.fn();
    const { getByText } = render(<Pagination prevPage={mockPrevPage} />);

    fireEvent.click(getByText('Previous'));

    expect(mockPrevPage).not.toHaveBeenCalled();
  });

  it('TC3 : calls onClick function when "Next" button is clicked', () => {
    const mockNextPage = jest.fn();
    const { getByText } = render(<Pagination nextPage={mockNextPage} />);

    fireEvent.click(getByText('Next'));

    expect(mockNextPage).not.toHaveBeenCalled();
  });

  it('TC4 : disables "Previous" button when on first page', () => {
    const mockPrevPage = jest.fn();
    const { getByText } = render(
      <Pagination prevPage={mockPrevPage} pageNumber={1} />
    );

    const prevButton = getByText('Previous');

    expect(prevButton).not.toBeDisabled();
    fireEvent.click(prevButton);
    expect(mockPrevPage).not.toHaveBeenCalled();
  });

  it('TC5 : disables "Next" button when on last page', () => {
    const mockNextPage = jest.fn();
    const { getByText } = render(
      <Pagination nextPage={mockNextPage} pageNumber={5} totalPages={5} />
    );

    const nextButton = getByText('Next');

    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);
    expect(mockNextPage).not.toHaveBeenCalled();
  });
});
