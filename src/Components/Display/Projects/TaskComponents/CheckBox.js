import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

import SubTask from "./SubTask";
// import { subTaskPattern } from "../../../../fakeData";

const CheckBox = ({ ...props }) => {
  const [data, setData] = useState(props.task.subTasks);
  const [edit, setEdit] = useState({ subID: "", taskID: props.task.id });

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

  const updateSubTitle = (v, title) => {
    let id = props.task.id;
    let subID = data[v].id;
    if (title.length > 0) {
      props.setProject((prev) => ({
        ...prev,
        tasks: {
          ...prev.tasks,
          [id]: {
            ...prev.tasks[id],
            subTasks: {
              ...prev.tasks[id].subTasks,
              [subID]: { ...prev.tasks[id].subTasks[subID], title: title },
            },
          },
        },
      }));
      setEdit((prev) => ({ ...prev, subID: "" }));
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <SubTask
            key={data[v].id}
            v={v}
            data={data}
            deleteSubTask={deleteSubTask}
            setEdit={setEdit}
            edit={edit}
            updateCheck={updateCheck}
            updateSubTitle={updateSubTitle}
          />
        ))}
      </div>
    </>
  );
};

export default CheckBox;
