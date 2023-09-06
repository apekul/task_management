import React, { useState } from "react";
import Task from "./task";
import { IoMdAddCircle } from "react-icons/io";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillDelete,
} from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdEdit } from "react-icons/md";

import { Droppable, Draggable } from "react-beautiful-dnd";

export const Frame = ({ ...props }) => {
  const [show, setShow] = useState();
  const [editTitle, setEditTitle] = useState();
  const [title, setTitle] = useState(props.column.title);

  // Confirm delete
  const [confirmPanel, setConfirmPanel] = useState(false);

  // Add new task to TODO list
  const addTask = () => {
    let flated = Object.values(props.project.tasks).map((v) => v);
    let newID;
    if (flated.length <= 0) {
      newID = "task-1";
    } else {
      newID = `task-${Math.max(...flated.map((v) => +v.id.split("-")[1])) + 1}`;
    }

    let newTask = {
      id: newID,
      title: "New Task",
      content: "New task description",
      subTasks: {
        "subTask-1": { id: "subTask-1", title: "newSubtask", completed: false },
      },
    };

    // Add Task
    props.setProject((prev) => ({
      ...prev,
      tasks: { ...prev.tasks, [newID]: newTask },
      columns: {
        ...prev.columns,
        [props.column.id]: {
          ...prev.columns[props.column.id],
          taskIDs: [...prev.columns[props.column.id].taskIDs, newID],
        },
      },
    }));
    return;
  };

  const deleteColumn = () => {
    let newColumns = props.project.columns;
    let newOrder = props.project.columnOrder.filter(
      (v) => v !== props.column.id
    );
    delete newColumns[props.column.id];
    props.setProject((prev) => ({
      ...prev,
      columnOrder: newOrder,
      columns: newColumns,
    }));
    setShow();
  };

  const updateColumnName = () => {
    props.setProject((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [props.column.id]: { ...prev.columns[props.column.id], title: title },
      },
    }));
    return setEditTitle();
  };
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={`sm:mx-2 mr-2 sm:min-w-[400px] min-w-full flex flex-col rounded relative bg-white border-black ${
            snapshot.isDragging && "border-dashed border-2"
          }`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className="flex items-center justify-between border-black h-12 border p-2 "
            {...provided.dragHandleProps}
          >
            {/* Column title */}
            <div className="flex items-center gap-2 ">
              {editTitle === props.column.id ? (
                <>
                  <input
                    value={title.toUpperCase()}
                    maxLength={16}
                    style={{ width: `${title.length + 5}ch` }}
                    className={`font-bold min-w-[5ch] px-1 border border-black rounded`}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <AiFillCheckCircle
                    onClick={() => updateColumnName()}
                    className="cursor-pointer text-gray-300 hover:text-black"
                  />
                  <AiFillCloseCircle
                    onClick={() => setEditTitle()}
                    className="cursor-pointer text-gray-300 hover:text-black"
                  />
                </>
              ) : (
                <>
                  <h3 className="font-bold px-1 min-w-[4ch]">
                    {title.toUpperCase()}
                  </h3>
                  <MdEdit
                    className="text-gray-400 hover:text-black cursor-pointer"
                    onClick={() => setEditTitle(props.column.id)}
                  />
                </>
              )}
            </div>

            <div className="flex items-center gap-2 ">
              <IoMdAddCircle className="cursor-pointer " onClick={addTask} />
              <p className="bg-gray-200 px-2 rounded-md">
                {props.tasks.length}
              </p>
              <BiDotsVerticalRounded
                className="cursor-pointer"
                onClick={() => {
                  if (show === props.column.id) {
                    return setShow();
                  }
                  return setShow(props.column.id);
                }}
              />
              {show === props.column.id && (
                <div className="bg-white border-b border-r border-l border-black absolute top-12 -right-0 w-52 px-2 py-1 text-start">
                  <button
                    className="flex items-center gap-1 bg-red-200 px-2 w-full rounded hover:bg-red-300 truncate"
                    // onClick={deleteColumn}
                    onClick={() => setConfirmPanel(true)}
                  >
                    <AiFillDelete />
                    <p>Delete {props.column.title.toUpperCase()}</p>
                  </button>
                  {/* Confirm Delete */}
                  {confirmPanel && (
                    <div className="bg-white text-md absolute p-1 top-0 right-0 w-full flex items-center justify-center gap-1">
                      <p className="text-xs">Are you sure?</p>
                      <button
                        className="bg-gray-200 px-1 rounded hover:bg-red-400"
                        onClick={() => {
                          deleteColumn();
                          setConfirmPanel(false);
                          return;
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-gray-200 px-1 rounded hover:bg-gray-300"
                        onClick={() => {
                          setConfirmPanel(false);
                          setShow();
                          return;
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
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
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    column={props.column}
                    setProject={props.setProject}
                    project={props.project}
                  />
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
