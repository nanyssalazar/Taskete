import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "./ListItem.scss";

const ListItem = ({
  _id,
  title,
  author,
  colorValue,
  dateCreated,
  lastEdited,
  onDelete,
}) => {
  
  let history = useHistory();
  const [newListTitle, setNewListTitle] = useState(title);

  
  let formattedDate = new Date(lastEdited);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  formattedDate = formattedDate.toLocaleDateString("en-US", options);

  const listStatusHandler = async () => {
    const response = await api.put(`/lists/${_id}`, {
      headers: {
        //aqui iria lo que ustedes utilicen para guardar la info
        title: 'New title for list',
        lastEdited: Date.now(),
      },
    });
    if (response.data.message === 'Update succesfull') {
      console.log('Se ha actualizado la task.');
    } else {
      console.log('No se actualizo task.');
    }
  };

  const listItemHandler = (e) => {
    console.log("LOSE FOCUS", e.target);
    console.log("content", e.target.innerHTML);
    // se mandaria esto
    setNewListTitle(e.target.innerHTML);

    // aqui dijeron que daba error 
    // if (e.target.id === "x-button") {
    //   return;
    // }
    // history.push(`/lists/${_id}`);
  };

  const newListTitleHandler = (e) => {
    console.log("FOCUS", e.target);
 
  }

 
  return (
    <div
      className="list-item"
      style={{ background: colorValue }}
      // onClick={listItemHandler}
    >
      <button id="x-button" onClick={onDelete}>
        x
      </button>
      {/* we would call the api in the onBlur tag */}
      <h3 value={newListTitle} contentEditable={true} onFocus={newListTitleHandler} onBlur={listItemHandler}>{title}</h3>
      <p>{formattedDate}</p>
    </div>
  );
};

export default ListItem;
