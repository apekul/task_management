export const initialData = {
  "project-1": {
    id: "project-1",
    title: "project-1",
    tasks: {
      "task-1": {
        id: "task-1",
        content: "Take out garbage",
      },
      "task-2": {
        id: "task-2",
        content: "Watch TV",
      },
      "task-3": {
        id: "task-3",
        content: "Charge phone",
      },
      "task-4": {
        id: "task-4",
        content: "Cook dinner",
      },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "todo",
        taskIDs: ["task-1", "task-2", "task-3", "task-4"],
      },
      "column-2": {
        id: "column-2",
        title: "doing",
        taskIDs: [],
      },
      "column-3": {
        id: "column-3",
        title: "done",
        taskIDs: [],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  },
};

export const template = {
  id: "",
  title: "",
  description: "",
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "todo",
      taskIDs: [],
    },
    "column-2": {
      id: "column-2",
      title: "doing",
      taskIDs: [],
    },
    "column-3": {
      id: "column-3",
      title: "done",
      taskIDs: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};
