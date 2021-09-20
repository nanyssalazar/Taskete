import React from "react";
import Sidebar from "../../components/Sidebar";
import "./Tasks.scss"

const Tasks = (props) => {
  return (
    <div>
      <Sidebar title="List title" returnButton={true}/>
      <div className="tasks-container">
        <h2>Tasks from according list</h2>
      </div>
    </div>
  );
};

export default Tasks;
