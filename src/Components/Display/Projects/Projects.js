import React, { useState } from "react";
import Frame from "./Frame";

const todo = [
  {
    title: "Design",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    id: 1,
    follow: [{ name: "AP" }, { name: "MP" }],
    created: "",
    closed: "",
  },
  {
    title: "BlahBlah",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    id: 1,
    follow: [
      { name: "AP" },
      { name: "MP" },
      { name: "AD" },
      { name: "SA" },
      { name: "WA" },
      { name: "WA" },
      { name: "WA" },
      { name: "WA" },
      { name: "WA" },
      { name: "WA" },
    ],
    created: "",
    closed: "",
  },
];

const Projects = () => {
  const [inProgress, setInProgress] = useState([]);
  const [complete, setComplete] = useState([]);

  return (
    <div className="w-auto h-screen pl-5">
      <h2 className="text-2xl font-extrabold py-5">Projects</h2>
      <div className="grid grid-cols-3 gap-5 ">
        <Frame list={todo} val="To do" />
        <Frame list={inProgress} val="In Progress" />
        <Frame list={complete} val="Completed" />
      </div>
    </div>
  );
};

export default Projects;
