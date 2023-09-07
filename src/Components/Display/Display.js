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

const Display = ({ hideNav }) => {
  const [data, setData] = useContext(Context);

  const { projectID } = useParams();

  const [project, setProject] = useState(data[projectID]);
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [options, setOptions] = useState(false);

  // Confirm delete
  const [confirmPanel, setConfirmPanel] = useState(false);

  const navigate = useNavigate();

  const addColumn = () => {
    let maxColID = Math.max(
      ...Object.values(data)
        .map((v, i) =>
          Object.values(v.columns).map((col) => +col.id.split("-")[1])
        )
        .flat()
    );
    let newColID = `column-${maxColID + 1}`;

    let newColumn = {
      id: newColID,
      title: newColID,
      taskIDs: [],
    };

    setProject((prev) => ({
      ...prev,
      columnOrder: [...prev.columnOrder, newColID],
      columns: { ...prev.columns, [newColID]: newColumn },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectID]);

  useEffect(() => {
    setProject(data[projectID]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setData((prev) => ({ ...prev, [project.id]: project }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <>
      <div
        className={`border-b-2 h-16 flex items-center justify-between w-full z-10 lg:fixed bg-white transition-all p-5 lg:p-5 ${
          hideNav ? "lg:pl-24" : "lg:pl-56"
        } `}
      >
        <div className="flex items-center gap-2">
          {editTitle ? (
            <>
              <input
                value={title}
                maxLength={25}
                style={{ width: `${title.length + 1}ch` }}
                className={`font-extrabold text-xl min-w-[5ch] px-1 border border-black rounded`}
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
              <h2 className="font-extrabold text-xl truncate min-w-[2ch] max-w-[150px] sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-4xl">
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
          <div className="relative">
            <BiDotsVerticalRounded
              className="cursor-pointer"
              onClick={() => setOptions(!options)}
            />
            <div
              className={`absolute top-10 -right-5 w-60 bg-white z-10 border-2 px-3 py-2 transition-all ${
                !options && "hidden"
              }`}
            >
              <div className="flex flex-col items-start justify-center gap-2 relative">
                <div className="flex w-full items-center justify-between">
                  <span>Settings</span>
                  <AiFillCloseCircle
                    className="cursor-pointer"
                    onClick={() => setOptions(!options)}
                  />
                </div>
                <div
                  className="flex items-center gap-1 bg-red-200 w-full p-1 rounded hover:bg-red-400 cursor-pointer "
                  // onClick={() => deleteProject()}
                  onClick={() => setConfirmPanel(!confirmPanel)}
                >
                  <AiFillDelete className="text-base" />
                  <p className="truncate w-4/5">Delete {project.title}</p>
                </div>
                {/* Confirm Delete */}
                {confirmPanel && (
                  <div className="bg-white text-md absolute p-1 top-8 right-0 w-full flex items-center justify-center gap-1">
                    <p className="text-xs">Are you sure?</p>
                    <button
                      className="bg-gray-200 px-1 rounded hover:bg-red-400"
                      onClick={() => {
                        deleteProject();
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`transition-all ${hideNav ? "lg:ml-20" : "lg:ml-52"}`}>
        <TaskList
          project={project}
          setProject={setProject}
          addColumn={addColumn}
        />
      </div>
    </>
  );
};

export default Display;
