import React from "react";
import Task from "./task";

import { Droppable, Draggable } from "react-beautiful-dnd";

export const Frame = ({ ...props }) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          className="m-2 w-96 flex flex-col rounded bg-white"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className="flex items-center justify-between border-black border p-2"
            {...provided.dragHandleProps}
          >
            <h3 className="font-bold px-2">
              {props.column.title.toUpperCase()}
            </h3>
            <p className="bg-gray-200 px-2 rounded-md">{props.tasks.length}</p>
          </div>

          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-2 transition-all duration-200 grow min-h-fit ${
                  snapshot.isDraggingOver ? "bg-slate-400" : "bg-gray-100"
                }`}
              >
                {props.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Frame;
