import React from "react";
import Task from "./task";
import { IoMdAddCircle } from "react-icons/io";

import { Droppable, Draggable } from "react-beautiful-dnd";

export const Frame = ({ ...props }) => {
  // Add new task to TODO list
  const addTask = () => {
    // let columnName = "column-1";
    let flated = Object.values(props.project.tasks).map((v) => v);
    let newID;
    if (flated.length <= 0) {
      newID = "task-1";
    } else {
      newID = `task-${Math.max(...flated.map((v) => +v.id.split("-")[1])) + 1}`;
    }

    let newTask = {
      id: newID,
      title: "New Task",
      content: "New task description",
      subTasks: {
        "subTask-1": { id: "subTask-1", title: "newSubtask", completed: false },
      },
    };

    // Add Task
    props.setProject((prev) => ({
      ...prev,
      tasks: { ...prev.tasks, [newID]: newTask },
      columns: {
        ...prev.columns,
        [props.column.id]: {
          ...prev.columns[props.column.id],
          taskIDs: [...prev.columns[props.column.id].taskIDs, newID],
        },
      },
    }));
    return;
  };
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          className="m-2 min-w-[350px] flex flex-col rounded bg-white"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className="flex items-center justify-between border-black border p-2"
            {...provided.dragHandleProps}
          >
            <h3 className="font-bold px-2">
              {props.column.title.toUpperCase()}
            </h3>
            <div className="flex items-center gap-2">
              <IoMdAddCircle className="cursor-pointer " onClick={addTask} />
              <p className="bg-gray-200 px-2 rounded-md">
                {props.tasks.length}
              </p>
            </div>
          </div>

          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-2 transition-all duration-200 grow min-h-fit ${
                  snapshot.isDraggingOver ? "bg-slate-400" : "bg-gray-100"
                }`}
              >
                {props.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    column={props.column}
                    setProject={props.setProject}
                    project={props.project}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Frame;
