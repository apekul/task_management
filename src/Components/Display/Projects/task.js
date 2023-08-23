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
          className={`border-black rounded p-2 mb-2 ${
            snapshot.isDragging
              ? "bg-gray-200 border-dashed border-2"
              : "bg-gray-300"
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className="flex items-center justify-between"
            onClick={() => setShow(!show)}
          >
            <h3 className="font-bold">{props.task.title}</h3>
            <p>id:{props.task.id}</p>
          </div>

          {show && <p>{props.task.content}</p>}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
