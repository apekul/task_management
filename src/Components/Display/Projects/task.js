import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ item, index }) => {
  const [show, setShow] = useState(false);
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-white mt-2 w-full rounded-md p-4 text-base flex flex-col cursor-pointer border-2 border-dashed border-white hover:border-black select-none"
        >
          {/* Title/pin button */}
          <div className="flex items-start justify-between">
            <p className=" font-bold">
              {item.title} [id:{item.id}]
            </p>
            <button className="text-2xl " onClick={() => setShow(!show)}>
              {show ? <AiFillCaretUp /> : <AiFillCaretDown />}
            </button>
          </div>
          {/* Description */}
          {show && <div className="text-gray-600">{item.description}</div>}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
