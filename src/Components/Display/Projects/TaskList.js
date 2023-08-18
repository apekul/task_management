import React from "react";
import Frame from "./Frame";
// import { Context } from "../../../context";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const TaskList = ({ project, setProject }) => {
  // const [data, setData] = useContext(Context);
  // Drag function
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(project.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newData = {
        ...project,
        columnOrder: newColumnOrder,
      };
      setProject(newData);
      return;
    }

    const start = project.columns[source.droppableId];
    const finish = project.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIDs = Array.from(start.taskIDs);
      newTaskIDs.splice(source.index, 1);
      newTaskIDs.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIDs: newTaskIDs,
      };

      const newData = {
        ...project,
        columns: {
          ...project.columns,
          [newColumn.id]: newColumn,
        },
      };

      setProject(newData);
      return;
    }

    // Moving from one list to another
    const startTaskIDs = Array.from(start.taskIDs);
    startTaskIDs.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIDs: startTaskIDs,
    };

    const finishTaskIDs = Array.from(finish.taskIDs);
    finishTaskIDs.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIDs: finishTaskIDs,
    };

    const newData = {
      ...project,
      columns: {
        ...project.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setProject(newData);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="select-none flex flex-wrap"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {project.columnOrder.map((columnID, index) => {
                let column = project.columns[columnID];
                let tasks = column.taskIDs.map(
                  (taskId) => project.tasks[taskId]
                );
                return (
                  <Frame
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TaskList;
