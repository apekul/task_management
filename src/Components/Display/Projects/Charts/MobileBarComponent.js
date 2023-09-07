import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Text,
  Brush,
  ResponsiveContainer,
} from "recharts";

const CustomXAxisTick = ({ x, y, payload }) => {
  if (payload && payload.value) {
    return (
      <Text
        fontSize={10}
        width={10}
        x={x}
        y={y}
        textAnchor="middle"
        verticalAnchor="start"
        // scaleToFit={true}
        // minTickGap={-200}
        // angle={-45}
      >
        {payload.value}
      </Text>
    );
  }
  return null;
};

const MobileBarComponent = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        width={500}
        height={400}
        data={chartData}
        margin={{
          top: 20,
          right: 40,
          // left: 20,
          bottom: 40,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          interval="preserveStart"
          tick={<CustomXAxisTick />}
        />
        <YAxis />
        <Tooltip width={100} />
        <Brush
          dataKey="name"
          height={20}
          stroke="#8884d8"
          y={300}
          endIndex={3}
        />
        <Bar dataKey="open" stackId="a" fill="#8884d8" />
        <Bar dataKey="completed" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MobileBarComponent;
