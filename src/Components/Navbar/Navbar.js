import React, { useState, useContext, useEffect, useRef } from "react";
import {
  AiFillFolderOpen,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillFolderAdd,
} from "react-icons/ai";
import { IoStatsChart } from "react-icons/io5";
// import { BsFillArchiveFill } from "react-icons/bs";
import { Context } from "../../context";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { template } from "../../fakeData";

const Navbar = ({ hideNav, setHideNav }) => {
  const [data, setData] = useContext(Context);
  const [toggleTheme, setToggleTheme] = useState(false);
  const [projectList, setProjectList] = useState(false);

  const ref = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const addNewProject = () => {
    let newID;
    if (Object.keys(data).length === 0) {
      newID = "project-1";
    } else {
      newID = `project-${
        Math.max(...Object.keys(data).map((v) => +v.split("-")[1])) + 1
      }`;
    }
    let newProject = { ...template, id: newID, title: newID };

    setData((prev) => ({ ...prev, [newID]: newProject }));
    return navigate(`/${newID}`);
  };

  // Handle clossing projectList sidebar menu when click outside of contener
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setProjectList(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return (
    <>
      <div
        className={`transition-all hidden lg:flex h-screen flex-col items-center justify-between py-5 border-r-2 fixed z-20 bg-white ${
          hideNav ? "w-20" : "w-52"
        }`}
      >
        <div
          className={`flex flex-col gap-10 w-40 ${hideNav && "items-center"}`}
        >
          <h1 className="font-extrabold text-xl">
            <a href="/">.logo</a>
          </h1>
          {/* Navigation */}
          <ul className="flex gap-2 flex-col ">
            {!hideNav ? (
              <>
                <a href="/" className="flex items-center gap-2">
                  <IoStatsChart />
                  Dashboard
                </a>

                <p className="">ALL BOARDS ({Object.keys(data).length})</p>
                <div className="max-h-96 overflow-y-auto">
                  {Object.values(data).map((v, i) => (
                    <Link to={`/${v.id}`} state={v} key={i}>
                      <li
                        id="MenuProjects"
                        className={`cursor-pointer flex items-center gap-2 px-2 py-1 my-1 border border-black hover:bg-gray-300 ${
                          location.pathname.split("/")[1] === v.id
                            ? "bg-green-400"
                            : "bg-white"
                        }`}
                      >
                        <AiFillFolderOpen />
                        <p className="truncate w-4/5">{v.title}</p>
                      </li>
                    </Link>
                  ))}
                </div>
                {/* Create new Board */}
                <li
                  id="MenuProjects"
                  className="cursor-pointer w-full relative"
                >
                  <div
                    className="flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-gray-200"
                    onClick={() => addNewProject()}
                  >
                    <AiFillFolderAdd />
                    <p>Add New Board</p>
                  </div>

                  {/* <div className="flex items-center gap-1 w-full text-base mt-10">
                    <BsFillArchiveFill className="text-base" />
                    <p>Closed Projects</p>
                  </div> */}
                </li>
              </>
            ) : (
              <div className="relative flex items-center flex-col gap-4 text-lg select-none">
                <a href="/">
                  <IoStatsChart />
                </a>
                <div className="border border-black p-2 flex flex-col gap-3">
                  <AiFillFolderOpen
                    onClick={() => setProjectList(!projectList)}
                    className="cursor-pointer"
                  />
                  {projectList && (
                    <div
                      className="absolute top-2 left-10 bg-gray-200  flex flex-col gap-1 text-base w-36 max-h-96 overflow-y-auto rounded"
                      ref={ref}
                    >
                      {Object.values(data).map((v, i) => (
                        <Link
                          to={`/${v.id}`}
                          state={v}
                          key={i}
                          onClick={() => setProjectList(false)}
                        >
                          <li
                            id="MenuProjects"
                            className={`cursor-pointer flex items-center gap-2 px-2 py-1 border border-black hover:bg-gray-300 ${
                              location.pathname.split("/")[1] === v.id
                                ? "bg-green-400"
                                : ""
                            }`}
                          >
                            <AiFillFolderOpen />
                            <p className="truncate w-4/5">{v.title}</p>
                          </li>
                        </Link>
                      ))}
                    </div>
                  )}
                  <div
                    className="cursor-pointer"
                    onClick={() => addNewProject()}
                  >
                    <AiFillFolderAdd />
                  </div>
                </div>

                {/* Archive button */}
                {/* <div>
                  <BsFillArchiveFill className="text-base" />
                </div> */}
              </div>
            )}
          </ul>
        </div>

        {/* Light/Dark panel */}
        <div className="flex flex-col items-center justify-center w-full gap-3">
          {hideNav ? (
            <div
              className="cursor-pointer"
              onClick={() => setToggleTheme(!toggleTheme)}
            >
              {toggleTheme ? <RiSunFill /> : <RiMoonFill />}
            </div>
          ) : (
            <div className="flex gap-1">
              <RiSunFill />
              <div
                className="bg-gray-400 w-8 rounded-full relative cursor-pointer"
                onClick={() => setToggleTheme(!toggleTheme)}
              >
                <div
                  className={`bg-gray-800 w-4 h-full rounded-full absolute top-0 transition-all ${
                    toggleTheme ? "left-0" : "left-4"
                  }`}
                ></div>
              </div>
              <RiMoonFill />
            </div>
          )}

          <div onClick={() => setHideNav(!hideNav)} className="cursor-pointer">
            <div className="flex items-center gap-1">
              {hideNav ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <MobileNavbar
        data={data}
        addNewProject={addNewProject}
        toggleTheme={toggleTheme}
        setToggleTheme={setToggleTheme}
      />
    </>
  );
};

export default Navbar;
