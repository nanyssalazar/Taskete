import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Form from '../../components/Form';
import TaskItem from '../../components/TaskItem';
import api from '../../services/api';
import './Tasks.scss';

const Tasks = () => {
  const [formIsShown, setFormIsShown] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  const fetchTasks = async () => {
    console.log('hola');
    const listId = localStorage.getItem('listId');
    const response = await api.get(`/tasks/${listId}`);
    const tasksFetched = response.data;
    console.log('FETCHE', tasksFetched);
    setTasks(tasksFetched);
    console.log('tasks', tasks);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const submitTask = async (e, title, colorValue) => {
    e.preventDefault();
    // Recolectando info del autor
    //const author = localStorage.getItem('_id');
    // TODO: poner endpoint correcto
    //console.log(title, author, colorValue);
    //const response = await api.post('/tasks/', {
    //title: title,
    //author: author,
    //colorValue: colorValue,
    //});
    //console.log(response);
    console.log('form submit from tasks');
    window.location.reload();
  };

  return (
    <div>
      <Sidebar onAdd={showFormHandler} title='List title' returnButton={true} />

      {formIsShown && (
        <Form mode='Task' onSubmit={submitTask} onClose={hideFormHandler} />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : tasks.length > 0 ? (
        <div className='tasks-container'>
          {tasks.map((task) => (
            <TaskItem key={task._id} {...task} />
          ))}
        </div>
      ) : (
        <>
          <div className='no-tasks'>
            <p>You don't have any tasks yet</p>
            <img src='https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif?cid=ecf05e475guek39srikhna896xhu67fmy2jccyf82nztpmba&rid=giphy.gif&ct=g' />
          </div>
        </>
      )}
    </div>
  );
};

export default Tasks;
