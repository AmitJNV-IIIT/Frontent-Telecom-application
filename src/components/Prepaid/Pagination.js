import React, { useState } from 'react';
import PropTypes from 'prop-types';
//
const Pagination = ({
  limit,
  prepaidPlans,
  offset,
  setOffset,
  handlePageChange
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = limit;
  const totalPages = Math.ceil(prepaidPlans.length / cardsPerPage);
  const pageNumbersToShow = 1;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(pageNumbersToShow / 2)
    );
    const endPage = Math.min(totalPages, startPage + pageNumbersToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleNextPageChange = () => {
    setOffset(offset + 1);
    setCurrentPage(currentPage + 1);
    handlePageChange(offset + 1); // Notify parent component about page change
  };

  const handlePrevPageChange = () => {
    setOffset(offset - 1);
    setCurrentPage(currentPage - 1);
    handlePageChange(offset - 1); // Notify parent component about page change
  };

  return (
    <div className="pagination-prepaid-div">
      <button
        onClick={handlePrevPageChange}
        disabled={offset === 0}
        className="prepaidpage-btn-group"
      >
        <span>Previous</span>
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          // onClick={() => handlePageChange(pageNumber)}
          className="prepaid-page-number"
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={handleNextPageChange}
        disabled={offset + 1 >= totalPages}
        className="prepaidpage-btn-group"
      >
        <span>Next</span>
      </button>
    </div>
  );
};

// Prop types validation
Pagination.propTypes = {
  limit: PropTypes.number.isRequired,
  prepaidPlans: PropTypes.array.isRequired,
  offset: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired
};

export default Pagination;
