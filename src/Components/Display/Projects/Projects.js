import React, { useState, useContext } from "react";
import TaskList from "./TaskList";
import { Context } from "../../../context";
import { emptyProject } from "../../../assets/data";
import { MdAddBox } from "react-icons/md";
import { BiSolidTime } from "react-icons/bi";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

const Projects = () => {
  const [projects, setProjects] = useContext(Context);

  const [currentProject, setCurrentProject] = useState();
  // const [hoverInfo, setHoverInfo] = useState(null);

  const updateCurrentProject = (item) => {
    setCurrentProject(item);
  };

  const addProject = () => {
    let newProject = {
      ...emptyProject,
      id: projects.length + 1,
      title: `new Project(${projects.length + 1})`,
    };
    setProjects((prev) => [...prev, newProject]);
  };
  return (
    <div className="w-full h-screen px-5 pb-5 overflow-y-auto bg-gray-50 pt-10">
      <h2 className="text-2xl font-extrabold pb-2">Projects:</h2>

      <div className="grid grid-flow-col auto-cols-max gap-2">
        <div className="flex items-start justify-center ">
          <div
            className="text-gray-300 hover:text-gray-400 cursor-pointer"
            onClick={addProject}
          >
            <MdAddBox size="50" />
          </div>
        </div>

        {projects.map((item, index) => (
          <div
            key={index}
            onClick={() => updateCurrentProject(item)}
            className={`w-52 h-32 rounded-md bg-gray-200 p-2 border-2 hover:border-black flex flex-col justify-between 
             ${
               currentProject && currentProject.id === item.id
                 ? "border-black"
                 : "border-gray-50"
             }`}
          >
            <p>{item.title}</p>
            <div className="flex  items-center justify-end gap-2">
              <div className="flex items-center justify-center ">
                <AiFillExclamationCircle className="text-gray-600 text-xl" />
                <span className="">{item.tasks.todos.length}</span>
              </div>
              <div className="flex items-center justify-center ">
                <BiSolidTime className="text-yellow-600 text-xl" />
                <span className="">{item.tasks.inProgress.length}</span>
              </div>
              <div className="flex items-center justify-center ">
                <AiFillCheckCircle className="text-green-500 text-xl" />
                <span className="">{item.tasks.completed.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* items */}
      <TaskList item={currentProject} />
    </div>
  );
};

export default Projects;
