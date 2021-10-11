import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './ListItem.scss';

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
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  formattedDate = formattedDate.toLocaleDateString('en-US', options);

  //borrar despues
  // const listStatusHandler = async () => {
  //   const response = await api.put(`/lists/${_id}`, {
  //     headers: {
  //       //aqui iria lo que ustedes utilicen para guardar la info
  //       title: 'New title for list',
  //       lastEdited: Date.now(),
  //     },
  //   });
  //   if (response.data.message === 'Update succesfull') {
  //     console.log('Se ha actualizado la task.');
  //   } else {
  //     console.log('No se actualizo task.');
  //   }
  // };

  const listTitleHandler = async (e) => {
    // aqui dijeron que daba error
    if (e.target.id === 'x-button') {
      return;
    }
    console.log('LOSE FOCUS', e.target);
    const newTitle = e.target.innerHTML;
    console.log('nuevo titulo:', newTitle); //borrar despues de probar
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
    window.location.reload(); // si quieren probar que haga todo bien comenten esta linea para ver console log
  };

  const newListTitleHandler = (e) => {
    console.log('FOCUS', e.target);
  };

  return (
    <div className='list-item' style={{ background: colorValue }}>
      <button id='x-button' onClick={onDelete}>
        x
      </button>
      {/* we would call the api in the onBlur tag */}
      <h3
        value={newListTitle}
        suppressContentEditableWarning={true}
        contentEditable={true}
        onFocus={newListTitleHandler}
        onBlur={(e) => listTitleHandler(e)}>
        {title}
      </h3>
      <p>{formattedDate}</p>
    </div>
  );
};

export default ListItem;
