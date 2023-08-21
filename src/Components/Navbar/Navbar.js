import React, { useState, useContext } from "react";
import {
  AiFillFolderOpen,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { Context } from "../../context";
import { Link } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { template } from "../../fakeData";

const Navbar = () => {
  const [data, setData] = useContext(Context);
  const [toggleTheme, setToggleTheme] = useState(false);
  const [hideNav, setHideNav] = useState(false);

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
    return;
  };
  return (
    <>
      <div className="hidden lg:flex h-screen w-52 flex-col items-center justify-between py-10 border-r-2 fixed">
        <div className="flex flex-col gap-10">
          <h1 className="font-extrabold text-xl">
            <a href="/">.logo</a>
          </h1>
          {/* Navigation */}
          <ul className="flex gap-2 flex-col">
            <p className="">
              ALL BOARDS ({data ? Object.keys(data).length : 0})
            </p>
            {Object.values(data).map((v, i) => (
              <li id="MenuProjects" className="cursor-pointer relative" key={i}>
                <Link
                  to={`/${v.title}`}
                  state={v}
                  className="flex items-center gap-2"
                >
                  <div>
                    <AiFillFolderOpen />
                  </div>
                  <div className="flex items-center justify-between w-full ">
                    <p className="flex">{v.title}</p>
                  </div>
                </Link>
              </li>
            ))}
            {/* Create new Board */}
            <li id="MenuProjects" className="cursor-pointer w-full relative">
              <div
                className="flex items-center justify-between w-full"
                onClick={() => addNewProject()}
              >
                <p className="flex">+ Add New Board</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Light/Dark panel */}
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <div className="flex gap-1">
            <RiSunFill />
            <div
              className="bg-gray-400 w-8 rounded-full relative"
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
          <div onClick={() => setHideNav(!hideNav)}>
            {hideNav ? (
              <div className="flex items-center gap-1">
                <AiFillEyeInvisible />
                <p>Hide sidebar</p>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <AiFillEye />
                <p>Show sidebar</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      {/* <MobileNavbar
        projects={data.projects}
        addNewProject={addNewProject}
        toggleTheme={toggleTheme}
        setToggleTheme={setToggleTheme}
      /> */}
    </>
  );
};

export default Navbar;
