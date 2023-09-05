import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import ChartGroup from "./Display/Projects/Charts/ChartGroup";

const Dashboard = ({ hideNav }) => {
  const [data, setData] = useContext(Context);
  const [chartData, setChartData] = useState();

  // filter Projects to get minimalized data
  const DataFilter = () => {
    let newData = [];
    for (let e of Object.values(data)) {
      let flated = Object.values(e.tasks);
      let tasks = 0,
        subTasks = 0,
        open = 0,
        completed = 0;

      if (flated.length > 0) {
        tasks = flated.length;
        subTasks = flated
          .map((v) => Object.values(v.subTasks).length)
          .reduce((acc, curr) => acc + curr);

        open = flated
          .map((v) =>
            Object.values(v.subTasks)
              .map((a) => a.completed)
              .every(Boolean)
          )
          .filter((x) => x !== true).length;

        completed = flated
          .map((v) =>
            Object.values(v.subTasks)
              .map((a) => a.completed)
              .every(Boolean)
          )
          .filter(Boolean).length;
      }

      newData.push({
        name: e.title,
        completed: completed,
        open: open,
        all: tasks,
        SubTasks: subTasks,
      });
    }
    return setChartData(newData);
  };

  useEffect(() => {
    DataFilter();
  }, [data]);

  return (
    <>
      <div
        className={`border-b-2 flex items-center justify-between w-full lg:fixed bg-white transition-all p-5 pt-20 lg:p-5 ${
          hideNav ? "lg:pl-24" : "lg:pl-56"
        } `}
      >
        <h1>Dashboard</h1>
      </div>
      <div
        className={`text-black bg-gray-100 w-full h-full transition-all lg:pt-20 pb-5 ${
          hideNav ? "lg:pl-20" : "lg:pl-52"
        }`}
      >
        {chartData && <ChartGroup chartData={chartData} />}
      </div>
    </>
  );
};

export default Dashboard;
