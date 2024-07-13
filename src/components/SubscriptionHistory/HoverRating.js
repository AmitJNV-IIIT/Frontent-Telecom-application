import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import './css/HoverRating.css';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HowerRating({ value, onChange }) {
  const [hover, setHover] = React.useState(-1);

  const handleRatingChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <div className="centered-box">
      <Box className="hover-rating-container">
        <Rating
          data-testid="rating"
          name="hover-feedback"
          value={Number(value)}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={handleRatingChange}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={
            <StarIcon
              style={{ opacity: 1, color: 'grey' }}
              fontSize="inherit"
            />
          }
        />
        {value !== null && (
          <Box className="rating-label">
            {labels[hover !== -1 ? hover : value]}
          </Box>
        )}
      </Box>
    </div>
  );
}
