import React, { useState } from "react";
import "./TaskItem.scss";

const TaskItem = ({
  _id,
  title,
  author,
  colorValue,
  dateCreated,
  lastEdited,
}) => {
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  let formattedDate = new Date(lastEdited);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  formattedDate = formattedDate.toLocaleDateString("en-US", options);

  const taskCompletedHandler = () => {
    // send update to database

    setIsTaskCompleted(!isTaskCompleted);
  };

  const removeTaskHandler = () => {
    // delete task code
  };

  let taskStyle = isTaskCompleted
    ? { "backgroundColor": colorValue, border: "none", color: "white" }
    : null;

  return (
    <div className="task-item" style={{ border: `2px solid ${colorValue}` }}>
      <button
        className="task-item__remove"
        style={{ "backgroundColor": `${colorValue}` }}
        onClick={removeTaskHandler}
      >
        x
      </button>
      <h3>{title}</h3>
      <p>{formattedDate}</p>
      <button
        className="task-item__complete"
        onClick={taskCompletedHandler}
        style={taskStyle}
      >
        ✓
      </button>
    </div>
  );
};

export default TaskItem;
