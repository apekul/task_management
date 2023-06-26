import React from "react";
import Pattern from "./pattern";

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
  return (
    <div className="w-full h-screen pl-5 overflow-auto">
      <h2 className="text-2xl font-extrabold py-5">Projects</h2>
      {/* Item1 */}
      <div className="bg-gray-100 w-72 rounded-xl h-auto p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">To do</h3>
          <p className="bg-gray-200 px-2 rounded-md">{todo.length}</p>
        </div>
        <button className="w-full py-1 bg-gray-200 rounded hover:bg-gray-300">
          +
        </button>
        {todo.length > 0
          ? todo.map((value, index) => (
              <div key={index} className="">
                <Pattern item={value} />
              </div>
            ))
          : "no items"}
      </div>
    </div>
  );
};

export default Projects;
