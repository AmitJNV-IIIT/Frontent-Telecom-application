/*eslint-disable*/
import React, { useState } from 'react';
import Feedback from './FeedbackAdmin';
import feed from '../../../data/feedback-data.json';
import { Container, Box, Typography, Dialog } from '@mui/material';
import Rating from '@mui/material/Rating';
//
const AllFeedbacks = ({
  open,
  handleClose,
  planFeedbacks,
  setCurrentPlanRating,
  currPlanRating
}) => {
  const handleRating = (newValue) => {
    setCurrentPlanRating(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          overflowY: 'hidden'
        }}
      >
        <Box maxWidth="md">
          <Typography variant="h4" sx={{ textAlign: 'center', padding: '5%' }}>
            All Feedbacks
          </Typography>
        </Box>
        <Box>
          <div>
            <Typography component="legend">Rating Filter</Typography>
            <Rating
              name="simple-controlled"
              value={currPlanRating}
              onChange={(event, newValue) => {
                handleRating(newValue);
                // setValue(newValue);
              }}
            />
          </div>
        </Box>
        {planFeedbacks.length > 0 ? (
          <Box
            sx={{
              overflowY: 'scroll',
              height: '420px',
              width: '400px',
              overflowX: 'hidden',
              overflowY: 'scroll'
            }}
          >
            {planFeedbacks.map((feedback, index) => (
              <Feedback
                key={index}
                name={feedback.name}
                description={feedback.description}
                rating={feedback.starRating}
              />
            ))}
          </Box>
        ) : (
          <Box sx={{ height: '420px', width: '400px' }}>
            <Typography>No Feedback for {currPlanRating} Rating </Typography>
          </Box>
        )}
      </Container>
    </Dialog>
  );
};

export default AllFeedbacks;
