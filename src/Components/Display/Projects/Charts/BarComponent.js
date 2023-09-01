import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarComponent = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height="100%"
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          // left: 20,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" />
        <YAxis />
        <Tooltip width={150} />
        {/* <Legend /> */}
        <Bar dataKey="open" stackId="a" fill="#8884d8" />
        <Bar dataKey="completed" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarComponent;
