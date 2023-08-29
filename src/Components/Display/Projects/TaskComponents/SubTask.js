import React, { useState, useRef, useEffect } from "react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillDelete,
} from "react-icons/ai";
import { MdEdit } from "react-icons/md";

const SubTask = ({ ...props }) => {
  const [title, setTitle] = useState(props.data[props.v].title);
  const textArea = useRef(null);

  const resizeTextArea = () => {
    textArea.current.style.height = "auto";
    textArea.current.style.height = textArea.current.scrollHeight + "px";
  };

  useEffect(() => {
    if (props.edit.subID === props.data[props.v].id) {
      resizeTextArea();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.edit.subID, title]);
  return (
    <div
      className={`flex justify-between px-2 py-1 gap-1 h-full items-center my-1 rounded ${
        props.data[props.v].completed ? "bg-green-500" : "bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-2 w-full h-full">
        <AiFillDelete
          className="text-gray-500 hover:text-red-500 cursor-pointer text-xl"
          onClick={() => props.deleteSubTask(props.v)}
        />
        <MdEdit
          className="text-gray-500 hover:text-black cursor-pointer text-xl"
          onClick={() => props.setEdit((prev) => ({ ...prev, subID: props.v }))}
        />
        {props.edit.subID === props.v ? (
          <div className="flex items-center gap-1 w-full relative">
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={1}
              className="w-full px-1 py-1 pr-11 rounded bg-white overflow-hidden block h-auto overflow-y-hidden resize-none"
              ref={textArea}
            />
            <div className="absolute bottom-1.5 right-1 flex gap-1">
              <AiFillCheckCircle
                className="text-gray-300 hover:text-green-600 cursor-pointer text-lg"
                onClick={(e) => props.updateSubTitle(props.v, title)}
              />
              <AiFillCloseCircle
                className="text-gray-300 hover:text-red-500 cursor-pointer text-lg"
                onClick={() =>
                  props.setEdit((prev) => ({ ...prev, subID: "" }))
                }
              />
            </div>
          </div>
        ) : (
          <p
            className={`cursor-pointer w-full break-words whitespace-pre-line px-1 py-1 rounded`}
          >
            {props.data[props.v].title}
          </p>
        )}
      </div>
      <input
        className="cursor-pointer w-4 h-4 accent-green-600"
        type="checkbox"
        onChange={(e) => props.updateCheck(e, props.v)}
        checked={props.data[props.v].completed}
      />
    </div>
  );
};

export default SubTask;
