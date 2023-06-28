import React from "react";
import {
  AiFillHome,
  AiFillFolderOpen,
  AiFillCalendar,
  AiFillSetting,
} from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { BiSolidLogOut } from "react-icons/bi";

const pattern = [
  { name: "Overview", icon: <AiFillHome /> },
  { name: "Stats", icon: <IoIosStats /> },
  { name: "Projects", icon: <AiFillFolderOpen /> },
  { name: "Chat", icon: <BsFillChatLeftDotsFill /> },
  { name: "Calendar", icon: <AiFillCalendar /> },
];

const Navbar = () => {
  return (
    <div className="h-screen w-16 xl:w-52  xl:pl-8 flex flex-col xl:items-start items-center justify-between py-10 border-r-2 ">
      <div className=" flex flex-col items-center xl:items-start w-full ">
        <h1 className="font-extrabold text-xs xl:text-xl ">.logo</h1>
        {/* Navigation */}
        <ul className="flex flex-col pt-10 gap-3 text-gray-700 w-full ">
          {pattern.map((value, index) => (
            <li
              key={index}
              className=" hover:border-r-green-500 border-x-4 border-white cursor-pointer w-full"
            >
              <a
                href={`/${value.name}`}
                className="flex items-center gap-2 w-full py-1 justify-center xl:justify-start"
              >
                <div>{value.icon}</div>
                <p className="hidden xl:flex">{value.name}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* User Settings */}
      {/* <ul className="flex flex-col pt-10 gap-3 text-gray-700 xl:w-full"> */}
      <ul className="flex pt-10 flex-col gap-3 text-gray-700 items-center justify-center xl:items-start w-full ">
        <li className="hover:border-r-green-500 border-x-4 border-white cursor-pointer w-full">
          <a
            href="/Settings"
            className="flex items-center gap-2 w-full py-1 justify-center xl:justify-start"
          >
            <AiFillSetting />
            <p className="hidden xl:flex">Settings</p>
          </a>
        </li>

        <li className="hover:border-r-green-500 border-x-4 border-white cursor-pointer w-full">
          <button
            href="/"
            className="flex items-center gap-2 w-full py-1 justify-center xl:justify-start"
          >
            <BiSolidLogOut />
            <p className="hidden xl:flex">Log out</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
