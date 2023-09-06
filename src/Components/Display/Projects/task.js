import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../../../context";
import CheckBox from "./TaskComponents/CheckBox";
import { Draggable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";

// Icons
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillDelete,
} from "react-icons/ai";

const Task = ({ ...props }) => {
  const location = useLocation();
  const textArea = useRef(null);
  const [data, setData] = useContext(Context);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState({
    id: "",
    projectID: location.pathname.split("/")[1],
  });
  const [title, setTitle] = useState(props.task.title);
  const [content, setContent] = useState(props.task.content);

  // Confirm delete
  const [confirmPanel, setConfirmPanel] = useState(false);

  const subTaskStatus = {
    completed: Object.keys(props.task.subTasks)
      .map((v) => props.task.subTasks[v].completed)
      .filter((v) => v).length,
    all: Object.keys(props.task.subTasks).length,
  };

  const updateTask = () => {
    let taskID = props.task.id;
    let projectID = edit.projectID;
    let copy = data;
    copy = {
      ...copy,
      [projectID]: {
        ...copy[projectID],
        tasks: {
          ...copy[projectID].tasks,
          [taskID]: {
            ...copy[projectID].tasks[taskID],
            title: title,
            content: content,
          },
        },
      },
    };
    setEdit((prev) => ({ ...prev, id: "" }));
    setData(copy);
    return;
  };

  // Deleting task func
  const deleteTask = () => {
    let projectID = edit.projectID;
    let taskID = props.task.id;
    let newTasks = data[projectID].tasks;

    let newColumn = props.column;
    let newTaskIDs = newColumn.taskIDs.filter((v) => v !== taskID);

    newColumn = { ...newColumn, taskIDs: newTaskIDs };
    delete newTasks[taskID];

    props.setProject((prev) => ({
      ...prev,
      tasks: newTasks,
      columns: { ...prev.columns, [props.column.id]: newColumn },
    }));
    return;
  };

  // Resize textArea
  const resizeTextArea = () => {
    textArea.current.style.height = "auto";
    textArea.current.style.height = textArea.current.scrollHeight + "px";
  };

  useEffect(() => {
    if (edit.id === props.task.id) {
      resizeTextArea();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit.id, content]);

  useEffect(() => {
    setEdit({ id: "", projectID: location.pathname.split("/")[1] });
  }, [location]);

  return (
    <Draggable
      key={props.task.id}
      draggableId={props.task.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <div
          className={`border-black bg-gray-300 rounded mb-2 ${
            snapshot.isDragging && "bg-gray-50 border-dashed border-2"
          }
          ${subTaskStatus.completed === subTaskStatus.all && "bg-green-300"}
          ${
            subTaskStatus.completed < subTaskStatus.all &&
            subTaskStatus.completed > 0 &&
            "bg-orange-300"
          }
          
          `}
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
                <div className="flex items-center truncate">
                  <p className="mr-1">
                    [{subTaskStatus.completed}/{subTaskStatus.all}]
                  </p>
                  <p>{props.task.id}/</p>

                  {edit.id === props.task.id ? (
                    <input
                      className="min-w-[5ch] h-6 px-1 rounded mr-1 "
                      maxLength={25}
                      style={{ width: `${title.length + 1}ch` }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  ) : (
                    <h3
                      className="font-bold cursor-text truncate"
                      onDoubleClick={() => {
                        setEdit((prev) => ({ ...prev, id: props.task.id }));
                        return setShow(true);
                      }}
                    >
                      {title}
                    </h3>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {edit.id === props.task.id ? (
                    <div className="flex gap-2 cursor-pointer text-lg">
                      <AiFillCheckCircle
                        className="text-gray-400 hover:text-green-500"
                        onClick={() => updateTask()}
                      />
                      <AiFillCloseCircle
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => setEdit((prev) => ({ ...prev, id: "" }))}
                      />
                    </div>
                  ) : (
                    <div>
                      <MdEdit
                        className="cursor-pointer text-gray-400 hover:text-black"
                        onClick={() => {
                          setEdit((prev) => ({ ...prev, id: props.task.id }));
                          return setShow(true);
                        }}
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
              <div className="mx-1">
                {show && (
                  <div className="mt-2">
                    {edit.id === props.task.id ? (
                      <textarea
                        className="w-full px-1 rounded mr-1 bg-white overflow-hidden block h-auto overflow-y-hidden resize-none"
                        value={content}
                        rows={1}
                        onChange={(e) => setContent(e.target.value)}
                        ref={textArea}
                      />
                    ) : (
                      <p
                        className="cursor-text w-full break-all whitespace-pre"
                        onDoubleClick={() =>
                          setEdit((prev) => ({ ...prev, id: props.task.id }))
                        }
                      >
                        {content}
                      </p>
                    )}

                    {/* Check list  */}
                    <div className="my-5">
                      <CheckBox
                        task={props.task}
                        setProject={props.setProject}
                        project={props.project}
                        subTaskStatus={subTaskStatus}
                      />
                    </div>

                    {/* Task buttons */}
                    <div className="flex justify-end py-1 relative">
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => setConfirmPanel(true)}
                      >
                        <AiFillDelete className="text-lg" />
                      </button>

                      {/*  */}
                      {confirmPanel && (
                        <div className=" text-base absolute bottom-0 right-0 flex items-center justify-center gap-1">
                          <p className="text-xs">Are you sure?</p>
                          <button
                            className="bg-gray-200 px-1 rounded hover:bg-red-400"
                            onClick={() => {
                              deleteTask();
                              setConfirmPanel(false);
                              return;
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-gray-200 px-1 rounded hover:bg-gray-300"
                            onClick={() => setConfirmPanel(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      {/*  */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
