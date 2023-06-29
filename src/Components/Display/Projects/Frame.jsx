import React from "react";
import Task from "./task";
import { Droppable } from "@hello-pangea/dnd";

export const Frame = ({ list, val }) => {
  return (
    <div className="bg-gray-100 w-full h-auto rounded-md p-4 select-none">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{val}</h3>
        <p className="bg-gray-200 px-2 rounded-md">
          {list.length > 0 ? list.length : ""}
        </p>
      </div>
      <button className="w-full py-1 my-2 bg-gray-200 rounded hover:bg-gray-300">
        +
      </button>
      <div>
        <Droppable droppableId={val.split(" ").join("") + "List"}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.length > 0 ? (
                list.map((value, index) => (
                  <div key={value.id}>
                    <Task item={value} index={index} />
                  </div>
                ))
              ) : (
                <div className="bg-gray-100 h-0.5 w-80"></div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Frame;
