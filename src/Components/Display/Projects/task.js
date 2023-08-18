import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <Draggable
      key={props.task.id}
      draggableId={props.task.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <div
          className={`border-black border p-2 mb-2 ${
            snapshot.isDragging ? "bg-red-200" : "bg-green-200"
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
