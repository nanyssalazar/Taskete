import React from "react";
import "./ListItem.scss";

const ListItem = ({
  _id,
  title,
  author,
  colorValue,
  dateCreated,
  lastEdited,
}) => {
  let formattedDate = new Date(dateCreated);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  formattedDate = formattedDate.toLocaleDateString("en-US", options);

  return (
    <div className="list-item" style={{ background: colorValue }}>
      <button>x</button>
      <h3>{title}</h3>
      <p>{formattedDate}</p>
    </div>
  );
};

export default ListItem;
