import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Text,
  ResponsiveContainer,
} from "recharts";

const CustomXAxisTick = ({ x, y, payload }) => {
  if (payload && payload.value) {
    return (
      <Text
        fontSize={"12px"}
        width={"12px"}
        x={x}
        y={y}
        textAnchor="end"
        verticalAnchor="start"
        angle={-45}
      >
        {payload.value}
      </Text>
    );
  }
  return null;
};

const BarComponent = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        width={500}
        height={350}
        data={chartData}
        margin={{
          top: 20,
          right: 20,
          // left: 20,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-45}
          interval={0}
          tick={<CustomXAxisTick />}
          // textAnchor="end"
        />
        <YAxis />
        <Tooltip width={100} />
        {/* <Legend /> */}
        <Bar dataKey="open" stackId="a" fill="#8884d8" />
        <Bar dataKey="completed" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarComponent;
