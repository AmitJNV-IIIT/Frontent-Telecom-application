import React, { useState, lazy, Suspense } from 'react';
import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
const AllFeedbacks = lazy(() => import('./AllFeedbacks'));
import './css/PlanRating.css'; // Import the CSS file
import Spinner from '../../Common/Spinner/Spinner';

const PlanRating = ({
  planFeedbacks,
  setCurrentPlanRating,
  avgRating,
  currPlanRating
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // **Corrected handleClick function:**
  const handleClick = () => {
    handleOpen(); // Call handleOpen to open the AllFeedbacks component
    setCurrentPlanRating(5);
  };

  return (
    <div
      className="plan-rating"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div className="plan-rating-container">
        <div style={{ marginLeft: '33%' }}>
          <div className="text-avg-rating-admin">Average Rating</div>
          <h1 className="text-rating-admin floating">
            {avgRating == -1 || isNaN(avgRating) ? (
              <p className="rating-msg">
                Click on plan to find out what people think about the plan
              </p>
            ) : (
              avgRating
            )}
          </h1>
          <Rating
            name="simple-controlled"
            value={avgRating}
            precision={0.1}
            style={{ marginTop: '-70%' }}
          />
        </div>
        <div
          className="recent-feedbacks"
          style={{ display: 'flex', justifyContent: 'space-around' }}
        ></div>
        <div className="recent-feedbacks">
          <button className="view-all-button" onClick={handleClick}>
            View All Feedbacks
          </button>
        </div>
        {open && (
          <Suspense fallback={<Spinner />}>
            <AllFeedbacks
              open={open}
              planFeedbacks={planFeedbacks}
              handleClose={handleClose}
              onClick={handleClick}
              setCurrentPlanRating={setCurrentPlanRating}
              currPlanRating={currPlanRating}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default PlanRating;
