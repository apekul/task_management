import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillFolderOpen,
  AiFillCaretDown,
  AiFillCaretUp,
} from "react-icons/ai";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

const MobileNavbar = ({ data, addNewProject, toggleTheme, setToggleTheme }) => {
  const [showBoard, setShowBoard] = useState(false);
  return (
    <div className="lg:hidden flex w-full px-2 sm:px-5 items-center justify-between border-b py-3 text-xs sm:text-base fixed bg-white">
      <div className="flex gap-5">
        <h1 className="font-extrabold text-lg sm:text-xl">
          <a href="/">.logo</a>
        </h1>

        {/* Navigation */}
        <ul className="flex items-center justify-center gap-3 relative">
          <div
            className="flex items-center justify-center gap-1"
            onClick={() => setShowBoard(!showBoard)}
          >
            <p>ALL BOARDS ({Object.keys(data).length})</p>
            {showBoard ? <AiFillCaretUp /> : <AiFillCaretDown />}
          </div>
          <div
            className={`absolute top-8 bg-gray-200 w-40 rounded transition-all ease-in-out duration-100 ${
              showBoard ? "translate-y-0 visible" : "-translate-y-1 invisible"
            }`}
          >
            {Object.values(data).map((v, i) => (
              <li className="cursor-pointer px-3" key={i}>
                <div className={``}>
                  <Link
                    to={`/${v.title}`}
                    state={v}
                    className="flex items-center gap-2 w-full py-1 justify-start"
                    onClick={() => setShowBoard(false)}
                  >
                    <AiFillFolderOpen />
                    <div className="flex items-center justify-between w-full pr-2">
                      <p className="flex">{v.title}</p>
                    </div>
                  </Link>
                </div>
              </li>
            ))}

            {/* Create new Board */}
            <li
              id="MenuProjects"
              className="cursor-pointer bg-zinc-500 text-zinc-100 px-3"
            >
              <div onClick={() => addNewProject()}>
                <p>+ Add New Board</p>
              </div>
            </li>
          </div>
        </ul>
      </div>

      {/* Light/Dark panel */}
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
    </div>
  );
};

export default MobileNavbar;
