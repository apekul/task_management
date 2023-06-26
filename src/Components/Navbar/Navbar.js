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
    <div className="h-screen w-16 md:w-52 pl-0 md:pl-8 flex flex-col md:items-start items-center justify-between py-10 border-r-2">
      <div className=" flex flex-col items-center md:items-start md:w-full">
        <h1 className="font-extrabold text-xs md:text-xl ">.logo</h1>
        {/* Navigation */}
        <ul className="flex flex-col pt-10 gap-3 text-gray-700 md:w-full">
          {pattern.map((value, index) => (
            <li
              key={index}
              className=" py-1 hover:border-green-500 hover:border-r-4 cursor-pointer "
            >
              <a href={`/${value.name}`} className="flex items-center gap-2 ">
                <div>{value.icon}</div>
                <p className="hidden md:flex">{value.name}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* User Settings */}
      <ul className="flex flex-col pt-10 gap-3 text-gray-700 md:w-full">
        <li className=" py-1 hover:border-green-500 hover:border-r-4 cursor-pointer">
          <a href="/Settings" className="flex items-center gap-2 ">
            <AiFillSetting />
            <p className="hidden md:flex">Settings</p>
          </a>
        </li>

        <li className=" py-1 hover:border-green-500 hover:border-r-4 cursor-pointer">
          <a href="/" className="flex items-center gap-2 ">
            <BiSolidLogOut />
            <p className="hidden md:flex">Log out</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
