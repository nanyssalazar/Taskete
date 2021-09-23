import React, { useState } from 'react';
import api from '../../services/api';
import './TaskItem.scss';

const TaskItem = ({
  _id,
  description,
  dateCreated,
  lastEdited,
  status,
  colorValue,
  listId,
}) => {
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [displayedStatus, setDisplayedStatus] = useState(status);

  let formattedDate = new Date(lastEdited);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  formattedDate = formattedDate.toLocaleDateString('en-US', options);

  const taskStatusHandler = async (isTaskCompleted) => {
    console.log(status);
    var newStatus = '';
    if (displayedStatus === 'done') {
      newStatus = 'undone';
    } else {
      newStatus = 'done';
    }
    const response = await api.put(`/tasks/${_id}`, {
      headers: { status: newStatus },
    });
    if (response.data.message === 'Update succesfull') {
      console.log('Se ha actualizado la task.');
      setIsTaskCompleted(!isTaskCompleted);
      setDisplayedStatus(newStatus);
      console.log(newStatus);
    } else {
      console.log('No se actualizo task.');
    }
  };

  const removeTaskHandler = () => {
    // delete task code
  };

  let taskStyle = isTaskCompleted
    ? { backgroundColor: colorValue, border: 'none', color: 'white' }
    : null;

  return (
    <div className='task-item' style={{ border: `2px solid ${colorValue}` }}>
      <button
        className='task-item__remove'
        style={{ backgroundColor: `${colorValue}` }}
        onClick={removeTaskHandler}>
        x
      </button>
      <h3>{description}</h3>
      <p>{formattedDate}</p>
      <p>{displayedStatus}</p>
      <button
        className='task-item__complete'
        onClick={taskStatusHandler}
        style={taskStyle}>
        ✓
      </button>
    </div>
  );
};

export default TaskItem;
