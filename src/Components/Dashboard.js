import React, { useContext } from "react";
import { Context } from "../context";
import Chart from "./Display/Projects/Charts/Chart.js";

const Dashboard = ({ hideNav }) => {
  const [data, setData] = useContext(Context);
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
        className={`text-black w-full h-full transition-all lg:pt-20 ${
          hideNav ? "lg:pl-20" : "lg:pl-52"
        }`}
      >
        {/* Overall Completed/Open */}
        <Chart data={data} />
      </div>
    </>
  );
};

export default Dashboard;
