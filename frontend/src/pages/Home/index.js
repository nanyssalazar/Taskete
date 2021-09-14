import React from "react";
import Login from "../../components/Login";
import tasks from "../../images/tasks.png"
import "./Home.scss";

const Home = () => {
  return (
    <div className="hero animate-pop-in">
      <div className="hero__description">
        <h1>Manage your tasks now!</h1>
        <p>Helping you to get things done.</p>
        <div className="hero__description__registration">
          <Login />
        </div>
      </div>
      <img src={tasks} alt="man crossing a task from a to-do list" />
    </div>
  );
};

export default Home;
