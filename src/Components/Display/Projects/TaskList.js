import React, { useState, useEffect } from "react";
import Frame from "./Frame";
import { DragDropContext } from "@hello-pangea/dnd";
import { MdAddBox } from "react-icons/md";

const TaskList = ({ item }) => {
  const [todo, setTodo] = useState(item.tasks.todos);
  const [inProgress, setInProgress] = useState(item.tasks.inProgress);
  const [complete, setComplete] = useState(item.tasks.completed);

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

  useEffect(() => {
    setTodo(item.tasks.todos);
    setInProgress(item.tasks.inProgress);
    setComplete(item.tasks.completed);
  }, [item]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h2 className="text-2xl font-extrabold py-5">{item.title}</h2>
      <div className="flex items-start gap-2">
        {/* Add Button */}
        <div className="flex items-center justify-center ">
          <div className="text-gray-300 hover:text-gray-400 cursor-pointer">
            <MdAddBox size="50" />
          </div>
        </div>
        {/*  */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-2 ">
          <div>
            <Frame list={todo} val="To do" />
          </div>
          <div>
            <Frame list={inProgress} val="In Progress" />
          </div>
          <div>
            <Frame list={complete} val="Completed" />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskList;
