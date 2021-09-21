import React from "react";
import "./TaskItem.scss";

const TaskItem = ({
  _id,
  title,
  author,
  colorValue,
  dateCreated,
  lastEdited,
  isDone,
}) => {
  let formattedDate = new Date(lastEdited);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  formattedDate = formattedDate.toLocaleDateString("en-US", options);

  return (
    <div className="task-item" style={{ background: colorValue }}>
      {
        // NOTE: button puede cambiar de estilo dependiendo
        // del valor de isDone (o como tu veas Andreita)
      }
      <button>✓</button>
      <h3>{title}</h3>
      <p>{formattedDate}</p>
    </div>
  );
};

export default TaskItem;
