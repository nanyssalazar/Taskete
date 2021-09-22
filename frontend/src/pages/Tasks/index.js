import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";
import TaskItem from "../../components/TaskItem";
import api from "../../services/api";
import "./Tasks.scss"

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
    window.location.reload();
  };

  const fetchTasks = async () => {
    const author = localStorage.getItem("_id");
    // TODO: poner el endpoint correcto
    const response = await api.get(`/tasks/${author}`);
    const fetchedTasks = response.data;
    setTasks(fetchedTasks);
  };

  const sortTasks = () => {
    tasks.map((item) => {
      item.lastEdited = new Date(item.lastEdited);
    });

    setTasks(
      tasks.sort(
        (a, b) => b.lastEdited.valueOf() - a.lastEdited.valueOf()
      )
    );
  }

  useEffect(() => {
    setTimeout(() => {
      fetchTasks();
      sortTasks();
      setIsLoading(false);
    }, 150);
  }, []);

  return (
    <div>
      <Sidebar onAdd={showFormHandler} title="List title" returnButton={true} />
      {formIsShown && <Form mode="Task" onSubmit={submitTask} onClose={hideFormHandler} />}
      {
        /* TODO: Descomentar hasta que esté conectado con el backend
        isLoading ? (
        <p>Loading...</p>
      ) : tasks.length > 0 ? (
        <div className="tasks-container">
          {tasks.map((task) => (
            <TaskItem key={task._id} {...task} />
          ))}
        </div>
      ) : (
        <>
          <div className="no-tasks">
            <p>You don't have any tasks yet</p>
            <img src="https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif?cid=ecf05e475guek39srikhna896xhu67fmy2jccyf82nztpmba&rid=giphy.gif&ct=g" />
          </div>
        </>
      )*/
      }

      {
        // NOTE: Tareas de prueba, mientras se hace el backend jeje
      }

      <div className="tasks-container">
        <TaskItem title="Dummy task" author="x" colorValue="#91b3fa" lastEdited="1" />
        <TaskItem title="Dummy task" author="x" colorValue="#e4ee90" lastEdited="1" />
        <TaskItem title="Dummy task" author="x" colorValue="#FF9B73" lastEdited="1" />
        <TaskItem title="Dummy task" author="x" colorValue="#4548ed" lastEdited="1" />
      </div>
    </div>
  );
};

export default Tasks;
