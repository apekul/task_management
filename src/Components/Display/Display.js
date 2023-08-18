import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { Context } from "../../context";
import TaskList from "./Projects/TaskList";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const Display = () => {
  const [data, setData] = useContext(Context);

  const location = useLocation();
  const state = location.state;
  const [project, setProject] = useState(data[state.title]);

  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(state.title);

  // Add new task to TODO list
  const addTask = () => {
    // let columnName = "column-1";
    let flated = Object.values(project.tasks).map((v) => v);
    let newID;
    if (flated.length <= 0) {
      newID = "task-1";
    } else {
      newID = `task-${Math.max(...flated.map((v) => +v.id.split("-")[1])) + 1}`;
    }

    let newTask = {
      id: newID,
      content: "new Task",
    };

    // Add Task
    setProject((prev) => ({
      ...prev,
      tasks: { ...prev.tasks, [newID]: newTask },
      columns: {
        ...prev.columns,
        "column-1": {
          ...prev.columns["column-1"],
          taskIDs: [...prev.columns["column-1"].taskIDs, newID],
        },
      },
    }));
    return;
  };

  const addColumn = () => {
    let newID = `column-${
      Math.max(
        ...Object.values(project.columns).map((v) => +v.id.split("-")[1])
      ) + 1
    }`;
    let newColumn = {
      id: newID,
      title: newID,
      taskIDs: [],
    };
    setProject((prev) => ({
      ...prev,
      columnOrder: [...prev.columnOrder, newID],
      columns: { ...prev.columns, [newID]: newColumn },
    }));
    return;
  };
  console.log(project);

  const changeTitle = () => {
    setEditTitle(false);
    return setData((prev) => ({
      ...prev,
      [project.id]: { ...prev[project.id], title: title },
    }));
  };
  useEffect(() => {
    setTitle(data[state.id].title);
    setProject(data[state.id]);
  }, [state]);

  useEffect(() => {
    setData((prev) => ({ ...prev, [project.id]: project }));
  }, [project]);

  return (
    <div className="h-screen w-full">
      <div className="border-b-2 p-5 w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {editTitle ? (
            <>
              <input
                placeholder={title}
                className="font-extrabold text-xl w-32 px-1"
                onChange={(e) => setTitle(e.target.value)}
              />
              <AiFillCheckCircle
                className="cursor-pointer text-gray-400 hover:text-slate-800"
                onClick={() => changeTitle()}
              />
              <AiFillCloseCircle
                className="cursor-pointer text-gray-400 hover:text-slate-800"
                onClick={() => {
                  setEditTitle(false);
                  setTitle(state.title);
                }}
              />
            </>
          ) : (
            <>
              <h2 className="font-extrabold text-xl ">{title}</h2>
              <MdEdit
                className="cursor-pointer text-gray-400 hover:text-slate-800"
                onClick={() => setEditTitle(true)}
              />
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-gray-500 px-2 py-1 rounded text-white hover:bg-gray-700"
            onClick={() => addTask()}
          >
            Add Task
          </button>
          <button
            className="bg-gray-500 px-2 py-1 rounded text-white hover:bg-gray-700"
            onClick={() => addColumn()}
          >
            Add Column
          </button>
          <BiDotsVerticalRounded />
        </div>
      </div>
      <TaskList project={project} setProject={setProject} />
    </div>
  );
};

export default Display;
