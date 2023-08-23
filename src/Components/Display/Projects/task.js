import React, { useState, useContext, useEffect } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";
import { MdEdit } from "react-icons/md";
import { Context } from "../../../context";
import { useLocation } from "react-router-dom";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillDelete,
} from "react-icons/ai";

const Task = ({ ...props }) => {
  const location = useLocation();
  const [data, setData] = useContext(Context);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState({
    id: "",
    projectID: location.pathname.split("/")[1],
  });
  const [title, setTitle] = useState(props.task.title);

  const updateTitle = () => {
    let taskID = props.task.id;
    let projectID = edit.projectID;
    let copy = data;
    copy = {
      ...copy,
      [projectID]: {
        ...copy[projectID],
        tasks: {
          ...copy[projectID].tasks,
          [taskID]: { ...copy[projectID].tasks[taskID], title: title },
        },
      },
    };
    setData(copy);
    setEdit((prev) => ({ ...prev, id: "" }));
    return;
  };

  // console.log(location.pathname.split("/")[1]);
  useEffect(() => {
    setEdit({ id: "", projectID: location.pathname.split("/")[1] });
  }, [location]);

  console.log(title);
  return (
    <Draggable
      key={props.task.id}
      draggableId={props.task.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <div
          className={`border-black rounded mb-2 ${
            snapshot.isDragging
              ? "bg-gray-200 border-dashed border-2"
              : "bg-gray-300"
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex items-center justify-between">
            <div
              className="flex flex-col w-full p-2"
              // onClick={() => setShow(!show)}e
            >
              <div className="flex justify-between items-center">
                <div className="flex">
                  {edit.id === props.task.id ? (
                    <input
                      className="w-20 h-6 px-1"
                      placeholder={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  ) : (
                    <h3 className="font-bold">{props.task.title}</h3>
                  )}
                  <p>/{props.task.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  {edit.id === props.task.id ? (
                    <div className="flex gap-2 cursor-pointer ">
                      <AiFillCheckCircle
                        className="text-gray-400 hover:text-black"
                        onClick={() => updateTitle()}
                      />
                      <AiFillCloseCircle
                        className="text-gray-400 hover:text-black"
                        onClick={() => setEdit((prev) => ({ ...prev, id: "" }))}
                      />
                    </div>
                  ) : (
                    <div>
                      <MdEdit
                        className="cursor-pointer text-gray-400 hover:text-black"
                        onClick={() =>
                          setEdit((prev) => ({ ...prev, id: props.task.id }))
                        }
                      />
                    </div>
                  )}
                  <div
                    className="cursor-pointer"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <AiFillCaretUp /> : <AiFillCaretDown />}
                  </div>
                </div>
              </div>
              <div className="ml-1">{show && <p>{props.task.content}</p>}</div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
