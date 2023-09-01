import React, { useState, useEffect } from "react";

import PieComponent from "./PieComponent";
import BarComponent from "./BarComponent";

const test = [
  {
    name: "Page A",
    completed: 4000,
    open: 2400,
  },
  {
    name: "Page B",
    completed: 3000,
    open: 1398,
  },
];

const Chart = ({ data }) => {
  const [chartData, setChartData] = useState(test);

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

  // PieChart data filter

  const filterData = (value) => {
    let newData;
    let sumAll = Object.values(chartData).reduce(
      (acc, curr) => +acc + +curr.all,
      0
    );
    if (value) {
      return sumAll;
    }
    let completed = Object.values(chartData).reduce(
      (acc, curr) => +acc + +curr.completed,
      0
    );
    let open = Object.values(chartData).reduce(
      (acc, curr) => +acc + +curr.open,
      0
    );

    newData = [
      { name: "completed tasks", value: completed },
      { name: "open tasks", value: open },
    ];
    return newData;
  };
  useEffect(() => {
    DataFilter();
  }, [data]);

  return (
    <div className="mx-3 gap-3 h-full grid grid-rows-6 grid-cols-2">
      {/* Simple Stats */}
      <div className="bg-blue-200 text-center w-full h-full col-span-2 flex items-center justify-around">
        <div>
          <p>{Object.keys(chartData).length}</p>
          <p>PROJECTS</p>
        </div>
        <div>
          <p>{filterData(true)}</p>
          <p>TASKS</p>
        </div>
        <div>
          <p>{filterData(false)[0].value}</p>
          <p>COMPLETED TASKS</p>
        </div>
        <div>
          <p>30</p>
          <p>SubTasks</p>
        </div>
      </div>

      {/* Charts */}

      {/*  */}
      <div className="bg-gray-100 rounded-lg w-full h-full row-span-2 col-span-2 p-2">
        <BarComponent chartData={chartData} />
      </div>

      <div className="bg-gray-100 rounded-lg flex items-center justify-center w-full h-full row-span-3">
        <PieComponent filterData={filterData} />
      </div>

      <div className="bg-red-200 w-full h-full row-span-3">D</div>
    </div>
  );
};

export default Chart;
