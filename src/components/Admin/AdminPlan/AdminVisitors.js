import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import '../AdminPlan/css/AdminVisitors.css';
//
const AdminVisitors = ({ visitorData }) => {
  return (
    <div className="admin-visitors-container">
      <div>
        <h2>Visitors</h2>
      </div>

      <div className="visitors-line-chart-container">
        <LineChart
          width={400}
          height={180}
          data={visitorData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default AdminVisitors;
