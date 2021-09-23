import React from 'react';
import { useHistory } from 'react-router-dom';
import './ListItem.scss';

const ListItem = ({
  _id,
  title,
  author,
  colorValue,
  dateCreated,
  lastEdited,
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

  const listItemHandler = () => {
    history.push(`/lists/${_id}`);
  };

  return (
    <div
      className='list-item'
      style={{ background: colorValue }}
      onClick={listItemHandler}>
      <button>x</button>
      <h3>{title}</h3>
      <p>{formattedDate}</p>
    </div>
  );
};

export default ListItem;
