import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { Context } from "../../context";
import TaskList from "./Projects/TaskList";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const Display = ({ tasks, setTasks }) => {
  const [projects, setProjects] = useContext(Context);
  const [editTitle, setEditTitle] = useState(false);
  const [newTasks, setNewTasks] = useState(tasks);

  const location = useLocation();
  const state = location.state;

  const [title, setTitle] = useState();

  // Add new task to TODO list
  const addTitle = () => {
    let flated = Object.values(tasks)
      .map((v, i) => v.content)
      .flat();
    let maxID = Math.max(...flated.map((v) => v.id));

    let newTask = {
      title: "New Task",
      description: "",
      id: maxID + 1,
      projectID: state.id,
    };

    return setTasks((prev) => ({
      ...prev,
      todo: { ...prev.todo, content: [...prev.todo.content, newTask] },
    }));
  };

  const changeTitle = () => {
    let index = projects.findIndex((v) => v.id === state.id);
    let newData = [...projects];
    newData[index].title = title;
    setEditTitle(false);
    return setProjects(newData);
  };

  useEffect(() => {
    setTitle(state.title);
  }, [state]);
  return (
    <div className="w-full h-screen">
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
            onClick={() => addTitle()}
          >
            Add New Task
          </button>
          <BiDotsVerticalRounded />
        </div>
      </div>
      <TaskList id={state.id} tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Display;
