import React from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './ListItem.scss';

const ListItem = ({
  _id,
  title,
  colorValue,
  lastEdited,
  onDelete,
}) => {
  let history = useHistory();
  let formattedDate = new Date(lastEdited);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  formattedDate = formattedDate.toLocaleDateString('en-US', options);

    const listItemHandler = (e) => {
      if (e.target.id === "x-button") {
        return;
      } else if (e.target.id === "list-item-title"){
        return;
      }
      history.push(`/lists/${_id}`);
    };

  const listTitleHandler = async (e) => {
    console.log('LOSE FOCUS', e.target);
    const newTitle = e.target.innerHTML;
    console.log('nuevo titulo:', newTitle); 
    if (newTitle === title) {
      return;
    }
    const response = await api.put(`/lists/${_id}`, {
      headers: {
        title: newTitle,
        lastEdited: Date.now(),
      },
    });
    if (response.data.message === 'Update succesfull') {
      console.log('Se ha actualizado la list.');
    } else {
      console.log('No se actualizo list.');
    }
    window.location.reload();
  };

  return (
    <div
      className="list-item"
      style={{ background: colorValue }}
      onClick={listItemHandler}
    >
      <button id="x-button" onClick={onDelete}>
        x
      </button>
      {/* we would call the api in the onBlur tag */}
      <h3
        id="list-item-title"
        value={title}
        suppressContentEditableWarning={true}
        contentEditable={true}
        onBlur={(e) => listTitleHandler(e)}
      >
        {title}
      </h3>
      <p>{formattedDate}</p>
    </div>
  );
};

export default ListItem;
