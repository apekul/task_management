import React, { useState } from "react";
import Frame from "./Frame";
import { DragDropContext } from "@hello-pangea/dnd";

const sample = [
  {
    title: "Design",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    id: 11,
    follow: [{ name: "AP" }, { name: "MP" }],
    created: "",
    closed: "",
  },
  {
    title: "BlahBlah",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    id: 12,
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
  {
    title: "BlahBlah",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    id: 13,
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
  const [todo, setTodo] = useState(sample);
  const [inProgress, setInProgress] = useState([]);
  const [complete, setComplete] = useState([]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    let add,
      active = todo,
      completed = complete,
      progress = inProgress;

    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "InProgressList") {
      add = progress[source.index];
      progress.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "InProgressList") {
      progress.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }

    setTodo(active);
    setInProgress(progress);
    setComplete(completed);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-blue-200 w-full h-screen px-5 pb-5 overflow-y-auto">
        <h2 className="text-2xl font-extrabold py-5">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 ">
          <div>
            <Frame list={todo} length={todo.length} val="To do" />
          </div>
          <div>
            <Frame
              list={inProgress}
              length={inProgress.length}
              val="In Progress"
            />
          </div>
          <div>
            <Frame list={complete} length={complete.length} val="Completed" />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Projects;
