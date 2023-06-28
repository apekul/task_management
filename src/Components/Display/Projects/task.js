import React, { useState } from "react";
import { AiFillPushpin } from "react-icons/ai";
// import Draggable, { DraggableCore } from "react-draggable";
import { Draggable } from "@hello-pangea/dnd";

const Task = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-white mt-2 rounded-md p-4 text-base flex flex-col gap-4 cursor-pointer border-2 border-dashed border-white hover:border-black select-none"
        >
          {/* Title/pin button */}
          <div className="flex items-start justify-between ">
            <p className=" font-bold">-{item.title}</p>
            <button>
              <AiFillPushpin />
            </button>
          </div>
          {/* Description */}
          <div className="text-gray-600">{item.description}</div>
          {/* Ppl involved/obserwing */}
          <div className="flex items-center justify-start text-xs text-white w-full h-10 relative">
            {item.follow.slice(0, 6).map((value, index) => (
              <div
                key={index}
                style={{ left: index * 27 }}
                className="bg-red-500 p-2 rounded-full border-2 border-white absolute"
              >
                {value.name}
              </div>
            ))}
            {item.follow.length >= 6 && (
              <p className=" flex items-center justify-center text-black w-5 h-5 absolute right-4 p-3 bg-gray-200 rounded">
                +{item.follow.slice(6.0).length}
              </p>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
