import React, { useState, useEffect } from "react";

import PieComponent from "./PieComponent";
import BarComponent from "./BarComponent";
import MobileBarComponent from "./MobileBarComponent";

import { IoStatsChartSharp } from "react-icons/io5";

const Chart = ({ chartData }) => {
  const [taskStats, setTaskStats] = useState();

  // return all tasks, completed tasks, open tasks value
  const getStats = () => {
    let newData;
    const data = Object.values(chartData);
    const sumAll = data.reduce((acc, curr) => +acc + +curr.all, 0);

    const completed = data.reduce((acc, curr) => +acc + +curr.completed, 0);
    const open = data.reduce((acc, curr) => +acc + +curr.open, 0);
    const subTasks = data.reduce((acc, curr) => acc + curr.SubTasks, 0);

    newData = {
      all: { name: "tasks", value: sumAll },
      completed: { name: "completed tasks", value: completed },
      open: { name: "open tasks", value: open },
      subTasks: { name: "subTasks", value: subTasks },
    };
    return setTaskStats(newData);
  };

  useEffect(() => {
    getStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  return (
    <div className="mx-3 gap-3 h-full lg:grid lg:grid-rows-6 lg:grid-cols-2 flex flex-col">
      <>
        {/* Simple Stats */}
        {taskStats && (
          <>
            <div className="bg-white w-full h-full flex flex-col md:flex-row gap-2 row-span-3 p-2">
              <div className="bg-gray-100 md:w-2/3 w-full p-2 lg:p-0 h-full rounded flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <p className="text-4xl">{chartData.length}</p>
                  <p>PROJECTS</p>
                </div>
                <IoStatsChartSharp className="text-6xl" />
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.values(taskStats).map((v, i) => (
                  <div
                    key={i}
                    className={`bg-gray-100 w-full h-auto rounded flex flex-col items-center justify-center `}
                  >
                    <p>{v.value}</p>
                    <p>{v.name.toUpperCase()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="bg-white rounded-lg flex items-center justify-center w-full h-full row-span-3">
              {taskStats ? (
                <PieComponent
                  getStats={[taskStats.completed, taskStats.open]}
                />
              ) : (
                <div>No Data to display.</div>
              )}
            </div>
            <div className="hidden bg-white w-full h-full rounded-lg  row-span-3 col-span-2 lg:flex items-center justify-center">
              {chartData.length > 0 ? (
                <BarComponent chartData={chartData} />
              ) : (
                <div>No Data to display.</div>
              )}
            </div>
            <div className="bg-white w-full h-full rounded-lg  row-span-3 col-span-2 flex lg:hidden items-center justify-center">
              {chartData.length > 0 ? (
                <MobileBarComponent chartData={chartData} />
              ) : (
                <div>No Data to display.</div>
              )}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Chart;
