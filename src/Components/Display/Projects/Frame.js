import React from "react";
import Task from "./task";

const Frame = ({ list, val }) => {
  return (
    <div className="bg-red-100 w-80 rounded-md h-auto p-4 ">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{val}</h3>
        <p className="bg-gray-200 px-2 rounded-md">
          {list.length > 0 ? list.length : ""}
        </p>
      </div>
      <button className="w-full py-1 my-2 bg-gray-200 rounded hover:bg-gray-300">
        +
      </button>
      {list.length > 0 ? (
        list.map((value, index) => (
          <div key={index} className="mb-2">
            <Task item={value} />
          </div>
        ))
      ) : (
        <div className="bg-gray-200 border-dashed border-2 border-gray-300  h-40 flex items-center justify-center"></div>
      )}
    </div>
  );
};

export default Frame;
