import React from "react";
import Frame from "./Frame";
import { DragDropContext } from "@hello-pangea/dnd";
// import { AiFillFileAdd } from "react-icons/ai";
// import { Context } from "../../../context";

const TaskList = ({ id, tasks, setTasks }) => {
  // const [projects, setProjects, tasks, setTasks] = useContext(Context);

  // const createID = () => {
  //   if (todo.length === 0) return 1;
  //   let largest = todo.reduce((acc, curr) => (acc.id > curr.id ? acc : curr));
  //   return largest.id + 1;
  // };

  // Drag function
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
      todo = tasks.todo.content,
      done = tasks.done.content,
      doing = tasks.doing.content;

    if (source.droppableId === "todo") {
      add = todo[source.index];
      todo.splice(source.index, 1);
    } else if (source.droppableId === "doing") {
      add = doing[source.index];
      doing.splice(source.index, 1);
    } else {
      add = done[source.index];
      done.splice(source.index, 1);
    }

    if (destination.droppableId === "todo") {
      todo.splice(destination.index, 0, add);
    } else if (destination.droppableId === "doing") {
      doing.splice(destination.index, 0, add);
    } else {
      done.splice(destination.index, 0, add);
    }
    setTasks((prev) => ({
      todo: { ...prev, content: todo },
      doing: { ...prev, content: doing },
      done: { ...prev, content: done },
    }));
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-start gap-2 bg-red-200 px-3">
          {/*  */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 w-full`}
          >
            {Object.keys(tasks).map((v, i) => (
              <div key={i}>
                <Frame
                  tasks={tasks[v].content.filter((v) => v.projectID === id)}
                  val={v}
                />
              </div>
            ))}
            <div className="bg-gray-100 w-auto h-fit rounded-md p-4 select-none flex items-center justify-center">
              + New Column
            </div>
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default TaskList;
