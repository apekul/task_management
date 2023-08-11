import React, { useState, useContext } from "react";
import TaskList from "./TaskList";
import { Context } from "../../../context";
import { MdAddBox } from "react-icons/md";
import { BiSolidTime } from "react-icons/bi";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

const emptyProject = {
  title: "New Project",
  id: 0,
};

const Projects = () => {
  const [projects, setProjects] = useContext(Context);
  const [currentProject, setCurrentProject] = useState();
  const [showMore, setShowMore] = useState(false);

  const updateCurrentProject = (item) => {
    setCurrentProject(item);
  };

  const createID = () => {
    if (projects.length === 0) return 1;
    let largest = projects.reduce((acc, curr) =>
      acc.id > curr.id ? acc : curr
    );
    return largest.id + 1;
  };

  const addProject = () => {
    let newProject = {
      ...emptyProject,
      id: createID(),
      title: `new Project(${projects.length + 1})`,
    };
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <div className="w-full h-screen px-5 pb-5 overflow-y-auto bg-gray-50 pt-10">
      <h2 className="text-2xl font-extrabold pb-2 select-none">Projects:</h2>

      {/* Project Menu */}
      <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-1">
        <div className="flex items-start sm:items-center flex-col sm:flex-row">
          <div
            className="text-gray-400 hover:text-gray-500 cursor-pointer w-fit"
            onClick={addProject}
          >
            <MdAddBox size="50" />
          </div>
          <input
            className="rounded border-2 border-black px-2 h-10"
            placeholder="Search Project name/id"
          />
        </div>
        {projects.length > 10 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-gray-200 p-2 rounded-md w-16 hover:bg-gray-300"
          >
            {showMore ? "Less" : "More"}
          </button>
        )}
      </div>

      {/* ProjectList */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 2xl:grid-cols-10 gap-2 overflow-y-auto select-none h-32  ${
          showMore && "h-fit"
        }`}
      >
        {projects.map((item, index) => (
          <div
            key={index}
            onClick={() => updateCurrentProject(item)}
            className={`h-32 rounded-md bg-gray-200 p-2 border-2 hover:border-black flex flex-col justify-between cursor-pointer 
             ${
               currentProject && currentProject.id === item.id
                 ? "border-black"
                 : "border-gray-50"
             }`}
          >
            <div className="flex flex-col">
              <p>{item.title}</p>
              <p>id:{item.id}</p>
            </div>
            <div className="flex  items-center justify-end gap-2">
              <div className="flex items-center justify-center ">
                <AiFillExclamationCircle className="text-gray-600 text-xl" />
                <span className="">0</span>
              </div>
              <div className="flex items-center justify-center ">
                <BiSolidTime className="text-yellow-600 text-xl" />
                <span className="">0</span>
              </div>
              <div className="flex items-center justify-center ">
                <AiFillCheckCircle className="text-green-500 text-xl" />
                <span className="">0</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* items */}
      {/* <TaskList item={currentProject} /> */}
    </div>
  );
};

export default Projects;
