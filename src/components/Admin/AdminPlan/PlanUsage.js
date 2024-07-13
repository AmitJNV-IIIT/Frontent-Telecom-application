import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './css/PlanUsage.css';
import { SlClose } from 'react-icons/sl';
//
const PlanUsage = ({ setPlanUsageView }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const crossClickHandler = () => {
    setPlanUsageView(false);
  };
  useEffect(() => {
    // Dummy plan data - number of users for each month
    const dummyPlanData = [
      { month: 'January', users: 100 },
      { month: 'February', users: 150 },
      { month: 'March', users: 200 },
      { month: 'April', users: 180 },
      { month: 'May', users: 220 },
      { month: 'June', users: 250 }
      // Add more months as needed
    ];

    const labels = dummyPlanData.map((data) => data.month);
    const users = dummyPlanData.map((data) => data.users);

    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Users',
              data: users,
              fill: false,
              borderColor: 'rgba(189, 163, 209, 1)', // Curve color
              borderWidth: 2,
              tension: 0.4 // Adjust the tension for curved lines (0.0 - 1.0)
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Plan Usage', // Heading
              color: 'black'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Users',
                color: 'black'
              },
              grid: {
                color: 'rgba(117, 111, 134, 1)', // Background color of Y-axis data
                borderColor: 'transparent', // Hide y-axis grid lines
                borderWidth: 0 // Hide y-axis grid lines
              }
            },
            x: {
              title: {
                display: true,
                text: 'Months',
                color: 'black'
              },
              grid: {
                color: 'rgba(117, 111, 134, 1)', // Background color of X-axis data
                borderColor: 'transparent', // Hide x-axis grid lines
                borderWidth: 0, // Hide x-axis grid lines
                drawBorder: false,
                tickLength: 0, // Hide x-axis ticks
                borderDash: [5, 5] // Dashed lines for marker lines
              }
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="plan-usage-main-div" data-testid="plan-usage-main-div">
      <div className="plan-usage-graph">
        <div
          className="closeBtn"
          onClick={crossClickHandler}
          data-testid="close-btn"
        >
          <SlClose fill="white" />
        </div>
        <canvas ref={chartRef} width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default PlanUsage;
