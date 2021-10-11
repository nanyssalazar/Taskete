import React, { useState } from 'react';
import api from '../../services/api';
import './TaskItem.scss';

const TaskItem = ({
  _id,
  title,
  dateCreated,
  lastEdited,
  status,
  colorValue,
  listId,
  onDelete,
}) => {
  const [displayedStatus, setDisplayedStatus] = useState(status);
  //no estamos usando este state
  const [newTaskTitle, setNewTaskTitle] = useState(title);

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
      headers: { status: newStatus, lastEdited: Date.now() },
    });
    if (response.data.message === 'Update succesfull') {
      console.log('Se ha actualizado la task.');
      setDisplayedStatus(newStatus);
      console.log(newStatus);
    } else {
      console.log('No se actualizo task.');
    }
  };

  // const taskTitleHandler = async (taskTitle) => {
  //   console.log(taskTitle);
  //   const response = await api.put(`/tasks/${_id}`, {
  //     headers: {
  //       //aqui iria lo que ustedes utilicen para guardar la info
  //       title: taskTitle,
  //       lastEdited: Date.now(),
  //     },
  //   });
  //   if (response.data.message === 'Update succesfull') {
  //     console.log('Se ha actualizado la task.');
  //   } else {
  //     console.log('No se actualizo task.');
  //   }
  // };

  const taskTitleHandler = async (e) => {
    if (e.target.id === 'x-button') {
      return;
    }
    const newTitle = e.target.innerHTML;
    const response = await api.put(`/tasks/${_id}`, {
      headers: {
        title: newTitle,
        lastEdited: Date.now(),
      },
    });
    if (response.data.message === 'Update succesfull') {
      console.log('Se ha actualizado la task.');
    } else {
      console.log('No se actualizo task.');
    }
    window.location.reload();
  };

  //esta funcion se borra no?
  const newTaskTitleHandler = (e) => {
    console.log('FOCUS', e.target);
  };

  let taskStyle =
    displayedStatus === 'done'
      ? { backgroundColor: colorValue, border: 'none', color: 'white' }
      : null;

  return (
    <div className='task-item' style={{ border: `2px solid ${colorValue}` }}>
      <button
        className='task-item__remove'
        style={{ backgroundColor: `${colorValue}` }}
        onClick={onDelete}>
        x
      </button>
      <h3
        value={newTaskTitle}
        contentEditable={true}
        onFocus={newTaskTitleHandler}
        onBlur={(e) => taskTitleHandler(e)}
        suppressContentEditableWarning={true}>
        {title}
      </h3>
      <p>{formattedDate}</p>
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
