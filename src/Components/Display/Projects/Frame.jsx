import React from "react";
import Task from "./task";
import { Droppable } from "@hello-pangea/dnd";

export const Frame = ({ tasks, val }) => {
  return (
    <div className="bg-gray-100 w-auto h-auto rounded-md p-4 select-none">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{val}</h3>
        <p className="bg-gray-200 px-2 rounded-md">{tasks.length}</p>
      </div>

      <div>
        <Droppable droppableId={val}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks ? (
                tasks.map((value, index) => (
                  <div key={value.id}>
                    <Task item={value} index={index} />
                  </div>
                ))
              ) : (
                <div className="bg-gray-100 h-0.5 w-full"></div>
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
