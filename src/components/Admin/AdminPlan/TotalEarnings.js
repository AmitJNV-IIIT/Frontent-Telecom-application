import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import '../AdminPlan/css/TotalEarnings.css';
//

const TotalEarnings = ({ data }) => {
  const COLORS = ['#8884d8', '#36A2EB', '#82ca8d'];

  // Calculate total earnings
  const totalEarnings = data.reduce((acc, item) => acc + item.value, 0);

  // Function to format total earnings
  const formatTotalEarnings = (earnings) => {
    if (earnings >= 1000000) {
      return `${(earnings / 1000000).toFixed(2)}M`;
    } else if (earnings >= 1000) {
      return `${(earnings / 1000).toFixed(1)}K`;
    } else {
      return earnings;
    }
  };

  return (
    <div className="total-earnings-container">
      <h2>Total Earnings</h2>
      <div className="pie-chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              // label={({ name, value }) => `${name}: ₹${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <h3>Total Earnings- ₹ {formatTotalEarnings(totalEarnings)}</h3>
    </div>
  );
};

export default TotalEarnings;
