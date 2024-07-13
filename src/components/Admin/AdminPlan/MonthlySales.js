import React from 'react';
import '../AdminPlan/css/MonthlySales.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
//
const MonthlySales = ({ monthlySales }) => {
  return (
    <div
      className="monthly-sales-cont"
      style={{ display: 'flex', width: '100%' }}
    >
      <h2>Monthly Sales</h2>
      <LineChart
        width={430}
        height={200}
        data={monthlySales}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" domain={[0.5, 'dataMax']} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default MonthlySales;
