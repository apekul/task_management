import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillDelete,
} from "react-icons/ai";
import { MdEdit } from "react-icons/md";
// import { subTaskPattern } from "../../../../fakeData";

const CheckBox = ({ ...props }) => {
  const [data, setData] = useState(props.task.subTasks);

  const addSubTask = () => {
    let id = props.task.id;
    let flated = Object.values(data).map((v) => v.id.split("-")[1]);
    let newID;
    if (flated.length <= 0) {
      newID = "subTask-1";
    } else {
      newID = `subTask-${Math.max(...flated) + 1}`;
    }
    let newSubTask = { id: newID, title: "newSubtask", completed: false };
    props.setProject((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [id]: {
          ...prev.tasks[id],
          subTasks: { ...prev.tasks[id].subTasks, [newID]: newSubTask },
        },
      },
    }));
    return;
  };

  const updateCheck = (e, v) => {
    let { checked } = e.target;
    let id = props.task.id;
    let subID = data[v].id;
    props.setProject((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [id]: {
          ...prev.tasks[id],
          subTasks: {
            ...prev.tasks[id].subTasks,
            [subID]: { ...prev.tasks[id].subTasks[subID], completed: checked },
          },
        },
      },
    }));
    return;
  };

  // delete subTask
  const deleteSubTask = (v) => {
    let id = props.task.id;
    let subID = data[v].id;
    let newSubTasks = props.project.tasks[id].subTasks;
    delete newSubTasks[subID];
    props.setProject((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [id]: { ...prev.tasks[id], subTasks: newSubTasks },
      },
    }));
    return;
  };
  useEffect(() => {
    setData(props.task.subTasks);
  }, [props.project]);

  return (
    <>
      <div className="flex justify-between items-center">
        <p>
          Completed [{props.subTaskStatus.completed}/{props.subTaskStatus.all}]
        </p>
        <div className="text-lg cursor-pointer text-gray-400 hover:text-black">
          <IoMdAddCircle onClick={addSubTask} />
        </div>
      </div>
      <div className="rounded flex flex-col">
        {Object.keys(data).map((v, i) => (
          <div
            key={data[v].id}
            className={`flex justify-between px-2 py-1 gap-1 items-center my-1 ${
              data[v].completed ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <div className="flex items-center gap-1">
              <AiFillDelete
                className="text-gray-500 hover:text-red-500 cursor-pointer"
                onClick={() => deleteSubTask(v)}
              />
              <MdEdit className="text-gray-500 hover:text-black cursor-pointer" />
              <p
                className={`${
                  data[v].completed && "line-through"
                }  cursor-pointer`}
              >
                {data[v].title}
              </p>
            </div>
            <input
              className="cursor-pointer w-4 h-4 accent-green-600"
              type="checkbox"
              onChange={(e) => updateCheck(e, v)}
              checked={data[v].completed}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CheckBox;
