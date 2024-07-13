import React from 'react';
import './css/Feedback.css';
//
const CategoryButton = ({ category, isSelected, onClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    // event.stopPropagation();
    onClick(category);
  };

  return (
    <button
      type="button" // Ensures this button doesn't submit a form unintentionally
      className={isSelected ? 'button-selected' : 'button-category-feed'}
      onClick={handleClick} // Use the internal handleClick to manage the event
    >
      {category}
    </button>
  );
};

export default CategoryButton;
