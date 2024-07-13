import React, { useEffect, useState } from 'react';
import { request } from '../axios/AxiosHelper';
import { BASE_URL } from '../constants/Constants';

//Importing components
import UserPlatformFeedback from '../components/Admin/AdminPlan/UserPlatformFeedback';
import TotalEarnings from '../components/Admin/AdminPlan/TotalEarnings';
import MonthlySales from '../components/Admin/AdminPlan/MonthlySales';
import AdminVisitors from '../components/Admin/AdminPlan/AdminVisitors';

import '../pages/css/AdminDashboard.css';

const AdminDashboard = () => {
  const [visitorsData, setVisitorsData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [totalEarningsData, setTotalEarningsData] = useState([]);
  const [error, setError] = useState(null);

  const url =
    'https://pb2ks9suec.execute-api.us-east-1.amazonaws.com/getAllExcitelReviews';
  const monthOrder = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetching visitors data
        const visitorsResponse = await request(
          'GET',
          `${BASE_URL}/auth/visitor-count`
        );
        setVisitorsData(visitorsResponse.data);

        // Fetching feedback data
        const feedbackResponse = await request('GET', url);

        setFeedbackData(feedbackResponse);

        // Fetching monthly sales data
        const matricesResponse = await request(
          'GET',
          `${BASE_URL}/subscriptions/matrices`
        );
        const monthlySalesDataArray = Object.entries(
          matricesResponse.data.monthly_sales
        )
          .map(([month, value]) => ({ month, value }))
          .sort((a, b) => monthOrder[a.month] - monthOrder[b.month]);
        setMonthlySalesData(monthlySalesDataArray);

        const totalEarningsDataArray = Object.entries(
          matricesResponse.data.total_earning
        ).map(([key, value]) => ({ name: key, value }));
        setTotalEarningsData(totalEarningsDataArray);
      } catch (error) {
        console.error('An error occurred while fetching the data.', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const formatData = (toFormat) => {
    if (toFormat >= 1000000) {
      return `${(toFormat / 1000000).toFixed(2)}M`;
    } else if (toFormat >= 1000) {
      return `${(toFormat / 1000).toFixed(1)}K`;
    } else {
      return toFormat;
    }
  };
  //total visitors
  const totalvistors = visitorsData.reduce(
    (acc, curr) => acc + parseInt(curr.value),
    0
  );

  const totalEarnings = totalEarningsData.reduce(
    (acc, item) => acc + item.value,
    0
  );

  // Extract star ratings from feedbackData
  const starRatings = feedbackData?.map((feedback) =>
    parseInt(feedback.StarRating)
  );

  // Calculate total star ratings
  const totalStarRatings = starRatings?.reduce(
    (total, rating) => total + rating,
    0
  );
  // Calculate average star rating
  const averageStarRating =
    starRatings.length !== 0 ? totalStarRatings / starRatings.length : 0;

  // Initialize variables to store the highest value and its corresponding month
  let highestMonth = '';
  let highestValue = 0;
  // Iterate through the data to find the month with the highest value
  monthlySalesData.forEach((entry) => {
    if (entry.value > highestValue) {
      highestValue = entry.value;
      highestMonth = entry.month;
    }
  });

  const filteredTotalEarningsData = totalEarningsData.filter(
    (entry) => entry.name.charAt(0) === entry.name.charAt(0).toUpperCase()
  );

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="dasboard-conatiner">
      <div className="head-up-section">
        <div className="adminbox">
          <div className="text-summary">Visitors</div>
          <div className="summary-value admin-value0">
            {formatData(totalvistors)}
          </div>
        </div>
        <div className="adminbox">
          <div className="text-summary">Highest Sales for a Month</div>
          <div
            style={{ display: 'flex' }}
            className="summary-value admin-value1"
          >
            {formatData(highestValue) + ' '}
            Plans
            {' (' +
              highestMonth.charAt(0).toUpperCase() +
              highestMonth.slice(1).toLowerCase() +
              ')'}
          </div>
        </div>
        <div className="adminbox">
          <div className="text-summary">Total Earnings</div>
          <div className="summary-value admin-value2">
            ₹ {formatData(totalEarnings)}
          </div>
        </div>
        <div className="adminbox">
          <div className="text-summary">Average Platform Feedback</div>
          <div className="summary-value admin-value3">
            {averageStarRating.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="top-section">
        <div className="section section1">
          <AdminVisitors visitorData={visitorsData.reverse()} />
        </div>
        <div className="section section2">
          <MonthlySales monthlySales={monthlySalesData} />
        </div>
      </div>
      <div className="bottom-section">
        <div className="section section3">
          <TotalEarnings data={filteredTotalEarningsData} />
        </div>
        <div className="section section4">
          {feedbackData.length != 0 && (
            <UserPlatformFeedback feedbackData={feedbackData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
