import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { Context } from "../../context";
import TaskList from "./Projects/TaskList";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillDelete,
} from "react-icons/ai";

const Display = () => {
  const [data, setData] = useContext(Context);

  const { projectID } = useParams();

  const [project, setProject] = useState(data[projectID]);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [options, setOptions] = useState(false);

  const navigate = useNavigate();

  // Add new task to TODO list
  // const addTask = () => {
  //   // let columnName = "column-1";
  //   let flated = Object.values(project.tasks).map((v) => v);
  //   let newID;
  //   if (flated.length <= 0) {
  //     newID = "task-1";
  //   } else {
  //     newID = `task-${Math.max(...flated.map((v) => +v.id.split("-")[1])) + 1}`;
  //   }

  //   let newTask = {
  //     id: newID,
  //     title: "New Task",
  //     content: "New task description",
  //   };

  //   // Add Task
  //   setProject((prev) => ({
  //     ...prev,
  //     tasks: { ...prev.tasks, [newID]: newTask },
  //     columns: {
  //       ...prev.columns,
  //       "column-1": {
  //         ...prev.columns["column-1"],
  //         taskIDs: [...prev.columns["column-1"].taskIDs, newID],
  //       },
  //     },
  //   }));
  //   return;
  // };

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

  const changeTitle = () => {
    setEditTitle(false);
    return setData((prev) => ({
      ...prev,
      [project.id]: { ...prev[project.id], title: title },
    }));
  };

  const deleteProject = () => {
    let newData = { ...data };
    delete newData[project.id];
    setData(newData);
    return navigate("/");
  };

  useEffect(() => {
    setTitle(data[projectID].title);
    setProject(data[projectID]);
  }, [projectID]);

  useEffect(() => {
    setProject(data[projectID]);
  }, [data]);

  useEffect(() => {
    setData((prev) => ({ ...prev, [project.id]: project }));
  }, [project]);

  return (
    <>
      <div className="border-b-2 p-5 flex items-center justify-between mb-2 w-full">
        <div className="flex items-center gap-2">
          {editTitle ? (
            <>
              <input
                placeholder={title}
                className="font-extrabold text-xl w-auto px-1 truncate"
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
                  setTitle(project.title);
                }}
              />
            </>
          ) : (
            <>
              <h2 className="font-extrabold text-xl truncate max-w-screen-lg">
                {title}
              </h2>
              <MdEdit
                className="cursor-pointer text-gray-400 hover:text-slate-800"
                onClick={() => setEditTitle(true)}
              />
            </>
          )}
        </div>
        <div className="flex items-center gap-4 select-none">
          <button
            className="bg-gray-500 px-2 py-1 rounded text-white hover:bg-gray-700"
            onClick={() => addColumn()}
          >
            Add Column
          </button>

          <div className="relative">
            <BiDotsVerticalRounded
              className="cursor-pointer"
              onClick={() => setOptions(!options)}
            />
            <div
              className={`absolute top-10 -right-5 w-60 bg-white border-2 px-3 py-2 transition-all ${
                !options && "hidden"
              }`}
            >
              <div className="flex flex-col items-start justify-center gap-2">
                <div className="flex w-full items-center justify-between">
                  <span>Settings</span>
                  <AiFillCloseCircle
                    className="cursor-pointer"
                    onClick={() => setOptions(!options)}
                  />
                </div>

                <div className="flex items-center gap-1 w-full p-1 rounded hover:bg-gray-200 cursor-pointer">
                  <AiFillCheckCircle />
                  <p className="truncate w-4/5">Close {project.title}</p>
                </div>
                <div
                  className="flex items-center gap-1 bg-red-200 w-full p-1 rounded hover:bg-red-400 cursor-pointer"
                  onClick={() => deleteProject()}
                >
                  <AiFillDelete className="text-base" />
                  <p className="truncate w-4/5">Delete {project.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TaskList project={project} setProject={setProject} />
    </>
  );
};

export default Display;
