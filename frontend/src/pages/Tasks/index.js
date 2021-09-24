import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";
import TaskItem from "../../components/TaskItem";
import api from "../../services/api";
import "./Tasks.scss";

const Tasks = () => {
  const [formIsShown, setFormIsShown] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listTitle, setListTitle] = useState("");
  //used to call useEffect everythime a form is sent
  const [formSent, setFormSent] = useState(false);
  const pathArray = window.location.pathname.split("/");
  const listId = pathArray[2];

  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  const fetchTasks = async () => {
    const response = await api.get(`/tasks/${listId}`);
    const tasksFetched = response.data;
    console.log(tasksFetched);
    setTasks(tasksFetched);
    setIsLoading(false);
  };

  const fetchListTitle = async () => {
    const response = await api.get(`/list/${listId}`);
    // object destructuring to get the title 
    const {title} = response.data;
    setListTitle(title)
  }
  const submitTask = async (e, title, colorValue) => {
    e.preventDefault();
    let pathArray = window.location.pathname.split("/");
    let listId = pathArray[2];
    // Recolectando info de la list
    console.log(title, listId, colorValue);
    const response = await api.post("/tasks/", {
      title: title,
      colorValue: colorValue,
      listId: listId,
    });
    console.log(response);
    console.log("form submit from tasks");
    setFormSent(true);
    hideFormHandler();
  };

  useEffect(() => {
    fetchTasks();
    fetchListTitle();
    setFormSent(false);
  }, [formSent]);

  return (
    <div>
      <Sidebar
        onAdd={showFormHandler}
        title={listTitle}
        returnButton={true}
      />
      {formIsShown && (
        <Form mode="Task" onSubmit={submitTask} onClose={hideFormHandler} />
      )}
      {isLoading ? (
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
            <img
              src="https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif?cid=ecf05e475guek39srikhna896xhu67fmy2jccyf82nztpmba&rid=giphy.gif&ct=g"
              alt="Spongebob gif that says to do: nothing"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Tasks;
